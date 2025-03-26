import React from 'react';

export default function Button(props: {
  label: string;
  customClass?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button className={props.customClass} onClick={props.onClick}>
      {props.label}
    </button>
  );
}
