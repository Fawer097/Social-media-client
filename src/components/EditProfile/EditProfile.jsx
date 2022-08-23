import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './EditProfile.module.scss';

const EditProfile = () => {
  const state = useSelector((state) => state.userData);
  const [firstName, setFirstName] = useState(state.firstName);
  const [lastName, setLastName] = useState(state.lastName);
  const [about, setAbout] = useState(state.about);
  const [site, setSite] = useState(state.site);
  const [city, setCity] = useState(state.city);
  const [country, setCountry] = useState(state.country);
  const [company, setCompany] = useState(state.company);
  const [jobTitle, setJobTitle] = useState(state.jobTitle);

  return (
    <div className="px-6 pt-4">
      <div className="flex flex-col items-center mt-8">
        <div className="flex flex-col items-center">
          <label htmlFor="uploadAvatar">
            <img
              className="w-32 h-32 rounded-full cursor-pointer border border-gray-400"
              src=""
              alt="avatar"
            />
          </label>
          <input
            type="file"
            name="uploadAvatar"
            id="uploadAvatar"
            className="hidden"
          />
          <p className="text-xs mt-5 text-gray-400">
            Click on the avatar to change it
          </p>
        </div>
        <div className="w-[550px] mt-10">
          <div className={styles.sectionHeader}>
            <h4>Personal information</h4>
          </div>
          <hr />
          <div className="flex justify-between mt-6">
            <div className="flex items-center">
              <label htmlFor="first-name" className={styles.label}>
                First Name:
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                className={[styles.input, 'w-42'].join(' ')}
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="last-name" className={styles.label}>
                Last Name:
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                className={[styles.input, 'w-42'].join(' ')}
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center mt-6">
            <label
              htmlFor="date-of-birth"
              className={[styles.label, 'w-32'].join(' ')}
            >
              Date of Birth:
            </label>
            <input
              type="date"
              name="date-of-birth"
              id="date-of-birth"
              value={state.dateOfBirth}
              disabled
              className={[styles.input, 'w-full'].join(' ')}
            />
          </div>
          <div className="flex items-center mt-6">
            <label htmlFor="email" className={[styles.label, 'w-36'].join(' ')}>
              Email address:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              disabled
              value={state.email}
              className={[styles.input, 'w-full'].join(' ')}
            />
          </div>
          <div className="flex items-center mt-6">
            <label htmlFor="about" className={[styles.label, 'w-24'].join(' ')}>
              About me:
            </label>
            <textarea
              placeholder="You can write a little about yourself..."
              style={{ resize: 'none' }}
              type="text"
              name="about"
              id="about"
              className={styles.aboutInput}
              value={about}
              onChange={(event) => setAbout(event.target.value)}
            />
          </div>
          <div className="flex items-center mt-6 mb-8">
            <label
              htmlFor="personal-site"
              className={[styles.label, 'w-32'].join(' ')}
            >
              Personal site:
            </label>
            <input
              type="url"
              name="personal-site"
              id="personal-site"
              className={[styles.input, 'w-full'].join(' ')}
              value={site}
              onChange={(event) => setSite(event.target.value)}
            />
          </div>
          <div className={styles.sectionHeader}>
            <h4>Location information</h4>
          </div>
          <hr />
          <div className="flex justify-between mt-6 mb-8">
            <div className="flex items-center">
              <label htmlFor="city" className={styles.label}>
                City:
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className={[styles.input, 'w-42'].join(' ')}
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="country" className={styles.label}>
                Country:
              </label>
              <input
                type="text"
                name="country"
                id="country"
                className={[styles.input, 'w-42'].join(' ')}
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              />
            </div>
          </div>
          <div className={styles.sectionHeader}>
            <h4>Job information</h4>
          </div>
          <hr />
          <div className="flex justify-between mt-6 mb-10">
            <div className="flex items-center">
              <label htmlFor="company" className={styles.label}>
                Company:
              </label>
              <input
                type="text"
                name="company"
                id="company"
                className={[styles.input, 'w-42'].join(' ')}
                value={company}
                onChange={(event) => setCompany(event.target.value)}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="job-title" className={styles.label}>
                Job title:
              </label>
              <input
                type="text"
                name="job-title"
                id="job-title"
                className={[styles.input, 'w-42'].join(' ')}
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <button type="submit" className={styles.button}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
