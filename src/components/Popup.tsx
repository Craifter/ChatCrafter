import React, { useCallback } from "react";
import { PopupLayout } from "./PopupLayout";
import PopupHeader from "./PopupHeader";
import { PopupContent } from "./PopupContent";

type PopupProps = { num: number };

export default function Popup({ num }: PopupProps) {

    const openOptionsPage = useCallback(() => {

        if (typeof browser !== 'undefined' && browser.runtime.openOptionsPage) {
            // For modern browsers
            browser.runtime.openOptionsPage();
        } else if (chrome.runtime.openOptionsPage) {
            // For Chrome
            chrome.runtime.openOptionsPage();
        } else {
            console.error('Cannot find the runtime API to open the options page.');
        }
    }, []);
    return (
        <PopupLayout header={<PopupHeader></PopupHeader>}>
            <PopupContent
                onOpenChat={function (): void {
                    throw new Error("Function not implemented.");
                }}
                onOpenOptions={openOptionsPage}
                onOpenPromptRepo={function (): void {
                    throw new Error("Function not implemented.");
                }}></PopupContent>
        </PopupLayout>
    );
}
