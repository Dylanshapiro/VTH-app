import { browser } from "webextension-polyfill-ts";
// Listen for messages sent from other parts of the extension
browser.runtime.onMessage.addListener((request: { popupMounted: boolean }) => {
    // Log statement if request.popupMounted is true
    // NOTE: this request is sent in `popup/component.tsx`
    if (request.popupMounted) {
        console.log("backgroundPage notified that Popup.tsx has mounted.");
    }
});


browser.runtime.onMessage.addListener((
    request: {
        msg: String,
        content: String
    }
): void => {
    if ("DONE_DOWNLOADING_HISORY" === request.msg) {
        console.log("DONE_DOWNLOADING_HISORY")
        browser.storage.local.set({
            'content': request.content
        }).then(() => {
            console.log()
            browser.storage.local.get('content').then( (value: { [content: string]: any }) => {
                browser.runtime.sendMessage({ msg: "DISPLAY_HISTORY", content: value['content'] });
            }
            )
        });

    }

}
)





browser.runtime.onMessage.addListener((
    request: {
        msg: String,
        content: String
    }
): void => {
    if ("DISPLAY_DATA" === request.msg) {
        browser.storage.local.get('content').then( (value: { [s: string]: any }) => {
            browser.runtime.sendMessage({ msg: "DISPLAY_HISTORY", content: value['content'] });
        }
        )
    }



}
)