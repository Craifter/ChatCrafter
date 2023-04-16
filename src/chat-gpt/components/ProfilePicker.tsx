import React, { type FC, useEffect, useState } from 'react';
import { type ProfilesStorage } from '../../types/profilesStorage';
import { IconCaretDown, IconCaretUp, IconPencil, IconPlus } from '@tabler/icons-react';
import { ICON_SIZE } from '../../constants';

interface ProfilePickerProps {
  profiles: ProfilesStorage[]
  selectedProfile: string
  onProfileSelect: (id: string) => void
  actions: {
    createProfile: (name: string) => void
    openOptions: () => void
  }
}

export const ProfilePicker: FC<ProfilePickerProps> = ({
  profiles,
  onProfileSelect,
  actions,
  selectedProfile
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProfile, setActiveProfile] = useState(selectedProfile);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createName, setCreateName] = useState('');

  const sidebarProfilesActions = [{
    label: 'Edit',
    icon: <IconPencil size={ICON_SIZE}/>,
    handler: () => { actions.openOptions(); }
  }, {
    label: 'Create',
    icon: <IconPlus size={ICON_SIZE}/>,
    handler: () => { setIsCreateOpen(!isCreateOpen); }
  }];
  const handleSelect = (id: string): void => {
    setActiveProfile(id);
    onProfileSelect(id);
    setIsOpen(false);
  };

  const handleCreate = (): void => {
    actions.createProfile(createName);
    setIsOpen(false);
    setIsCreateOpen(false);
    setCreateName('');
  };

  useEffect(() => {
    setActiveProfile(selectedProfile);
  }, [selectedProfile]);

  return (<div className="relative" onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsOpen(false);
    }
  }}>
    <button
      className="cc-profile-picker__button cc-profile-picker__button--border"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {profiles.find((profile) => profile.id === activeProfile)?.name}
      <span className="cc-profile-picker__button__icon">
          {isOpen ? (<IconCaretUp size={ICON_SIZE}/>) : (<IconCaretDown size={ICON_SIZE}/>)}
        </span>
    </button>
    {isOpen && (<ul
      className="cc-profile-picker__list" tabIndex={0}>
      <li key={'config'} className={'cc-profile-picker__actions'}>
        {sidebarProfilesActions.map((action) => (<button
          className={'cc-profile-picker__button cc-profile-picker__button--center'}
          onClick={action.handler}
          key={action.label}
        >
          <span className="cc-profile-picker__button__icon">{action.icon}</span>
          {action.label}
        </button>))}
      </li>
      {isCreateOpen && (<li key={'create'} className={'cc-profile-picker__create'}>
          <label htmlFor="create-profile">
            <div className={'cc-profile-picker__create__label'}>Profile Name</div>
          </label>
          <div className={'cc-profile-picker__create__container'}>
            <input className={'cc-profile-picker__create__input'} id="create-profile" type="text" placeholder={''}
                   value={createName} onChange={(event) => {
                     setCreateName(event.target.value);
                   }}/>
            <button className={'cc-profile-picker__create__button'} onClick={() => {
              handleCreate();
            }}>
              <IconPlus size={ICON_SIZE}/>
            </button>
          </div>
        </li>)}
      {profiles.map((profile) => (<li key={profile.id}>
        <button className={'cc-profile-picker__button'} onClick={() => {
          handleSelect(profile.id);
        }}>
          {profile.name}
        </button>
      </li>))}
    </ul>)}
  </div>);
};
