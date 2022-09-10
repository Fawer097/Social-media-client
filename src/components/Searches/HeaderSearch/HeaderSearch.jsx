import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import styles from './HeaderSearch.module.scss';
import { useEffect } from 'react';
import userService from '../../../services/userService';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { useDispatch } from 'react-redux';
import { setOtherUser } from '../../../redux/slices/otherUserSlice';
import { useNavigate } from 'react-router-dom';

const HeaderSearch = () => {
  const [selected, setSelected] = useState('');
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 0) {
      userService
        .searchUsers(query)
        .then((data) => {
          setUsers(data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [query]);

  const openUserProfile = (uid) => {
    dispatch(setOtherUser(uid));
    setTimeout(() => navigate(`profile${uid}`));
  };

  return (
    <Combobox value={selected} onChange={setSelected}>
      <Combobox.Input
        className={styles.searchInput}
        onChange={(event) => setQuery(event.target.value)}
      />

      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setQuery('')}
      >
        <Combobox.Options className={styles.searchOptions}>
          {(users.length === 0 && query.length > 0) || query === '' ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-500">
              Nothing found
            </div>
          ) : (
            users.map((user) => (
              <Combobox.Option
                className={styles.optionItem}
                key={user.uid}
                onClick={() => openUserProfile(user.uid)}
              >
                <div className="flex items-center">
                  <div>
                    <img
                      className="w-7 h-7 rounded-full"
                      src={user.avatarUrl ? user.avatarUrl : defaultAvatar}
                      alt="avatar"
                    />
                  </div>
                  <div className="ml-2">{user.fullName}</div>
                </div>
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Transition>
    </Combobox>
  );
};

export default HeaderSearch;
