import React, { ReactElement } from 'react';

import IdeaGeneratorForm from './idea-generator-form';
import { Tab, TopNav } from 'src/components/navigation';

import { generateIdeaPrompt } from 'src/utils/prompt-generator';


interface Props {}


/**
 * The state for the startup idea generator.
 * 
 * @property generatedStartupIdea   The generated startup idea.
 * @property currentTab   The current tab.
 * @property generating   Whether or not the startup idea is being generated.
 */
interface State {
    generatedStartupIdea: string;
    currentTab: Tab;
    generating: boolean;
}


/**
 * The startup idea generator.
 */
class StartupIdeaGenerator extends React.Component<Props, State> {

    /**
     * The tabs for the startup idea generator.
     */
    tabs: Tab[] = [
        { name: 'Startup Idea', id: 'startup-idea' },
        { name: 'Prompt', id: 'prompt' },
    ]

    constructor(props: Props) {
        super(props);

        this.state = {
            generatedStartupIdea: '',
            currentTab: this.tabs[0],
            generating: false,
        };

        this.setActiveTab = this.setActiveTab.bind(this);
    }

    /**
     * Generates the startup idea text display.
     * Default text is 'No startup idea generated.... yet!'
     * 
     * @returns The startup idea text display.
     */
    get generateStartupIdeaTextDisplay(): ReactElement[] {
        if (this.state.generating) {
            return [
                <div role="status" className="justify-center flex my-10">
                    <svg aria-hidden="true" className="w-10 h-10 mr-2 text-gray-400 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            ];
        }

        const text: string = this.state.generatedStartupIdea || 'No startup idea generated.... yet!';

        return text.split(/\n/).map((line, index) => {
            return <React.Fragment key={index}>{line}<br/></React.Fragment>
        });
    }

    /**
     * Sets the active tab.
     * 
     * @param tab The tab to set as active.
     */
    setActiveTab(tab: Tab) {
        this.setState({
            currentTab: tab,
        });
    }

    /**
     * The render method for the startup idea generator.
     * 
     * @returns The startup idea generator.
     */
    render(): ReactElement {
        return (
          <div className="text-white w-full px-10">
            <div className='grid lg:grid-cols-12'>
                <div className='col-span-5 lg:overflow-hidden flex'>
                    <div className='overflow-y-scroll no-scrollbar px-5'>
                        <div className='lg:h-screen'>
                            <h1 className='sticky top-0 backdrop-blur z-10 uppercase text-2xl font-medium py-5'>
                                Startup Idea Generator
                            </h1>
                            <IdeaGeneratorForm />
                        </div>
                    </div>
                </div>
                <div className='col-span-7 lg:overflow-hidden'>
                    <div className='overflow-y-scroll no-scrollbar px-5'>
                        <div className='lg:h-screen'>
                            <TopNav tabs={ this.tabs } activeTab={ this.state.currentTab } setActiveTab={ this.setActiveTab }></TopNav>

                            <div id={ this.tabs[0].id } className={`py-3 h-auto ${this.tabs[0].id === this.state.currentTab.id ? "visible" : "hidden"}`}>
                                { this.generateStartupIdeaTextDisplay }
                            </div>
                            <div id={ this.tabs[1].id } className={`py-3 h-auto ${this.tabs[1].id === this.state.currentTab.id ? "visible" : "hidden"}`}>
                            { generateIdeaPrompt().split(/\n/).map((line, index) => <React.Fragment key={index}>{line}<br/></React.Fragment>) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );
      }
};


export default StartupIdeaGenerator;
