import { ButtonHTMLAttributes } from "react";
import { browser } from "webextension-polyfill-ts";

// Listen for messages sent from other parts of the extension



console.log("hellow content script");

async function resolveAfter0001Miliseconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            const element = document.querySelector("#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.btn-bar.top-padding.btn-bar-left > button.btn.btn-blue.btn-small") as HTMLElement;
            
            if (element !== null) {
                element.click()
                resolve('resolved');
            }
        }, 1);
    });
}
async function start() {
    const button = document.querySelector("#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.btn-bar.top-padding.btn-bar-left > button.btn.btn-blue.btn-small") as ButtonHTMLAttributes<HTMLElement>;
    if (button !== null) {
        while (!button.disabled) {
            const result = await resolveAfter0001Miliseconds();
        }

    }
    const  array  = document.querySelectorAll("#appMountPoint > div > div > div.bd > div > div > ul > li")  as NodeListOf<Element> ;

    let mapYearToShow = getyears()
    let mapMonthToShow = mapYearToShow
    if(array!== null){
        array.forEach(el => {
            
               const  dateElm = el.childNodes.item(0) as Element
               const titleElm = el.childNodes.item(1).childNodes.item(0) as Element 
               const date = new Date(dateElm.innerHTML)
               const titleUrl = new URL('https://www.netflix.com' + titleElm.getAttribute("href"))
               const title = titleElm.innerHTML
               var currentDate = new Date();
               const obj = {date: date , title: title , link: titleUrl };
               if(date.getDay() === currentDate.getDay() && date.getMonth() === currentDate.getMonth())
               {
                   let arry =mapYearToShow.get(date.getUTCFullYear().toString())
                   if(arry !== undefined){
                        //console.log("made it date.getDay() === currentDate.getDay() && date.getMonth() === currentDate.getMonth() " + arry.toString())
                        arry.push(JSON.stringify(obj))
                        mapYearToShow.set(date.getUTCFullYear().toString(),arry)
                   }
               }
               else if (date.getMonth() === currentDate.getMonth())
               {
                    //console.log("made it date.getMonth() === currentDate.getMonth() ")
                    let arry = mapMonthToShow.get(date.getUTCFullYear().toString())
                    if(arry !== undefined){
                        //console.log("made it " + arry.toString())
                        arry.push(JSON.stringify(obj))
                        mapMonthToShow.set(date.getUTCFullYear().toString(),arry)
                    }
                }
                else{

                }
        });
    }

    console.log(JSON.stringify(
        Array.from(
            mapYearToShow.entries()
        )
    ))

    // let myJSON ={};
    // mapYearToShow.forEach((value, key) => {  
    //     myJSON[key] = value  
    // });  
    // let myJSONmapMonthToShow = {};
    // mapMonthToShow.forEach((value, key) => {  
    //     myJSONmapMonthToShow[key] = value  
    // // });  
    const myJSON =JSON.stringify(
        Array.from(
            mapYearToShow.entries()
        )
    )
    const myJSONmapMonthToShow = JSON.stringify(
        Array.from(
            mapMonthToShow.entries()
        )
    )
    
    browser.runtime.sendMessage({ msg: "DONE_DOWNLOADING_HISORY", content: myJSON}).then((response) =>{
   
            try {
                window.close();
            } catch (error) {
        
            }
    });
    //call api to update database


}

function getyears() : Map<String,Array<String>> {
    const k = (date:String, arry:Array<String>):any => {return {date,arry}}
    const now = new Date().getUTCFullYear();
    const arr = Array(now - (now - 20)).fill('').map((v, idx) =>  k((now - idx).toString(), [])) as Array<any>;
    return new Map<String,Array<String>>(arr.map(key => [key.date, key.arry]));
  }
start();

