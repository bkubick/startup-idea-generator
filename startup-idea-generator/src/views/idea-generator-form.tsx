import { ErrorMessage, Formik, Form, Field } from 'formik';
import React, { ReactElement } from 'react';

import { GPTModel } from 'src/ai/chatgpt.model';
import { fieldTypes, InputField, RadioGroup, TextareaField } from 'src/components/form/fields';
import { Required } from 'src/components/form/validation';


interface FormValues {
    gptModel: string;
    apiToken: string;
    industry: string;
    details: string;
}


interface Props {
    generatingHandler?: (generating: boolean) => void;
}


interface State {
    form: FormValues;
    submitting: boolean;
}


class IdeaGeneratorForm extends React.Component<Props, State> {

    GPT_MODEL_OPTIONS: fieldTypes.Option[] = [
        { label: GPTModel.GPT_35_TURBO, value: GPTModel.GPT_35_TURBO },
        { label: GPTModel.GPT_35_TURBO_16K, value: GPTModel.GPT_35_TURBO_16K },
        { label: GPTModel.GPT_4, value: GPTModel.GPT_4 },
    ]

    constructor(props: Props) {
        super(props);
        this.state = {
            form: {
                gptModel: GPTModel.GPT_4,
                apiToken: '',
                industry: '',
                details: '',
            },
            submitting: false,
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Form submission handler to generate the startup idea from the form values.
     * 
     * @param values   The form values.
     * @param actions   The form actions.
     */
    async onSubmit(values: FormValues, actions: any) {
        this.setState({ submitting: true });

        if (this.props.generatingHandler) {
            this.props.generatingHandler(true);
        }

        const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

        await sleep(4000);
        console.log(values);
        actions.setSubmitting(false);
    
        this.setState({ submitting: false });
        if (this.props.generatingHandler) {
            this.props.generatingHandler(false);
        }
    }

    /**
     * Renders the idea generator form.
     * 
     * @returns  The idea generator form.
     */
    render(): ReactElement {
        return (
            <Formik initialValues={ this.state.form } onSubmit={ this.onSubmit }>
                <Form className='w-full'>
                    <div className='mb-4'>
                        <Field name="gptModel" className="flex" options={ this.GPT_MODEL_OPTIONS } component={ RadioGroup } validate={ Required } />
                        <ErrorMessage name="gptModel"/>
                    </div>
                    <div className='mb-4'>
                        <Field name="industry" placeholder="Industry" className="input" component={ InputField } validate={ Required } />
                        <ErrorMessage name="industry"/>
                    </div>
                    <div className='mb-4'>
                        <Field name="details" placeholder="Details" className="textarea-input" component={ TextareaField } validate={ Required }/>
                        <ErrorMessage name="details"/>
                    </div>
                    <div className='mb-4'>
                        <Field type="password" name="apiToken" placeholder="Chat GPT API Token" className="input" component={ InputField } validate={ Required } />
                        <ErrorMessage name="apiToken"/>
                    </div>
                    <button className='btn btn-primary-outline' type="submit">Submit</button>
                </Form>
            </Formik>
        )
    }
}


export default IdeaGeneratorForm;
