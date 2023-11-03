import { ErrorMessage, Formik, Form, Field } from 'formik';
import React, { ReactElement } from 'react';

import { CreatableSelectField, fieldTypes, InputField, RadioGroup, SelectField, TextareaField } from 'src/components/form/fields';
import { Limit, Required, ValidationPipeline } from 'src/components/form/validation';

import * as AI from 'src/ai';
import { generateIdeaPrompt } from 'src/utils/prompt-generator';


interface FormValues {
    gptModel: string;
    apiToken: string;
    industries: fieldTypes.Option[];
    ideaDetails: string;
    hobbies: fieldTypes.Option[];
    personalDetails: string;
    skills: fieldTypes.Option[];
    passions: fieldTypes.Option[];
}


interface Props {
    generatingHandler: (generating: boolean) => void;
    generatedStartupIdeaHandler: (idea: string) => void;
}


interface State {}


class IdeaGeneratorForm extends React.Component<Props, State> {

    GPT_MODEL_OPTIONS: fieldTypes.Option[] = [
        { label: AI.GPTModel.GPT_35_TURBO, value: AI.GPTModel.GPT_35_TURBO },
        { label: AI.GPTModel.GPT_35_TURBO_16K, value: AI.GPTModel.GPT_35_TURBO_16K },
        { label: AI.GPTModel.GPT_4, value: AI.GPTModel.GPT_4 },
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
        gptModel: AI.GPTModel.GPT_4,
        apiToken: '',
        industries: [],
        ideaDetails: '',
        hobbies: [],
        personalDetails: '',
        skills: [],
        passions: [],
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
    async onSubmit(values: FormValues, actions: any): Promise<void> {
        this.props.generatingHandler(true);

        const industries: string[] = values.industries.map((industry: fieldTypes.Option) => industry.label.toLowerCase());
        const hobbies: string[] = values.hobbies.map((hobby: fieldTypes.Option) => hobby.label.toLowerCase());
        const skills: string[] = values.skills.map((skill: fieldTypes.Option) => skill.label.toLowerCase());
        const passions: string[] = values.passions.map((passion: fieldTypes.Option) => passion.label.toLowerCase());
        const prompt = generateIdeaPrompt(industries,
                                          hobbies,
                                          values.ideaDetails,
                                          values.personalDetails,
                                          passions,
                                          skills);
        const model = new AI.ChatGPT(values.apiToken);

        let startupIdea: string = 'Coudn\'t generate startup idea.... Check your API token and please try again.';
        try {
            const response = await model.ask(prompt, values.gptModel, 1);
            startupIdea = response.choices[0].message.content;
        }
        catch (err) {
            console.log('ERROR: ', err);
        }

        this.props.generatedStartupIdeaHandler(startupIdea);

        actions.setSubmitting(false);
        this.props.generatingHandler(false);
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
                                List out up to 5 industries you are interested in. This will help the AI generate a startup idea
                                that is more catered to the industries you are interested in.
                            </div>
                        </div>
                        <Field name="industries" placeholder="Industries..."  className="flex" options={ this.INDUSTRY_OPTIONS } component={ SelectField } validate={ ValidationPipeline([Required, Limit(5)]) }/>
                        <ErrorMessage name="industries"/>
                    </div>
                    <div className='mb-4'>
                        <div className='mb-4 text-lg font-medium text-slate-300'>
                            Hobbies
                            <div className='text-sm font-light'>
                                List out up to 5 hobbies you enjoy doing. This will help the AI generate a startup idea
                                that is more catered to your interests. If you do not have any hobbies, you can list out
                                things you enjoy doing in your free time or things you are passionate about.
                                <br/>
                                <br/>
                                To input a hobby, type in the hobby and press Enter or Tab.
                            </div>
                        </div>
                        <Field name="hobbies" className="flex" placeholder="Hobbies..." component={ CreatableSelectField } validate={ ValidationPipeline([Required, Limit(5)]) }/>
                        <ErrorMessage name="hobbies"/>
                    </div>
                    <div className='mb-4'>
                        <div className='mb-4 text-lg font-medium text-slate-300'>
                            Passions
                            <div className='text-sm font-light'>
                                List up to 5 passions you have. This will help the AI generate a startup idea
                                that is more catered to your interests.
                                <br/>
                                <br/>
                                To input a passion, type in the passion and press Enter or Tab.
                            </div>
                        </div>
                        <Field name="passions" className="flex" placeholder="Passions..." component={ CreatableSelectField } validate={ ValidationPipeline([Required, Limit(5)]) }/>
                        <ErrorMessage name="passions"/>
                    </div>
                    <div className='mb-4'>
                        <div className='mb-4 text-lg font-medium text-slate-300'>
                            Skills
                            <div className='text-sm font-light'>
                                List up to 10 of your top skills. This will help the AI generate a startup idea
                                that is more catered to your skill set.
                                <br/>
                                <br/>
                                To input a skill, type in the skill and press Enter or Tab.
                            </div>
                        </div>
                        <Field name="skills" className="flex" placeholder="Skills..." component={ CreatableSelectField } validate={ ValidationPipeline([Required, Limit(10)]) }/>
                        <ErrorMessage name="skills"/>
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
                    <div className='mb-4'>
                        <div className='mb-4 text-lg font-medium text-slate-300'>
                            Personal Details
                            <div className='text-sm font-light'>
                                Provide any additional details/information about you. This will help generate the startup
                                idea to be more inline with who you are and what would resonate best with you.
                            </div>
                        </div>
                        <Field name="personalDetails" placeholder="Personal Details..." className="textarea-input" component={ TextareaField } validate={ Required }/>
                        <ErrorMessage name="personalDetails"/>
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
