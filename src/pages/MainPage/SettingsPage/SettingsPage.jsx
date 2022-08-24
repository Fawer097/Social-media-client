import React from 'react';
import { useState } from 'react';
import EditProfile from '../../../components/EditProfile/EditProfile';
import styles from './SettingsPage.module.scss';

const SettingsPage = () => {
  const [section, setSection] = useState('profile');

  return (
    <div className="mx-4 pb-10 w-full">
      <div className="text-xl text-gray-800 tracking-wide ml-6 mb-4">
        <h2>Settings</h2>
      </div>
      <div className="ml-6">
        <ul className="flex justify-between w-36 tracking-wide">
          <li
            onClick={() => setSection('profile')}
            className={
              section === 'profile' ? styles.activeSection : styles.sectionName
            }
          >
            Profile
          </li>
          <li
            onClick={() => setSection('security')}
            className={
              section === 'security' ? styles.activeSection : styles.sectionName
            }
          >
            Security
          </li>
        </ul>
      </div>
      <hr />
      {section === 'profile' && <EditProfile />}
    </div>
  );
};

export default SettingsPage;
