// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import {ComboBox, Item, Section, TextArea} from '@adobe/react-spectrum';
import React, { useState } from "react";
import "./App.css";

import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const App = ({ addOnUISdk }: { addOnUISdk: AddOnSDKAPI }) => {
    const [uploadLabel, setUploadLabel] = useState("Upload");

    function handleUploadClick() {
        setUploadLabel("Uploaded");
    }

    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                
            </div>
            <div className="container">
                <Button size="m" onClick={handleUploadClick}>
                    <FontAwesomeIcon icon={faUpload} style={{paddingRight: 5}} />
                    <span style={{fontSize: 20}}>{uploadLabel}</span>
                </Button>
            </div>
            <div className="container">
                <TextArea width={"100%"} height={window.innerHeight*.75}>
                    
                </TextArea>
            </div>
        </Theme>
    );
};

export default App;
