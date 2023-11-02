import React, { KeyboardEventHandler } from "react";
import Select, { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import { useField } from "formik";

import * as types from "./types";


/**
 * The field to render.
 * 
 * @property name   The name of the field.
 * @property value   The value of the field.
 * @property onChange   The change handler for the field.
 * @property onBlur   The blur handler for the field.
 */
interface Field {
    name: string;
    value?: any;
    onChange?: (value: any) => void;
    onBlur?: (value: any) => void;
}


/**
 * Select field component.
 * 
 * @property field   The field to render.
 * @property options   The options to render.
 * @property className   The class name to add to the container.
 * @property placeholder   The placeholder to display.
 * @returns The element to render.
 */
interface SelectFieldProps {
    field: Field;
    options: types.Option[];
    className?: string;
    placeholder?: string;
}


/**
 * Creates an option for the select field.
 * 
 * @param label the label to create an option for.
 * @returns 
 */
const createOption = (label: string): types.Option => ({
    label,
    value: label,
});


/**
 * Select field component.
 * 
 * @param props 
 * @returns  The element to render.
 */
const SelectField = (props: SelectFieldProps): React.JSX.Element => {
    const [_, state, { setValue, setTouched }] = useField(props.field.name);

    // Custom components for the select field.
    const customComponents = {
        IndicatorSeparator: null,
    };

    // Removes the option the user typed in from the list of options.
    const onChange = (value: any) => {
        setValue(value);
    };

    const className = `react-select-container${props.className ? ` ${props.className}` : ''}`;
    return (
        <Select
            options={ props.options}
            components={ customComponents }
            placeholder={ props.placeholder }
            className={ className }
            classNamePrefix='react-select'
            value={ state?.value }
            isMulti
            isClearable={ false }
            onChange={ onChange }
            onBlur={ setTouched as any}
        />
    );
}


const CreatableSelectField = (props: SelectFieldProps): React.JSX.Element => {
    const [inputValue, setInputValue] = React.useState('');
    const [field, state, helpers] = useField(props.field.name);

    // Custom components for the select field.
    const customComponents = {
        DropdownIndicator: props.options?.length > 0 ? components.DropdownIndicator : () => null,
        IndicatorSeparator: null,
    };

    // Removes the option the user typed in from the list of options.
    const onChange = (value: any) => {
        helpers.setValue(value);
    };

    // Adds the option the user typed in to the list of options.
    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (!inputValue) return;

        switch (event.key) {
          case 'Enter':
          case 'Tab':
            const value = createOption(inputValue);
            const existingValues: string[] | undefined = field.value?.map((option: types.Option) => option.value);

            if (existingValues && existingValues.includes(value.value)) {
                return;
            }

            helpers.setValue([...(field.value || []), value]);
            setInputValue('');
            event.preventDefault();
        }
    };

    const className = `react-select-container${props.className ? ` ${props.className}` : ''}`;
    return (
        <CreatableSelect
            components={ customComponents }
            options={ props.options }
            placeholder={ props.placeholder }
            className={ className }
            classNamePrefix='react-select'
            inputValue={inputValue}
            value={ state?.value }
            isClearable={ false }
            isMulti
            menuIsOpen={ props.options?.length > 0 ? undefined : false }
            onChange={ onChange }
            onInputChange={ (newValue) => setInputValue(newValue) }
            onBlur={ helpers.setTouched as any}
            onKeyDown={ handleKeyDown }
        />
    );
}


export { CreatableSelectField, SelectField };
