# Sunhacks2024
Hi, everyone! Our names are Julissa Pacheco Garcia, Crystal Lee, and Shawn Neill. We are all junior Computer Science Students here at ASU and are excited to participate in our first hackathon! 

We have all known each other since high school, we like froggies (except Shawn), and we worked very hard on our Sunhacks submission!

# About Our Project

We decided to implement a Adobe Express Add-on with the purpose of creating translated transcripts of videos. Adobe Express does not have a feature for transcribing and translating non-English languages to English, or the other way around, therefore we are building an add-on that will allow for more international individuals to caption and publish their videos for a wider audience.

For the front-end we used the Adobe Developer guide recommended React Spectrum to construct our icons and connect the front-end to our backend. Our backend was a tad more difficult to design because we wanted to incorporate a couple of AWS services which would help us achieve our functionality: **Amazon Transcribe and Amazon Translate**. We incorporated these services through a Lambda which was invoked through an HTTP request from the front-end. That way we did not have to install nor authenticate with the AWS SDK.

Because of this design choice, our AWS code is not in our repo as it was uploaded directly to the Lambda, but I will include it in text format here:
**Note: the AWS Account Number will be replaced with X's for security purposes**

```
import { TranscribeClient, DeleteTranscriptionJobCommand, StartTranscriptionJobCommand } from "@aws-sdk/client-transcribe";
import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate";
import { DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const REGION = "us-east-2";
const TRANSCRIPTION_BUCKET = "video-transcriptions-XXXXXXXXXXXX";
const VIDEO_BUCKET = "videos-to-translate-XXXXXXXXXXXX";

export const handler = async (event, context) => {
  
  // TODO: get video from adobe as json and convert to video again and upload to S3
  console.log(event);

  const s3Client = new S3Client({region: REGION});
  
  const bodyAsJson = JSON.parse(event.body);
  
  let videoData = bodyAsJson.file;
  const encodedVideo = videoData.substring(videoData.indexOf(","));
  const fileName = bodyAsJson.name; 
  const targetLanguage = bodyAsJson.targetLanguage;
  const JOB_NAME = fileName.substring(0, fileName.indexOf("."));

  const buffer = Buffer.from(encodedVideo, 'base64');
  await s3Client.send(new PutObjectCommand({
    Bucket: VIDEO_BUCKET,
    Key: "adobe-video/" + fileName,
    Body: buffer,
  }));
  
  // Get video from S3 bucket and transcribe it
  const transcribeParams = {
    TranscriptionJobName: JOB_NAME,
    LanguageCode: "en-US", // will assume language is always in english
    MediaFormat: 'mp4', // will need to see how we would discern info from adobe
    Media: {
      MediaFileUri: 's3://' + VIDEO_BUCKET + '/adobe-video/' + fileName, // bucket will always be the same only file name may change
    },
    OutputBucketName: TRANSCRIPTION_BUCKET
  };
  
  const transcribeClient = createTranscribeClient();
  
  try {
    const transcribedText = await transcribeClient.send(
      new StartTranscriptionJobCommand(transcribeParams)
    );
  } catch (err) {
    console.log("Error", err);
  }
  
  let objectList = JSON.stringify(await listObjectsInTranscriptionBucket(s3Client));
  console.log(typeof(objectList));
  
  // Make sure that the transcription has uploaded to s3
  while(!objectList.includes(JOB_NAME +'.json')) {
    objectList = JSON.stringify(await listObjectsInTranscriptionBucket(s3Client));
  }
  // Delete the transcribe job since it will no longer be in use
  try {
    await transcribeClient.send(
      new DeleteTranscriptionJobCommand({TranscriptionJobName: JOB_NAME})
    );
  } catch (err) {
    console.log("Error", err);
  }
  
  // Get transcribed text and translate into other language
  const transcribedObject = await s3Client.send(new GetObjectCommand({
      Bucket: TRANSCRIPTION_BUCKET,
    Key: JOB_NAME + '.json', // name of job + .json
  }));
  const transcribedString = await transcribedObject.Body.transformToString(); // turns the s3 object into a string
  const transcribedJson = JSON.parse(transcribedString); // turn it into a json

  const translateClient = createTranslateClient();
  
  const translateParams = {
    Text: transcribedJson.results.transcripts[0].transcript, // index 0 will always be the full transcript
    SourceLanguageCode: 'en-US',
    TargetLanguageCode: targetLanguage,
  };
  const data = await translateClient.send(
    new TranslateTextCommand(translateParams),
  );
  
  // Delete the transcribed file from S3 since it will not longer be used
  await s3Client.send(new DeleteObjectCommand({
    Bucket: TRANSCRIPTION_BUCKET,
    Key: JOB_NAME+'.json',
  }));
   
  console.log(data.TranslatedText);
  return { 'translation': data.TranslatedText }; 
  // Return transcript 
  
};

function createTranscribeClient() {
  // Set the AWS Region.
  // Create an Amazon Transcribe service client object.
  const transcribeClient = new TranscribeClient({ region: REGION });
  return transcribeClient;
}

function createTranslateClient() {
  return new TranslateClient({
    region: REGION,
  });
}

async function listObjectsInTranscriptionBucket(s3Client) {
  const command = new ListObjectsV2Command({
    Bucket: TRANSCRIPTION_BUCKET,
    // The default and maximum number of keys returned is 1000. This limits it to
    // one for demonstration purposes.
    MaxKeys: 5,
  });
  const sendCommand = await s3Client.send(command);
  return sendCommand.Contents;
}
```

