import browser from 'webextension-polyfill'

const main = async (): Promise<void> => {
  browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
      id: 'sampleContextMenu',
      title: 'Sample Context Menu',
      contexts: ['link']
    })
  })
}

main().catch(console.error)
