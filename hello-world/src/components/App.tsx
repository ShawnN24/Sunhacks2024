// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import {AlertDialog, ComboBox, Item, Section, TextArea, ActionButton, DialogTrigger, DropZone, Heading, IllustratedMessage, Dialog, Badge} from '@adobe/react-spectrum';
import Upload from '@spectrum-icons/illustrations/Upload';
import React, { useState } from "react";
import "./App.css";


import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const App = ({ addOnUISdk }: { addOnUISdk: AddOnSDKAPI }) => {
    //const [uploadLabel, setUploadLabel] = useState("Upload");
    let [lang, setLang] = useState("Spanish");
    let [isFilled, setIsFilled] = React.useState(false);
    let [fileName, setFileName] = useState("");
    let [badgeHover, setBadgeHover] = useState(false);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, file: File | null) => {
        console.log('File dropped:', file);
        if (file) {
          console.log('File name:', fileName);
          // You can now use the file object as needed
        }
    };

    // function handleUploadClick() {
    //     setUploadLabel("Uploaded");
    // }

    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme="express" scale="medium" color="light">
            {isFilled ?
            <div className="container">
                <div onMouseOver={() => setBadgeHover(true)} onMouseOut={() => setBadgeHover(false)} onClick={() => setIsFilled(false)} style={{alignSelf:"end", marginBottom: "10px"}}>
                    {!badgeHover ?
                    <Badge variant="positive">
                        {fileName}
                    </Badge>
                    :
                    <Badge variant="negative">
                        {fileName}
                    </Badge>
                    }
                </div>
                <TextArea width={"100%"} height={window.innerHeight*.75}>
                    
                </TextArea>
            </div>
            :
            <div className="container">
                <DropZone
                    maxWidth="size-3000"
                    isFilled={isFilled}
                    onDrop={async (e) => {
                        e.items.find(async (item) => {
                          if (item.kind === 'file' && (item.type === 'video/mp4' || item.type === 'audio/mpeg' || item.type === 'image/jpeg')) {
                            setFileName(item.name);
                            setIsFilled(true);
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
            {/* <div className="container">
                <Button size="m" onClick={handleUploadClick}>
                    <FontAwesomeIcon icon={faUpload} style={{paddingRight: 5}} />
                    <span style={{fontSize: 20}}>{uploadLabel}</span>
                </Button>
            </div> */}
        </Theme>
    );
};

export default App;
