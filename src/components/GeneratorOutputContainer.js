import React, {Component} from 'react';

import GeneratorOutputPresentation from './GeneratorOutputPresentation';

class GeneratorOutputContainer extends Component {
    constructor({restart, paragraphGenerator, numberOfParagraphs}) {
        super();

        this.restart = restart;
        this.paragraphGenerator = paragraphGenerator;
        this.numberOfParagraphs = numberOfParagraphs;
        this.currentNumberOfParatraphs = 0;

        this.state = {
            paragraphs: []
        }
    }

    timer() {
        if (this.currentNumberOfParatraphs < this.numberOfParagraphs) {
            this.currentNumberOfParatraphs += 1;
            this.setState({
                paragraphs: [...this.state.paragraphs, this.paragraphGenerator()]
            });
        }
        else {
            clearInterval(this.intervalId);
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 750);
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    render () {
        return (<GeneratorOutputPresentation restart={this.restart} paragraphs={this.state.paragraphs}/>);
    }
}

export default GeneratorOutputContainer;