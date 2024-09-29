// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import {ComboBox, Item, Section} from '@adobe/react-spectrum';
import {TextArea} from '@adobe/react-spectrum';
import React, { useState } from "react";
import "./App.css";
import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import {Header, Label, ListBox, ListBoxItem, Popover, Select, SelectValue, Selection} from 'react-aria-components';

const App = ({ addOnUISdk }: { addOnUISdk: AddOnSDKAPI }) => {
    const [uploadLabel, setUploadLabel] = useState("Upload");

    function handleUploadClick() {
        setUploadLabel("Uploaded");
    }

    let[selected, setSelected] = React.useState<Selection>(new Set([]));

    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                <Button size="m" onClick={handleUploadClick}>
                    <FontAwesomeIcon icon={faUpload} style={{paddingRight: 5}} />
                    <span style={{fontSize: 20}}>{uploadLabel}</span>
                </Button>
            </div>
            <div className="container">
                <TextArea width={"100%"} height={window.innerHeight*.5}>
                </TextArea>
            </div>
            {/* make the list of languages */}
            <div className="container"> 
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
                <div>
                    {/* currently selected item */}
                    Your video will be translated into:  
                    {selected === 'all' ? 'all' : [...selected]}
                    {/* use selected language and put it into translation so it'll translate it to the lang
                    translate[en, selected] idk */}
                </div>
            </div>
        </Theme>
    );
};
export default App;
