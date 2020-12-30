import React from 'react';
import { Switch } from '@headlessui/react';

type Props = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
};

export function SwitchWithLabel(props: Props): JSX.Element {
  return (
    <Switch.Group as="div" className="flex items-center space-x-4">
      <Switch.Label>{props.label}</Switch.Label>
      <Switch
        as="button"
        checked={props.enabled}
        onChange={props.onChange}
        className={`${
          props.enabled ? 'bg-indigo-600' : 'bg-gray-200'
        } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline`}
      >
        {({ checked }) => (
          <span
            className={`${
              checked ? 'translate-x-5' : 'translate-x-0'
            } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
          />
        )}
      </Switch>
    </Switch.Group>
  );
}

export default SwitchWithLabel;
