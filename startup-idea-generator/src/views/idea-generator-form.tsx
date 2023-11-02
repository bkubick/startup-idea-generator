import { ErrorMessage, Formik, Form, Field } from 'formik';
import React, { ReactElement } from 'react';

import { GPTModel } from 'src/ai/chatgpt.model';
import { CreatableSelectField, fieldTypes, InputField, RadioGroup, SelectField, TextareaField } from 'src/components/form/fields';
import { Limit, Required, ValidationPipeline } from 'src/components/form/validation';

import { generateIdeaPrompt } from 'src/utils/prompt-generator';


interface FormValues {
    gptModel: string;
    apiToken: string;
    industries: fieldTypes.Option[];
    ideaDetails: string;
    hobbies: fieldTypes.Option[];
}


interface Props {
    generatingHandler?: (generating: boolean) => void;
    generatedStartupIdeaHandler?: (idea: string) => void;
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
        ideaDetails: '',
        hobbies: [],
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

        const industries: string[] = values.industries.map((industry: fieldTypes.Option) => industry.label.toLowerCase());
        const hobbies: string[] = values.hobbies.map((hobby: fieldTypes.Option) => hobby.label.toLowerCase());
        const prompt = generateIdeaPrompt(industries, hobbies, values.ideaDetails);

        await sleep(4000);

        console.log(values);
        console.log(prompt);

        const startupIdea: string = 'Coudn\'t generate startup idea :(';
        actions.setSubmitting(false);
    
        this.setState({ submitting: false });
        if (this.props.generatingHandler) {
            this.props.generatingHandler(false);
        }

        if (this.props.generatedStartupIdeaHandler) {
            this.props.generatedStartupIdeaHandler(startupIdea);
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
                        <div className='mb-4 text-lg font-medium text-slate-300'>
                            Chat GPT Model:
                        </div>
                        <Field name="gptModel" className="flex" options={ this.GPT_MODEL_OPTIONS } component={ RadioGroup } validate={ Required }/>
                        <ErrorMessage name="gptModel"/>
                    </div>
                    <div className='mb-4'>
                        <div className='mb-4 text-lg font-medium text-slate-300'>
                            Industries
                            <div className='text-sm font-light'>
                                List out up to 10 industries you are interested in. This will help the AI generate a startup idea
                                that is more catered to the industries you are interested in.
                            </div>
                        </div>
                        <Field name="industries" placeholder="Industries..."  className="flex" options={ this.INDUSTRY_OPTIONS } component={ SelectField } validate={ ValidationPipeline([Required, Limit(10)]) }/>
                        <ErrorMessage name="industries"/>
                    </div>
                    <div className='mb-4'>
                        <div className='mb-4 text-lg font-medium text-slate-300'>
                            Hobbies
                            <div className='text-sm font-light'>
                                List out up to 10 hobbies you enjoy doing. This will help the AI generate a startup idea
                                that is more catered to your interests. If you do not have any hobbies, you can list out
                                things you enjoy doing in your free time or things you are passionate about.
                                <br/>
                                <br/>
                                To input a hobby, type in the hobby and press Enter or Tab.
                            </div>
                        </div>
                        <Field name="hobbies" className="flex" placeholder="Hobbies..." component={ CreatableSelectField } validate={ ValidationPipeline([Required, Limit(10)]) }/>
                        <ErrorMessage name="hobbies"/>
                    </div>
                    <div className='mb-4'>
                        <div className='mb-4 text-lg font-medium text-slate-300'>
                            Idea Details
                            <div className='text-sm font-light'>
                                Provide any additional details/information you would like to include specific to the
                                ideas you are looking to be generated. This will help generate the startup idea to be
                                more inline with your requirements.
                            </div>
                        </div>
                        <Field name="ideaDetails" placeholder="Idea Details..." className="textarea-input" component={ TextareaField } validate={ Required }/>
                        <ErrorMessage name="ideaDetails"/>
                    </div>
                    <div className='pb-6'>
                        <div className='mb-4 text-lg font-medium text-slate-300'>
                            Chat GPT API Token
                            <div className='text-sm font-light'>
                                In order to generate the startup idea, you need to provide a Chat GPT API token.
                                If you do not have a token set up, you can set one up from the &nbsp;
                                <a href='https://platform.openai.com/' target='_blank' rel='noreferrer' className='text-blue-400 hover:underline'>website</a>.
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <div className='w-full pr-4'>
                                <Field type="password" name="apiToken" placeholder="Token..." className="input" component={ InputField } validate={ Required } />
                            </div>
                            <button className='btn-sm btn-primary-outline' type="submit">Submit</button>
                        </div>
                        <ErrorMessage name="apiToken"/>
                    </div>
                </Form>
            </Formik>
        )
    }
}


export default IdeaGeneratorForm;
