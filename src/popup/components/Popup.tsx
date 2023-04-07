import React, { useCallback } from "react";
import { PopupLayout } from "./PopupLayout";
import PopupHeader from "./PopupHeader";
import { PopupContent } from "./PopupContent";
import browser from 'webextension-polyfill'
import { CHATGTP_URL, EXAMPLE_PROMPTS_URL } from "../../constants";

export default function Popup() {

    return (
        <PopupLayout header={<PopupHeader></PopupHeader>}>
            <PopupContent
                onOpenChat={() => window.open(CHATGTP_URL)}
                onOpenOptions={() => browser.runtime.openOptionsPage()}
                onOpenPromptRepo={() => window.open(EXAMPLE_PROMPTS_URL)}></PopupContent>
        </PopupLayout>
    );
}
