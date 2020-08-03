import React from 'react';
export default function NavElement({
  value,
  action,
  description,
  completedStep,
}) {
  return (
    <>
      <button
        className='order-page__nav__btn'
        name='currentStep'
        value={value}
        onClick={action}
        disabled={value > completedStep ? 'disabled' : ''}
      >
        {description}
      </button>
      {value !== 3 && <span>►</span>}
    </>
  );
}
