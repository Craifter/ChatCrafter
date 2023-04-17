import React, { type FC } from 'react';
import { ICON_SIZE } from '../../../constants';
import { IconDownload, IconTrash } from '@tabler/icons-react';
import { Button } from '../../../components/Button';

export interface ProfilesEditProps {
  onExportProfile: () => void
  onDeleteProfile: () => void
}

export const ProfilesEdit: FC<ProfilesEditProps> = ({
  onExportProfile,
  onDeleteProfile
}) => {
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

  return (
    <div className={'max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-base dark:text-white'}>
      <p className={'dark:text-white'}>
        Todos for this page:<br />
        Change Name<br />
        Change Description<br />
      </p>
      <div className="mt-4 flex flex-nowrap overflow-x-auto gap-2 pb-2 text-white">
        {actions.map((action) => (
          <Button key={action.label} onClick={action.onClick} icon={action.icon}>
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
