import React from 'react';
import { Ps1 } from '../ps1';

export const Input = ({ inputRef, command, onChange, onSubmit }) => {
  return (
    <div className="flex flex-row space-x-2">
      <label htmlFor="prompt" className="flex-shrink">
        <Ps1 />
      </label>

      <input
        ref={inputRef}
        id="prompt"
        type="text"
        className="bg-light-background dark:bg-dark-background focus:outline-none flex-grow"
        value={command}
        onChange={onChange}
        autoFocus
        onKeyDown={onSubmit}
      />
    </div>
  );
};

export default Input;
