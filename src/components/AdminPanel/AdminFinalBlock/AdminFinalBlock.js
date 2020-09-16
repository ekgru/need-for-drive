import React from 'react';
import './AdminFinalBlock.scss';
export default function AdminFinalBlock({ text, closeAction }) {
  return (
    <div className='admin__final-block'>
      <p>✓ {text} </p>
      <button onClick={closeAction}>✖</button>
    </div>
  );
}
