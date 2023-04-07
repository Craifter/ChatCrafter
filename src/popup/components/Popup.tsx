import React, { type FC } from 'react'
import { PopupLayout } from './PopupLayout'
import { PopupHeader } from './PopupHeader'
import { PopupContent } from './PopupContent'
import browser from 'webextension-polyfill'
import { CHATGTP_URL, EXAMPLE_PROMPTS_URL } from '../../constants'

export const Popup: FC = () => {
  return (
    <PopupLayout header={<PopupHeader></PopupHeader>}>
      <PopupContent
        onOpenChat={() => window.open(CHATGTP_URL)}
        onOpenOptions={async () => { await browser.runtime.openOptionsPage() }}
        onOpenPromptRepo={() => window.open(EXAMPLE_PROMPTS_URL)}></PopupContent>
    </PopupLayout>
  )
}
