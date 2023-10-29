import React from 'react';


/**
 * Interface for text fields.
 * 
 * @property {string} name The name of the text field.
 * @property {string} value The value of the text field.
 * @property {(event: React.ChangeEvent<any>) => void} onChange The change handler for the text field.
 * @property {(event: React.FocusEvent<any>) => void} onBlur The blur handler for the text field.
 */
interface TextField {
    name: string;
    value?: string;
    onChange: (event: React.ChangeEvent<any>) => void;
    onBlur: (event: React.FocusEvent<any>) => void;
}


/**
 * Interface for text field props used in the formik form.
 * 
 * @property {TextField} field The text field.
 * @property {string} className The class name for the text field.
 * @property {string} placeholder The placeholder for the text field.
 * @property {string} type The type for the text field.
 * @property {(value: string | undefined) => string | undefined} validate The validation function for the text field.
 */
interface TextFieldArgs {
    field: TextField;
    className?: string;
    placeholder?: string;
    type?: string;
    validate?: (value: string | undefined) => string | undefined;
}


/**
 * Field component for input fields.
 * 
 * @param field the text field information.
 * @param props the optional props for the text field.
 * @returns React.JSX.Element with the custom input field
 */
const InputField = ({ field, ...props }: TextFieldArgs): React.JSX.Element => {
    const className = 'w-full rounded-lg pl-2 py-1 bg-transparent ' + (props.className ? props.className : '');
    return (
        <div className='border-slate-400 border-2 rounded-lg'>
            <input { ...field } { ...props } className={ className } />
        </div>
    )
};


/**
 * Field component for textarea fields.
 * 
 * @param field the text field information.
 * @param props the optional props for the text field.
 * @returns React.JSX.Element with the custom textarea field
 */
const TextareaField = ({ field, ...props }: TextFieldArgs): React.JSX.Element => {
    const className = 'w-full rounded-lg pl-2 py-1 bg-transparent ' + (props.className ? props.className : '');
    return (
        <div className='border-slate-400 border-2 rounded-lg'>
            <textarea { ...field } { ...props } className={ className } />
        </div>
    )
}


export { InputField, TextareaField };
