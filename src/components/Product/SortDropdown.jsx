import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';

const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'newest', label: 'Newest' },
];

function SortDropdown({ value, onChange }) {
    const selectedOption = sortOptions.find(opt => opt.id === value) || sortOptions[0];

    return (
        <Listbox value={value} onChange={onChange}>
            <div className="relative">
                <Listbox.Button className="relative w-full sm:w-48 bg-surface-elevated border border-surface-overlay rounded-full py-3 pl-4 pr-10 text-left text-white cursor-pointer hover:border-accent-primary transition-colors">
                    <span className="block truncate">{selectedOption.label}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-10 mt-2 w-full bg-surface-elevated border border-surface-overlay rounded-2xl py-2 shadow-xl max-h-60 overflow-auto focus:outline-none">
                        {sortOptions.map(option => (
                            <Listbox.Option
                                key={option.id}
                                value={option.id}
                                className={({ active }) =>
                                    `relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                                        active ? 'bg-surface-raised text-accent-primary' : 'text-white'
                                    }`
                                }
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                                selected ? 'font-semibold' : 'font-normal'
                                            }`}
                                        >
                                            {option.label}
                                        </span>
                                        {selected && (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent-primary">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
}

export default SortDropdown;
