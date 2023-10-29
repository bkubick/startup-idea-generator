import { ErrorMessage, Formik, Form, Field } from 'formik';
import React, { ReactElement } from 'react';

import { InputField, TextareaField } from 'src/components/form/fields';
import { Required } from 'src/components/form/validation';


interface FormValues {
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

    constructor(props: Props) {
        super(props);
        this.state = {
            form: {
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
                        <Field name="industry" placeholder="Industry" component={ InputField } validate={ Required } />
                        <ErrorMessage name="industry"/>
                    </div>
                    <div className='mb-4'>
                        <Field name="details" placeholder="Details" component={ TextareaField } validate={ Required }/>
                        <ErrorMessage name="details"/>
                    </div>
                    <div className='mb-4'>
                        <Field type="password" name="apiToken" placeholder="Chat GPT API Token" component={ InputField } validate={ Required } />
                        <ErrorMessage name="apiToken"/>
                    </div>
                    <button className='btn-sm btn-primary-outline' type="submit">Submit</button>
                </Form>
            </Formik>
        )
    }
}


export default IdeaGeneratorForm;
