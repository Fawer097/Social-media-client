import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

const FormErrorParagraph = (props) => {
  return (
    <div className="flex items-center text-xs h-6 text-red-500">
      <div className="flex items-center">
        <ExclamationCircleIcon width={20} />
        <p className="ml-1">{props.message}</p>
      </div>
    </div>
  );
};

export default FormErrorParagraph;
