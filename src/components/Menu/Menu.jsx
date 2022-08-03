import React from 'react';
import styles from './Menu.module.scss';
import { menuItems } from './menuItems';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className={styles.wrapper}>
      <ul className="flex flex-col justify-between w-full h-52 pl-7">
        {menuItems.map((item, index) => {
          return (
            <li key={item.name + index}>
              <Link
                to={`/${item.name.toLowerCase()}`}
                className="flex items-center cursor-pointer"
              >
                <div className="w-6 mr-4 text-gray-600">{item.icon}</div>
                <p className="tracking-wide text-lg text-gray-800">
                  {item.name}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
