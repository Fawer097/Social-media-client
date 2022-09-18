import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

const genders = [
  { name: 'Gender', value: '' },
  { name: 'Male', value: 'male' },
  { name: 'Female', value: 'female' },
];

const GenderSelect = (props) => {
  const [selected, setSelected] = useState(genders[0]);

  return (
    <div className="w-28 mr-4">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative cursor-pointer">
          <Listbox.Button className="relative w-full rounded-lg py-2 pl-3 pr-10 text-gray-500 text-left">
            <span>{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute text-sm mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white shadow-custom py-1 z-20">
              {genders.map((gender, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative select-none py-2 pl-10 pr-4 rounded-md ${
                      active ? 'bg-darkGreen text-white' : 'text-gray-800'
                    }`
                  }
                  value={gender}
                  onClick={() => props.genderQuery(gender.value)}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {gender.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default GenderSelect;
