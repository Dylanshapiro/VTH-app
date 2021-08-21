import React, { FunctionComponent } from "react";
import { Hello } from "@src/components/hello";
import { browser } from "webextension-polyfill-ts";
import "./styles.scss";
import { Netflix } from "@src/components/Netflix";
import { Viewings } from "@src/components/Viewings";

// // // //

export const Popup: FunctionComponent = () => {
    // Sends the `popupMounted` event
    React.useEffect(() => {
        browser.runtime.sendMessage({ popupMounted: true });
    }, []);

    // Renders the component tree
    return (
        <div className="popup-container">
            <div className="container mx-4 my-4">
                <Hello />
                <hr />
                <Netflix/>
                <Viewings/>
            </div>
        </div>
    );
};
