import React, { FunctionComponent, LinkHTMLAttributes } from "react";
import "./styles.scss";
import { browser, Tabs } from "webextension-polyfill-ts";
import { log } from "console";

// // // //



/**
 
 */
 function processNetflixDownload(): void {
    // Query for the active tab in the current window
    console.log("made it")

    browser.tabs.create({
        active:false,
        url:'https://www.netflix.com/settings/viewed/'
    }).then
    (
        (tab):void =>
        {
            browser.tabs.executeScript(
                tab.id,
                {
                    file: 'NetflixContentScript.js'
                }

            )
        }
    )
    
  
}




export const Netflix: FunctionComponent = () => {
    return (
        <div className="row">
            <div className="col-lg-12">
              
                <button
                    className="btn btn-block btn-outline-dark"
                    onClick={(): void => processNetflixDownload()}
                >
                   Force Netflix Update
                </button>
            </div>
        </div>
    );
};



const VideoPostProp = (props: { date: Date, url:URL, title:String }) => {    
    return <h1>{props.date.toString()}<a href={props.url.href}> {props.title}</a></h1> ; 
};

function displayNetflixHistory( history:Array<String>) {
    console.log("made it here")
   history.forEach((jsonObj):void => console.log(jsonObj));
}

