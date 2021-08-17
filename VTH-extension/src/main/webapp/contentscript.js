console.log("hellow content script");

async function resolveAfter0001Miliseconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            document.querySelector("#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.btn-bar.top-padding.btn-bar-left > button.btn.btn-blue.btn-small").click();
            resolve('resolved');
        }, 1);
    });
}
async function start() {
    while (!document.querySelector("#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div.btn-bar.top-padding.btn-bar-left > button.btn.btn-blue.btn-small").disabled) {
        const result = await resolveAfter0001Miliseconds();
    }
    array = document.querySelectorAll("#appMountPoint > div > div > div.bd > div > div > ul > li");


    //     elString += '{' + 'date ' + ':"' + el.childNodes[0].innerText + '"}' + ',' + '{' + 'title' + ': "' + el.childNodes[1].innerText + '"}' + ',' + '{' + 'link' + ': "' + 'https://www.netflix.com/' + el.childNodes[1].children[0].attributes[0].textContent + '"}';
    // });
    arry = new Array();
    array.forEach(el => {
        arry.push({ date: el.childNodes[0].innerText, title: el.childNodes[1].innerText, link: 'https://www.netflix.com/' + el.childNodes[1].children[0].attributes[0].textContent });
    });

    const myJSON = JSON.stringify(arry);
    console.log(myJSON);
    chrome.runtime.sendMessage({ msg: "DONE_DOWNLOADING_HISORY", content: myJSON }, function(response) {});
    //call api to update database
    try {
        window.close();
    } catch (error) {

    }

}


// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "from a content script:" + sender.tab.url :
//             "from the extension");
//         if (request.greeting === "start") {
start();
//            sendResponse({ farewell: "done" });
//window.close();
//         }
//         return true;
//     }
// );