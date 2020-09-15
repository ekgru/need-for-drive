import React from 'react';
import { Link } from 'react-router-dom';
import './AdminFinalBlock.scss'
export default function AdminFinalBlock({
  text,
  link,
  linkText,
  linkReturnText,
  returnAction,
}) {
  return (
    <div className='admin__final-block'>
      <h1 className='admin__final-block__text'>{text} </h1>
      <Link className='admin__final-block__link' to={link}>
        {linkText}
      </Link>
      <button className='admin__final-block__link' onClick={returnAction}>
        {linkReturnText}
      </button>
    </div>
  );
}
