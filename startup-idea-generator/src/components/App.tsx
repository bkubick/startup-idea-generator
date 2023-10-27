import React from 'react';


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
              Startup Idea Generator
            </div>
        )
    }
}

export default App;
