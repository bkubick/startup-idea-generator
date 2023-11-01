import React from "react";
import Select from "react-select";
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
 * @returns The element to render.
 */
interface Props {
    field: Field;
    options: types.Option[];
    className?: string;
}


/**
 * Select field component.
 * 
 * @param props 
 * @returns  The element to render.
 */
const SelectField = (props: Props): React.JSX.Element => {
    const [_, state, { setValue, setTouched }] = useField(props.field.name);

    const onChange = (value: any) => {
        setValue(value);
    };

    const className = `react-select-container${props.className ? ` ${props.className}` : ''}`;
    return (
        <Select
            options={ props.options}
            className={ className }
            classNamePrefix='react-select'
            value={ state?.value }
            isMulti
            onChange={ onChange }
            onBlur={ setTouched as any}
        />
    );
}


export { SelectField };
