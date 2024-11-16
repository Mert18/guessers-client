import { ISelectOption } from '@/types/IGlobal.model';
import React, { useState, useRef, useEffect } from 'react';

interface ICustomSelectProps {
  options: ISelectOption[];
  value?: ISelectOption;
  onChange: (option: ISelectOption) => void;
  placeholder?: string;
  width?: string;
}

const CustomSelect = ({ options, value, onChange, placeholder = 'Select an option', width = "full"}: ICustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ISelectOption>(value);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-${width}`} ref={dropdownRef}>
      <div
        className="bg-background border-b border-primary flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${selectedOption ? 'text-primary' : 'text-text'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full bg-background mt-1 rounded-md shadow-lg max-h-[300px] overflow-y-auto my-4 scrollbar-thin border border-primary">
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 hover:bg-background2 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;