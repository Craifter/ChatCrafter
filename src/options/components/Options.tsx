import React from 'react'
import { OptionsLayout } from './OptionsLayout'
import OptionsHeader from './OptionsHeader'
import { OptionsContent } from './OptionsContent'
import { CHATGTP_URL, EXAMPLE_PROMPTS_URL } from '../../constants'

export default function Options (): JSX.Element {
  return (
    <OptionsLayout header={<OptionsHeader></OptionsHeader>}>
      <OptionsContent
        onOpenChat={() => window.open(CHATGTP_URL)}
        onOpenPromptRepo={() => window.open(EXAMPLE_PROMPTS_URL)}
      ></OptionsContent>
    </OptionsLayout >
  )
}
