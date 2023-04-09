import React, { type FC, useState } from 'react'
import { Button } from '../../components/Button'
import { IconFile, IconLink, IconPackageExport, IconPackageImport } from '@tabler/icons-react'
import { ICON_SIZE } from '../../constants'
import { PromptArea } from '../components/PromtArea'

export interface OptionsPageOwnPromptsProps {

}

export const OptionsPagesPrompts: FC<OptionsPageOwnPromptsProps> = () => {
  const [showPaste, setShowPaste] = useState(false)

  return (
    <>
      <div className={'flex flex-wrap gap-2'}>
        <Button onClick={() => {}} icon={<IconPackageImport size={ICON_SIZE}/>}>Load new from Disk</Button>
        <Button onClick={() => {}} icon={<IconLink size={ICON_SIZE}/>}>Load new from URL</Button>
        <Button onClick={() => { setShowPaste(!showPaste) }} icon={<IconFile size={ICON_SIZE}/>} extendButtonClass={showPaste ? 'underline underline-offset-2' : ''}>Paste</Button>
        <Button onClick={() => {}} icon={<IconPackageExport size={ICON_SIZE}/>}>Export</Button>
      </div>
      {showPaste && (
        <div className={'mt-4'}>
          <PromptArea />
        </div>
      )}
    </>
  )
}
