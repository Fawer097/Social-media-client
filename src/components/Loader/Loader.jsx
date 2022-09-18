import React from 'react';
import spinner from './Spinner-1.1s-201px.svg';

const Loader = (props) => {
  return (
    <div className={`w-${props.size} h-${props.size}`}>
      <img src={spinner} alt="spinner" />
    </div>
  );
};

export default Loader;
