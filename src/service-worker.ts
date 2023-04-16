import browser from 'webextension-polyfill';
import { profilesInit } from './utils/profiles/profilesInit';

const setBrowserIcons = async (isBlack: boolean = true): Promise<void> => {
  const suffix = isBlack ? 'black' : 'white';
  await browser.action.setIcon({
    path: {
      16: `assets/logo/16-${suffix}.png`,
      32: `assets/logo/32-${suffix}.png`,
      48: `assets/logo/48-${suffix}.png`,
      128: `assets/logo/128-${suffix}.png`
    }
  });
};

const setupConfig = async (): Promise<void> => {
  const { syncOptions } = await browser.storage.sync.get('syncOptions');
  if (syncOptions !== undefined && syncOptions.whiteBrowserIcons === true) { void setBrowserIcons(false); }
};

const onStorageSyncChange = async (changes: Record<string, browser.Storage.StorageChange>): Promise<void> => {
  if (changes?.syncOptions?.newValue !== undefined) {
    const options = changes.syncOptions.newValue;
    if (options.whiteBrowserIcons === true) { void setBrowserIcons(false); } else { void setBrowserIcons(); }
  }
};

const listenForMessages = async (): Promise<void> => {
  browser.runtime.onMessage.addListener(async (message: {
    command: string
    data: any
  }) => {
    switch (message.command) {
      case 'openOptions':
        await browser.runtime.openOptionsPage();
        break;
    }
  });
};

const main = async (): Promise<void> => {
  await setupConfig();
  browser.storage.onChanged.addListener(onStorageSyncChange);
  await profilesInit();
  await listenForMessages();
};

main().catch(console.error);
