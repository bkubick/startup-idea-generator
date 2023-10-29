import React, { ReactElement } from 'react';

import { Tab } from './types';


/**
 * @interface Props The props for the top navigation.
 * 
 * @property {Tab} activeTab The active tab.
 * @property {Tab[]} tabs The tabs.
 * @property {(tab: Tab) => void} setActiveTab The function to set the active tab
 */
interface Props {
    activeTab: Tab;
    tabs: Tab[];
    setActiveTab: (tab: Tab) => void;
}


interface State {}


class TopNav extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    /**
     * Returns the class for the tab.
     * 
     * @param tab The tab to get the class for.
     * @returns The class for the tab.
     */
    tabClass(tab: Tab): string {
        if (tab.id == this.props.activeTab.id) {
            return 'inline-block p-4 text-primary border-b-2 border-primary rounded-t-lg active dark:text-primary dark:border-primary';
        }
        return 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300';
    }

    /**
     * Generates the tab.
     * 
     * @param tab The tab to generate.
     * @returns The tab.
     */
    generateTab(tab: Tab, key: string): ReactElement {
        return (
            <li key={ key } className="mr-2">
                <a
                    href={`#${tab.id}`}
                    className={ this.tabClass(tab) }
                    onClick={() => this.props.setActiveTab(tab)}>
                    { tab.name }
                </a>
            </li>
        )
    }

    /**
     * The render method for the top navigation.
     * 
     * @returns The top navigation.
     */
    render(): ReactElement {
        return (
            <div className="sticky top-0 backdrop-blur z-10 text-sm font-medium text-center text-gray-200 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    { this.props.tabs.map((tab: Tab, index: number) => this.generateTab(tab, `tab-${index}-${tab.id}`)) }
                </ul>
            </div>
        );
      }
};


export default TopNav;
