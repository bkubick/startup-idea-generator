/**
 * This file contains the types for the form fields used across various fields.
 */

/**
 * The Option type is used for the options in the select field or the radio field.
 * 
 * @param label The label for the option.
 * @param value The value for the option.
 */
interface Option {
    label: string;
    value: string;
}


export { type Option};
