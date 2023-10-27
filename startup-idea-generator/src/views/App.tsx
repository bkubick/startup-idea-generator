import React from 'react';

import StartupIdeaGenerator from './startup-idea-generator';


interface Props {}


interface State {}


class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div id='app' className='container mx-auto h-screen flex'>
              <StartupIdeaGenerator />
            </div>
        )
    }
}

export default App;
