import React from 'react';
import './StepThree.scss';
import CustomInput from '../../CustomInput';
export default function StepThree(props) {
  const { action, actionClick } = props;

  return (
    <div className='step-three'>
      <form className='step-three__form'>
        <fieldset className='step-three__form__color-selector'>
          <legend>Цвет</legend>
          <br></br>
          <CustomInput
            type='radio'
            name='color'
            value='Любой'
            checked={true}
            description='Любой'
            onChangeAction={action}
          />
          <CustomInput
            type='radio'
            name='color'
            value='Красный'
            description='Красный'
            onChangeAction={action}
          />
          <CustomInput
            type='radio'
            name='color'
            value='Голубой'
            description='Голубой'
            onChangeAction={action}
          />
        </fieldset>
        <fieldset className='step-three__form__date-selector'>
          <legend>Дата аренды</legend>
          <CustomInput
            onChangeAction={action}
            name='dateFrom'
            description={'С'}
            type='datetime-local'
          />
          <br />
          <CustomInput
            onChangeAction={action}
            name='dateTo'
            description={'До'}
            type='datetime-local'
          />
        </fieldset>
        <fieldset className='step-three__form__tariff'>
          <legend>Тариф</legend>
          <br />
          <CustomInput
            type='radio'
            name='tariff'
            value='perMin'
            checked={true}
            description='Поминутно, 7₽/мин'
            onChangeAction={action}
          />
          <br />
          <CustomInput
            type='radio'
            name='tariff'
            value='perDay'
            checked={false}
            description='На сутки, 1999 ₽/сутки'
            onChangeAction={action}
          />
        </fieldset>
        <fieldset className='step-three__form__additional'>
          <legend>Дополнительные услуги</legend>
          <br />
          <CustomInput
            type='checkbox'
            name='isFullTank'
            checked={true}
            description='Полный бак, 500р'
            onChangeAction={actionClick}
          />
          <br />
          <CustomInput
            type='checkbox'
            name='isNeedChildChair'
            checked={false}
            description='Детское кресло, 200р'
            onChangeAction={actionClick}
          />
          <br />
          <CustomInput
            type='checkbox'
            name='isRightWheel'
            checked={false}
            description='Правый руль, 1600р'
            onChangeAction={actionClick}
          />
        </fieldset>
      </form>
    </div>
  );
}
