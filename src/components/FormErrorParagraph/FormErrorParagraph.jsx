import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const FormErrorParagraph = (props) => {
  return (
    <div className="flex items-center text-xs h-6 text-red-500">
      <div className="flex items-center">
        <ExclamationTriangleIcon width={20} />
        <p className="ml-1">{props.message}</p>
      </div>
    </div>
  );
};

export default FormErrorParagraph;
