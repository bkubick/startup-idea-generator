import React from 'react';

import { Option } from './types';


/**
 * Interface for radio fields.
 * 
 * @property {string} name The name of the radio field.
 * @property {string} value The value of the radio field.
 * @property {(event: React.ChangeEvent<any>) => void} onChange The change handler for the radio field.
 * @property {(event: React.FocusEvent<any>) => void} onBlur The blur handler for the radio field.
 */
interface RadioField {
    name: string;
    value?: string;
    onChange: (event: React.ChangeEvent<any>) => void;
    onBlur: (event: React.FocusEvent<any>) => void;
}


/**
 * Interface for radio field props.
 * 
 * @property {string} className The class name for the radio field.
 * @property {(value: string | undefined) => string | undefined} validate The validation function for the radio field.
 * @property {Option[]} options The options for the radio field.
 */
interface RadioGroupProps {
    className?: string;
    validate?: (value: string | undefined) => string | undefined;
    options: Option[];
}


/**
 * Interface for radio field props used in the formik form.
 * 
 * @property {RadioField} field The radio field.
 */
interface RadioGroupArgs extends RadioGroupProps {
    field: RadioField;
}


/**
 * Generates the radio item.
 * 
 * @param option The option for the radio item.
 * @param index The index of the radio item.
 * @param field The radio field.
 * @param props The radio field props.
 * @returns React.JSX.Element with the radio item.
 */
function radioItem(option: Option, index: number, field: RadioField, props: RadioGroupProps): React.JSX.Element {
    const checked = field.value === option.value;
    return (
        <div key={ index } className='mr-4'>
            <input type="radio" id={ option.value } { ...field } { ...props } value={ option.value } className={ 'mr-2' } checked={ checked }/>
            <label htmlFor={ option.value }>{ option.label }</label>
        </div>
    )
}


/**
 * Field component for group of radio buttons.
 * 
 * @param field the radio field information.
 * @param props the optional props for the radio field.
 * @returns React.JSX.Element with the custom radio field
 */
const RadioGroup = ({ field, ...props }: RadioGroupArgs): React.JSX.Element => {
    const className = props.className ? props.className : '';
    return (
        <div className={ className }>
            { props.options.map((option, index) => radioItem(option, index, field, props)) }
        </div>
    )
};


export { RadioGroup };
