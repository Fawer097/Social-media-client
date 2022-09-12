import React from 'react';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

const EmptyMessage = (props) => {
  return (
    <div className="flex flex-col items-center w-full text-center mt-8 text-gray-400">
      <FaceFrownIcon className="w-8 mb-2" />
      <p className="w-60">{props.message}</p>
    </div>
  );
};

export default EmptyMessage;
