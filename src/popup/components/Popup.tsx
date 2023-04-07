import React, { useCallback } from "react";
import { PopupLayout } from "./PopupLayout";
import PopupHeader from "./PopupHeader";
import { PopupContent } from "./PopupContent";
import browser from 'webextension-polyfill'

type PopupProps = { num: number };

export default function Popup({ num }: PopupProps) {

    return (
        <PopupLayout header={<PopupHeader></PopupHeader>}>
            <PopupContent
                onOpenChat={function (): void {
                    throw new Error("Function not implemented.");
                }}
                onOpenOptions={() => browser.runtime.openOptionsPage()}
                onOpenPromptRepo={function (): void {
                    throw new Error("Function not implemented.");
                }}></PopupContent>
        </PopupLayout>
    );
}
