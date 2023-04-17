import React, { type FC } from 'react';

export interface ProfilesEditProps {

}

export const ProfilesEdit: FC<ProfilesEditProps> = () => {
  return (
    <p className={'dark:text-white'}>
      Todos for this page:<br />
      Change Name<br />
      Change Description<br />
      Export Profile<br />
      Delete Profile
    </p>
  );
};
