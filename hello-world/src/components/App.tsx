// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { Theme } from "@swc-react/theme";
import {TextArea, DropZone, Heading, IllustratedMessage, Badge, FileDropItem} from '@adobe/react-spectrum';
import {ListBox, ListBoxItem, Selection} from 'react-aria-components';
import Upload from '@spectrum-icons/illustrations/Upload';
import React, { useState } from "react";
import "./App.css";


import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { base64Converter } from "./helpers/base64Converter";
import BeatLoader from "react-spinners/BeatLoader";

const App = ({ addOnUISdk }: { addOnUISdk: AddOnSDKAPI }) => {
    const [isLoading, setIsLoading] = useState(false);
    let [lang, setLang] = useState("en");
    let [badgeHover, setBadgeHover] = useState(false);
    let [isFilled, setIsFilled] = React.useState(false);
    let [fileName, setFileName] = useState("");
    let [translatedCaptions, setTranslatedCaptions] = useState("");
    let [selected, setSelected] = React.useState<Selection>(new Set([]));

    const handleDrop = async (file: File, item: FileDropItem) => {
        setIsLoading(true);

        const fileContent = await base64Converter(file);
        console.log("file64: "+fileContent);
        console.log("fileName: "+item.name);
        console.log("lang: "+selected);

        try {
            const response = await fetch('https://tad245c4ttgwwajmaeanppmrpm0pkocb.lambda-url.us-east-2.on.aws/', {
              method: 'POST',
              body: JSON.stringify({
                name: item.name,
                targetLanguage: selected,
                file: fileContent
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setTranslatedCaptions(result.translation);
            console.log(result.translation);
        } catch (error) {
            console.error('Error sending file:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Theme theme="express" scale="medium" color="light">
            {/* make the list of languages */}
            <div className="container"> 
                <span>
                    {/* currently selected item */}
                    Translate Your Video Into: 
                    {selected === 'all' ? 'all' : [...selected]}
                    {/* use selected language and put it into translation so it'll translate it to the lang
                    translate[en, selected] idk */}
                </span>
                <ListBox
                aria-label="Languages"
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setSelected}
                selectionBehavior="replace"
                >
                <ListBoxItem id = "af">Afrikaans</ListBoxItem>
                <ListBoxItem id = "sq">Albanian</ListBoxItem>
                <ListBoxItem id = "am">Amharic</ListBoxItem>
                <ListBoxItem id = "ar">Arabic</ListBoxItem>
                <ListBoxItem id = "hy">Armenian</ListBoxItem>
                <ListBoxItem id = "az">Azerbaijani</ListBoxItem>
                <ListBoxItem id = "bn">Bengali</ListBoxItem>
                <ListBoxItem id = "bs">Bosnian</ListBoxItem>
                <ListBoxItem id = "bg">Bulgarian</ListBoxItem>
                <ListBoxItem id = "ca">Catalan</ListBoxItem>
                <ListBoxItem id = "zh">Chinese (Simplified)</ListBoxItem>
                <ListBoxItem id = "zh-TW">Chinese (Traditional)</ListBoxItem>
                <ListBoxItem id = "ca">Croatian</ListBoxItem>
                <ListBoxItem id = "cs">Czech</ListBoxItem>
                <ListBoxItem id = "da">Danish</ListBoxItem>
                <ListBoxItem id = "fa-AF">Dari</ListBoxItem>
                <ListBoxItem id = "nl">Dutch</ListBoxItem>
                <ListBoxItem id = "en">English</ListBoxItem>
                <ListBoxItem id = "et">Estonian</ListBoxItem>
                <ListBoxItem id = "fa">Farsi (Persian)</ListBoxItem>
                <ListBoxItem id = "tl">Filipino, Tagalog</ListBoxItem>
                <ListBoxItem id = "fi">Finnish</ListBoxItem>
                <ListBoxItem id = "fr">French</ListBoxItem>
                <ListBoxItem id = "fr-CA">French (Canada)</ListBoxItem>
                <ListBoxItem id = "ka">Georgian</ListBoxItem>
                <ListBoxItem id = "de">German</ListBoxItem>
                <ListBoxItem id = "el">Greek</ListBoxItem>
                <ListBoxItem id = "gu">Gujarati</ListBoxItem>
                <ListBoxItem id = "ht">Haitian Creole</ListBoxItem>
                <ListBoxItem id = "ha">Hausa</ListBoxItem>
                <ListBoxItem id = "he">Hebrew</ListBoxItem>
                <ListBoxItem id = "hi">Hindi</ListBoxItem>
                <ListBoxItem id = "hu">Hungarian</ListBoxItem>
                <ListBoxItem id = "is">Icelandic</ListBoxItem>
                <ListBoxItem id = "id">Indonesian</ListBoxItem>
                <ListBoxItem id = "gg">Irish</ListBoxItem>
                <ListBoxItem id = "it">Italian</ListBoxItem>
                <ListBoxItem id = "ja">Japanese</ListBoxItem>
                <ListBoxItem id = "kn">Kannada</ListBoxItem>
                <ListBoxItem id = "kk">Kazakh</ListBoxItem>
                <ListBoxItem id = "ko">Korean</ListBoxItem>
                <ListBoxItem id = "lv">Latvian</ListBoxItem>
                <ListBoxItem id = "lt">Lithuanian</ListBoxItem>
                <ListBoxItem id = "mk">Macedonian</ListBoxItem>
                <ListBoxItem id = "ms">Malay</ListBoxItem>
                <ListBoxItem id = "ml">Malayalam</ListBoxItem>
                <ListBoxItem id = "mt">Maltese</ListBoxItem>
                <ListBoxItem id = "mr">Marathi</ListBoxItem>
                <ListBoxItem id = "mn">Mongolian</ListBoxItem>
                <ListBoxItem id = "no">Norwegian (Bokmål)</ListBoxItem>
                <ListBoxItem id = "ps">Pashto</ListBoxItem>
                <ListBoxItem id = "pl">Polish</ListBoxItem>
                <ListBoxItem id = "pt">Portuguese (Brazil)</ListBoxItem>
                <ListBoxItem id = "pt-PT">Portuguese (Portugal)</ListBoxItem>
                <ListBoxItem id = "pa">Punjabi</ListBoxItem>
                <ListBoxItem id = "ro">Romanian</ListBoxItem>
                <ListBoxItem id = "ru">Russian</ListBoxItem>
                <ListBoxItem id = "sr">Serbian</ListBoxItem>
                <ListBoxItem id = "si">Sinhala</ListBoxItem>
                <ListBoxItem id = "sk">Slovak</ListBoxItem>
                <ListBoxItem id = "sl">Slovenian</ListBoxItem>
                <ListBoxItem id = "so">Somali</ListBoxItem>
                <ListBoxItem id = "es">Spanish</ListBoxItem>
                <ListBoxItem id = "es-MX">Spanish (Mexico)</ListBoxItem>
                <ListBoxItem id = "sw">Swahili</ListBoxItem>
                <ListBoxItem id = "sv">Swedish</ListBoxItem>
                <ListBoxItem id = "ta">Tamil</ListBoxItem>
                <ListBoxItem id = "te">Telugu</ListBoxItem>
                <ListBoxItem id = "th">Thai</ListBoxItem>
                <ListBoxItem id = "tr">Turkish</ListBoxItem>
                <ListBoxItem id = "uk">Ukrainian</ListBoxItem>
                <ListBoxItem id = "ur">Urdu</ListBoxItem>
                <ListBoxItem id = "uz">Uzbek</ListBoxItem>
                <ListBoxItem id = "vi">Vietnamese</ListBoxItem>
                <ListBoxItem id = "cy">Welsh</ListBoxItem>
                </ListBox>
            </div>
            {isFilled ?
            <div className="container">
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "10px"}}>
                    <Badge variant="info">
                        {selected}
                    </Badge>
                    <div onMouseOver={() => setBadgeHover(true)} onMouseOut={() => setBadgeHover(false)} onClick={() => setIsFilled(false)}>
                        {!badgeHover ?
                        <Badge variant="positive">
                            {(fileName.substring(0, fileName.indexOf('.'))).substring(0, 15)}..{fileName.substring(fileName.indexOf('.'))}
                        </Badge>
                        :
                        <Badge variant="negative">
                            {(fileName.substring(0, fileName.indexOf('.'))).substring(0, 15)}..{fileName.substring(fileName.indexOf('.'))}
                        </Badge>
                        }
                    </div>
                </div>
                {isLoading ?
                    <div className="container" style={{flex: 1, justifySelf: 'center', alignSelf: 'center', marginTop: window.innerHeight*.37}}>
                        <BeatLoader size={25} />
                    </div>
                :
                    <TextArea width={"100%"} height={window.innerHeight*.75} value={translatedCaptions} />
                }
            </div>
            :
            <div className="container">
                <DropZone
                    maxWidth="size-3000"
                    isFilled={isFilled}
                    onDrop={async (e) => {
                        e.items.find(async (item) => {
                          if (item.kind === 'file' && (item.type === 'video/mp4' || item.type === 'audio/mpeg' || item.type === 'video/quicktime' || item.type === 'image/jpeg')) {
                            setFileName(item.name);
                            setIsFilled(true);
                            try {
                                const file = await item.getFile();
                                handleDrop(file, item);
                            } catch (error) {
                                console.error('Error fetching file:', error);
                            }
                          }
                        });
                      }}>
                    <IllustratedMessage>
                        <Upload />
                        <Heading>
                            Drag and drop your file
                        </Heading>
                    </IllustratedMessage>
                </DropZone>
            </div>
            }
        </Theme>
    );
};

export default App;
