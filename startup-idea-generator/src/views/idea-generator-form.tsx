import { ErrorMessage, Formik, Form, Field } from 'formik';
import React, { ReactElement } from 'react';

import { GPTModel } from 'src/ai/chatgpt.model';
import { CreatableSelectField, fieldTypes, InputField, RadioGroup, SelectField, TextareaField } from 'src/components/form/fields';
import { Limit, Required, ValidationPipeline } from 'src/components/form/validation';

import { generateIdeaPrompt } from 'src/utils/prompt-generator';


interface FormValues {
    gptModel: string;
    apiToken: string;
    industries: string[];
    details: string;
}


interface Props {
    generatingHandler?: (generating: boolean) => void;
}


interface State {
    submitting: boolean;
}


class IdeaGeneratorForm extends React.Component<Props, State> {

    GPT_MODEL_OPTIONS: fieldTypes.Option[] = [
        { label: GPTModel.GPT_35_TURBO, value: GPTModel.GPT_35_TURBO },
        { label: GPTModel.GPT_35_TURBO_16K, value: GPTModel.GPT_35_TURBO_16K },
        { label: GPTModel.GPT_4, value: GPTModel.GPT_4 },
    ]

    INDUSTRY_OPTIONS: fieldTypes.Option[] = [
        { label: '3D Printing', value: '3d-printing'},
        { label: 'Aerospace', value: 'aerospace'},
        { label: 'Agriculture', value: 'agriculture' },
        { label: 'Artificial Intelligence', value: 'artificial-intelligence' },
        { label: 'Automotive', value: 'automotive' },
        { label: 'Construction', value: 'construction' },
        { label: 'Education', value: 'education' },
        { label: 'Energy', value: 'energy' },
        { label: 'Entertainment', value: 'entertainment' },
        { label: 'Finance', value: 'finance' },
        { label: 'Food', value: 'food' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Hospitality', value: 'hospitality' },
        { label: 'Manufacturing', value: 'manufacturing' },
        { label: 'Real Estate', value: 'real-estate' },
        { label: 'Renewable Energy', value: 'renewable-energy' },
        { label: 'Retail', value: 'retail' },
        { label: 'Technology', value: 'technology' },
        { label: 'Transportation', value: 'transportation' },
        { label: 'Utilities', value: 'utilities' },
    ]

    INITIAL_FORM_VALUES: FormValues = {
        gptModel: GPTModel.GPT_4,
        apiToken: '',
        industries: [],
        details: '',
    }

    constructor(props: Props) {
        super(props);
        this.state = {
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

        let prompt = generateIdeaPrompt();
        prompt = `${prompt}\n Form: ${JSON.stringify(values)}`;
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
            <Formik initialValues={ this.INITIAL_FORM_VALUES } onSubmit={ this.onSubmit }>
                <Form className='w-full'>
                    <div className='mb-4'>
                        <Field name="gptModel" className="flex" options={ this.GPT_MODEL_OPTIONS } component={ RadioGroup } validate={ Required }/>
                        <ErrorMessage name="gptModel"/>
                    </div>
                    <div className='mb-4'>
                        <Field name="industries" placeholder="Industries..."  className="flex" options={ this.INDUSTRY_OPTIONS } component={ SelectField } validate={ ValidationPipeline([Required, Limit(10)]) }/>
                        <ErrorMessage name="industries"/>
                    </div>
                    <div className='mb-4'>
                        <Field name="hobbies" className="flex" placeholder="Hobbies..." component={ CreatableSelectField } validate={ ValidationPipeline([Required, Limit(10)]) }/>
                        <ErrorMessage name="hobbies"/>
                    </div>
                    <div className='mb-4'>
                        <Field name="details" placeholder="Details..." className="textarea-input" component={ TextareaField } validate={ Required }/>
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
