import React from "react";


/**
 * Error message component.
 * 
 * @param error 
 * @returns React.JSX.Element | undefined of error message
 */
function Error(error?: string): React.JSX.Element | undefined {
    return error ? (
        <div className="text-red-500 text-sm">
            <div>{ error }</div>
        </div>
    ) : undefined;
}


/**
 * Validation pipeline for a field. Order of validators is important.
 * 
 * @param validators the list of validators corresponding to the field
 * @returns React.JSX.Element | undefined of error message
 */
function ValidationPipeline(validators: ((value: any) => React.JSX.Element | undefined)[]): (value: any) => React.JSX.Element | undefined {

    function validate(value?: any): React.JSX.Element | undefined {
        for ( const validator of validators ) {
            const error = validator(value);
            if ( error ) {
                return error;
            }
        }

        return undefined;
    }

    return validate;
}


/**
 * Validate email address.
 * 
 * @param value corresponding to the email address
 * @returns React.JSX.Element | undefined of error message
 */
function ValidateEmail(value?: string): React.JSX.Element | undefined {
    let error: string | undefined;

    if ( value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }

    return Error(error);
}


/**
 * Validate required field.
 * 
 * @param value corresponding to the field
 * @returns React.JSX.Element | undefined of error message
 */
function Required(value?: any): React.JSX.Element | undefined {
    let error: string | undefined;

    if ( !value ) {
        error = 'Required';
    }

    return Error(error);
}


/**
 * Validate password.
 * Password must be at least 8 characters long and contain at least one letter and one number.
 * 
 * @param value corresponding to the password
 * @returns React.JSX.Element | undefined of error message
 */
function Password(value?: string): React.JSX.Element | undefined {
    let error: string | undefined;

    if ( value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(value)) {
      error = 'Password must be at least 8 characters long and contain at least one letter and one number';
    }

    return Error(error);
}


/**
 * Validate that two fields match.
 * 
 * @param field1Value value corresponding to the first field
 * @param field2Value value corresponding to the second field
 * @param message optional message to display if the fields do not match
 * @returns React.JSX.Element | undefined of error message
 */
function FieldMatch(field1Value?: string, field2Value?: string, message?: string): React.JSX.Element | undefined {
    let error: string | undefined;

    if ( field1Value && field2Value && field1Value !== field2Value ) {
        error = message || 'Fields do not match';
    }

    return Error(error);
}


export { FieldMatch, Password, Required, ValidateEmail, ValidationPipeline };
