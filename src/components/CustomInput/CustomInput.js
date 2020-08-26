import React from 'react';
import './CustomInput.scss';
export default function CustomInput({
  name,
  type,
  placeholder,
  onChangeAction,
  value,
  defaultChecked,
  checked,
  description,
  list,
  dateFrom,
  dateTo,
  disabled,
  delAction,
  readOnly,
}) {
  return type === 'text' || type === 'datetime-local' || type === 'select' ? (
    <label className='label-for-text-input'>
      {description}
      <input
        autoComplete='off'
        className='textInput'
        type={type}
        min={
          type === 'datetime-local'
            ? name === 'dateTo' && dateFrom !== 0?
              `${dateFrom}`
              : `${new Date().getFullYear()}-${`${
                  new Date().getMonth() + 1
                }`.padStart(2, 0)}-${`${new Date().getDate()}`.padStart(
                  2,
                  0,
                )}T${`${new Date().getHours()}`.padStart(
                  2,
                  0,
                )}:${`${new Date().getMinutes()}`.padStart(2, 0)}`
            : ''
        }
        max={
          type === 'datetime-local'
            ? name === 'dateTo' && dateFrom !== 0
              ? `${new Date(dateFrom).getFullYear()}-${`${
                  new Date(dateFrom).getMonth() + 2
                }`.padStart(2, 0)}-${`${new Date(dateFrom).getDate()}`.padStart(
                  2,
                  0,
                )}T${`${new Date(dateFrom).getHours()}`.padStart(
                  2, 0)}:${`${new Date(dateFrom).getMinutes()}`.padStart(2, 0)}`
              : `${dateTo}`
            : ''
        }
        required='required'
        name={name}
        placeholder={placeholder}
        onChange={onChangeAction}
        value={value}
        list={list}
        disabled={disabled}
      />
      {type === 'text' ? (
        <button
          name={name}
          value={''}
          onClick={delAction ? delAction : onChangeAction}
          className='reset-btn'
          title='Очистить поле'
        >
          &times;
        </button>
      ) : (
        ''
      )}
    </label>
  ) : type === 'radio' ? (
    <label className='radio-btn__description'>
      <input
        className='radio-btn'
        type='radio'
        name={name}
        value={value}
        onChange={onChangeAction}
        checked={checked}
        defaultChecked={defaultChecked}
      />
      <span>{description}</span>
    </label>
  ) : (
    <label className='checkbox__description'>
      <input
      readOnly={readOnly}
        className='checkbox'
        type='checkbox'
        name={name}
        value={value}
        onChange={onChangeAction}
        checked={checked}
      />
      <span>{description}</span>
    </label>
  );
}
