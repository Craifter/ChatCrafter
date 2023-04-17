import { profilesStorage } from './profilesStorage';

/** Import profile from file */
export const profilesImport = async (): Promise<string> => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.click();
  return await new Promise((resolve, reject) => {
    input.onchange = async () => {
      if (input.files == null) {
        reject(new Error('No file selected'));
        return;
      }
      const file = input.files[0];
      if (file == null) {
        reject(new Error('No file selected'));
        return;
      }
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = async () => {
        const json = reader.result as string;
        try {
          const profile = JSON.parse(json);
          await profilesStorage([profile]);
          resolve(profile.id);
        } catch (e) {
          reject(e);
        }
      };
    };
  });
};
