import { type ProfilesStorage } from '../../types/profilesStorage';
import browser from 'webextension-polyfill';

/** Listen for profiles changes */
export const profilesListenerStorage = (setState: (state: ProfilesStorage[]) => void): void => {
  browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && changes.profiles != null) {
      setState(changes.profiles.newValue);
    }
  });
};
