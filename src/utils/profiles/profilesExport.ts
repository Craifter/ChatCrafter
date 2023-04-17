import { profilesStorageById } from './profilesStorage';

/** Export profile to file */
export const exportProfile = async (profileId: string): Promise<void> => {
  const profile = await profilesStorageById(profileId);
  const json = JSON.stringify(profile);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const name = profile.name.replace(/[/\\?%*:|"<>]/g, '-');

  a.href = url;
  a.download = name + '.json';
  a.click();
  URL.revokeObjectURL(url);
};
