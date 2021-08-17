'use strict'
var jsonvar = "";

function openNetflixViewingHistory() {
    chrome.webNavigation.onCompleted.removeListener(openNetflixViewingHistory);
    chrome.tabs.create({
            // Just use the full URL if you need to open an external page
            url: "https://www.netflix.com/settings/viewed/",
            active: false
        },

        function(netab) {

        });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "DONE_DOWNLOADING_HISORY") {
            jsonvar = request.content;
            chrome.runtime.sendMessage({ msg: "DISPLAY_HISTORY", content: jsonvar }, function(response) {});
            sendResponse({ farewell: "done" });
        }
        return true;
    }
);


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.msg)
        if (request.msg === "GET_HISTORY") {
            if (jsonvar === "") {
                jsonvar = "LOADING";
                chrome.runtime.sendMessage({ msg: "LOADING" }, function(response) {});
                chrome.tabs.create({
                        // Just use the full URL if you need to open an external page
                        url: "https://www.netflix.com/settings/viewed/",
                        active: false
                    },

                    function(netab) {

                    });
            } else if (jsonvar === "LOADING") {
                chrome.runtime.sendMessage({ msg: "LOADING" }, function(response) {});
            } else {
                chrome.runtime.sendMessage({ msg: "DISPLAY_HISTORY", content: jsonvar }, function(response) {});
            }
        }
        return true;
    }
);


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.msg)
        if (request.msg === "DOWNLOAD_HISTORY") {
            chrome.tabs.create({
                    // Just use the full URL if you need to open an external page
                    url: "https://www.netflix.com/settings/viewed/",
                    active: false
                },

                function(netab) {

                });
        }
        return true;
    }
);





// chrome.webNavigation.onCompleted.addListener(openNetflixViewingHistory, {
//     url: [{ urlMatches: 'https://www.netflix.com/*' }]
// });




// function parseDownload(parseurl) {
//     chrome.runtime.getPackageDirectoryEntry(function(root) {
//         root.getFile(parseurl, {}, function(fileEntry) {
//             fileEntry.file(function(file) {
//                 var reader = new FileReader();
//                 reader.onloadend = function(e) {
//                     // contents are in this.result
//                 };
//                 reader.readAsText(file);
//             }, errorHandler);
//         }, errorHandler);
//     });
// }


// chrome.downloads.onChanged.addListener(function(delta) {

//     chrome.downloads.search({ orderBy: ['-startTime'], limit: 1 }, function(data) {
//         data.forEach(function(item, i) {
//             let regexp = /\NetflixViewingHistory/g;
//             let matchAll = item.filename.matchAll(regexp)
//             matchAll = Array.from(matchAll)
//             try {
//                 if (matchAll[0].input === item.filename) {
//                     setTimeout(function() {
//                         chrome.runtime.sendMessage({
//                             msg: "DOWNLOAD_COMPLETE",
//                             data: {
//                                 subject: "Loading",
//                                 content: item.filename
//                             }
//                         });
//                         return;
//                     }, 500);
//                     setTimeout(function() {
//                         console.log(item.finalUrl);
//                         console.log(item.url);
//                         console.log(item.filename);
//                         //chrome.downloads.removeFile(item.id);
//                         return;
//                     }, 1000);
//                 }
//             } catch {

//             }
//         });
//         chrome.downloads.onErased.addListener(() => {
//             console.log(
//                 "ad"
//             );
//             //chrome.downloads.onChanged.removeListener()
//         });
//     });
// });




// chrome.webNavigation.onCompleted.addListener(function(tab) {
//     chrome.runtime.sendMessage({ greeting: "download" }, function(response) {
//         console.log(response.farewell);
//     });
// }, {
//     url: [{ urlMatches: 'https://www.netflix.com/settings/viewed/' }]
// });


// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "from a content script:" + sender.tab.url :
//             "from the extension");
//         if (request.greeting == "download") {
//             chrome.tabs.executeScript({ tabId: sender.tab.id }, { code: 'document.querySelector("#appMountPoint > div > div > div.bd > div > div > div.viewing-activity-footer > div:nth-child(2) > a.viewing-activity-footer-download").click();' });
//             sendResponse({ farewell: "goodbye" });
//         }
//     }
// );