import React from 'react';


/**
 * Interface for text fields.
 */
interface TextField {
    name: string;
    value?: string;
    className?: string;
    onChange: (event: React.ChangeEvent<any>) => void;
    onBlur: (event: React.FocusEvent<any>) => void;
    placeholder?: string;
    type?: string;
    validate?: (value: string | undefined) => string | undefined;
}


/**
 * Field component for input fields.
 * 
 * @param field
 * @param props
 * @returns React.JSX.Element with the custom input field
 */
const InputField = ({ field, ...props }: { field: TextField, props: object }): React.JSX.Element => {
    const className = 'w-full rounded-lg pl-2 py-1 bg-transparent ' + (field.className ? field.className : '');
    return (
        <div className='border-slate-400 border-2 rounded-lg'>
            <input { ...field } { ...props } className={ className } />
        </div>
    )
};


/**
 * Field component for textarea fields.
 * 
 * @param field
 * @param props
 * @returns React.JSX.Element with the custom textarea field
 */
const TextareaField = ({ field, ...props }: { field: TextField, props: object }): React.JSX.Element => {
    const className = 'w-full rounded-lg pl-2 py-1 bg-transparent ' + (field.className ? field.className : '');
    return (
        <div className='border-slate-400 border-2 rounded-lg'>
            <textarea { ...field } { ...props } className={ className } />
        </div>
    )
}


export { InputField, TextareaField };
