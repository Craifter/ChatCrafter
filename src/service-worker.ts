import browser from 'webextension-polyfill'

browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: 'sampleContextMenu',
    title: 'Sample Context Menu',
    contexts: ['link']
  })
})
