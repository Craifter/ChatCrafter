import React, { type FC, useEffect } from 'react';
import { ICON_SIZE } from '../../../constants';
import { IconDownload, IconTrash } from '@tabler/icons-react';
import { Button } from '../../../components/Button';

export interface ProfilesEditProps {
  onExportProfile: () => void
  onDeleteProfile: () => void
  profileName: string
  onSave: (options: { name: string }) => void
}

export const ProfilesEdit: FC<ProfilesEditProps> = ({
  onExportProfile,
  onDeleteProfile,
  profileName,
  onSave
}) => {
  const [name, setName] = React.useState<string>(profileName);

  useEffect(() => {
    setName(profileName);
  }, [profileName]);

  const actions = [
    {
      label: 'Export Profile',
      icon: <IconDownload size={ICON_SIZE}/>,
      onClick: onExportProfile
    },
    {
      label: 'Delete Profile',
      icon: <IconTrash size={ICON_SIZE}/>,
      onClick: onDeleteProfile
    }
  ];

  const onSubmit = (): void => {
    onSave({ name });
  };

  return (
    <div className={'max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-base dark:text-white'}>
      <h1 className={'text-xl font-bold dark:text-white'}>Edit Profile</h1>
      <label htmlFor="profileName" className={'flex gap-2'}>
        <div className={'pt-1'}>
              Profile Name
        </div>
        <div>
          <input type="text" name="profileName" id="profileName"
            className={'h-8 border-2 border-blue-700 dark:border-blue-950 bg-transparent rounded-lg w-full'}
                 onChange={(e) => { setName(e.target.value); }} value={name} />
        </div>
      </label>
      <div className="mt-4 flex flex-nowrap overflow-x-auto gap-2 pb-2 text-white">
        {actions.map((action) => (
          <Button key={action.label} onClick={action.onClick} icon={action.icon}>
            {action.label}
          </Button>
        ))}
        <div className="ml-auto">
          <Button onClick={() => { onSubmit(); }}>Save</Button>
        </div>
      </div>
    </div>
  );
};
