import React, { type FC, useState } from 'react';
import { type ProfilesStorage } from '../../types/profilesStorage';
import { IconCaretDown, IconCaretUp } from '@tabler/icons-react';
import { ICON_SIZE } from '../../constants';

export interface ProfilePickerActionProps {
  label: string
  icon: React.ReactNode
  handler: () => void
}

interface ProfilePickerProps {
  profiles: ProfilesStorage[]
  activeProfile: string
  onProfileSelect: (id: string) => void
  actions: ProfilePickerActionProps[]
}

export const ProfilePicker: FC<ProfilePickerProps> = ({
  profiles,
  onProfileSelect,
  actions
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProfile, setActiveProfile] = useState(profiles[0].id);
  const handleSelect = (id: string): void => {
    setIsOpen(false);
    setActiveProfile(id);
    onProfileSelect(id);
  };

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
      className="cc-profile-picker__list">
      <li key={'config'} className={'cc-profile-picker__actions'}>
        {actions.map((action) => (<button
          className={'cc-profile-picker__button cc-profile-picker__button--center'}
          onClick={action.handler}
          key={action.label}
        >
          <span className="cc-profile-picker__button__icon">{action.icon}</span>
          {action.label}
        </button>))}
      </li>
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
