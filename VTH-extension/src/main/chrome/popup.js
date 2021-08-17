'use strict'

chrome.runtime.sendMessage({ msg: "GET_HISTORY" }, function(response) {});

function parseAndDisplay(stringData) {

    let jsonData = JSON.parse(stringData);
    console.log(jsonData);
    let x = document.getElementById("Netflix-History");
    jsonData.forEach(function(obj) {
        let y = document.createElement("h3");
        y.innerHTML = obj.date + " : " + '<a href="' + obj.link + '">' + obj.title + '</a>';
        console.log(y.innerHTML);
        x.appendChild(y);
    });

}

function displayLOADING() {
    let x = document.getElementById("Netflix-History");
    let y = document.createElement("h1");
    y.innerHTML = 'Please Wait Loading Netflix-Hop';
    x.appendChild(y);
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "DISPLAY_HISTORY") {
            //  To do something
            clearBox("Netflix-History");
            parseAndDisplay(request.content);
        }

        if (request.msg === "LOADING") {
            //  To do something
            displayLOADING()
        }
    }
);

function clearBox(elementID) {
    var div = document.getElementById(elementID);
    if (div.firstChild === null) {
        return;
    }
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    console.log(xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue)
}


// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "from a content script:" + sender.tab.url :
//             "from the extension");
//         if (request.greeting === "start") {

//            sendResponse({ farewell: "done" });
//window.close();
//         }
//         return true;
//     }
// );