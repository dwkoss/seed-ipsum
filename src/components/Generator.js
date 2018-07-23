import React, { Component } from 'react';

import GeneratorInputContainer from './GeneratorInputContainer';
import GeneratorOutputContainer from './GeneratorOutputContainer';

import markovEntriesFromText from '../factories/markov-entries-from-sample-text';
import Markov from '../models/markov';
import textGenerator from '../factories/text-generator';
import { aliceInWonderland } from '../sample-text';

const sentenceTerminator = new RegExp('\\.|!|\\?|\\n');
const paragraphTerminator = new RegExp('\\n');

class Generator extends Component {
    constructor() {
        super();

        this.state = {
            seedText: 'Enter some text here!',
            isSettingParameters: true
        }
    }

    setSeedText (seedText) {
        this.setState({seedText});
    }

    generateText({memorySize, selectionThreshold, numberOfParagraphs}) {
        const markovEntries = markovEntriesFromText(this.state.seedText, memorySize);
        if (markovEntries.length === 0) {
            return;
        }
        
        const markov = new Markov(memorySize, markovEntries);
        this.paragraphGenerator = () => textGenerator(
            markov,
            ['\n'],
            selectionThreshold,
            paragraphTerminator,
            sentenceTerminator,
            5
        );
        this.setState({
            numberOfParagraphs
        });
        this.toggleIsSettingParameters(false);
    }

    toggleIsSettingParameters(bool) {
        this.setState({isSettingParameters: bool})
    }

    render () {
        return (
            <div className="generator-container">
                {this.state.isSettingParameters ? (
                    <GeneratorInputContainer
                        setSeedText={this.setSeedText.bind(this)}
                        seedText={this.state.seedText}
                        generateTextCallback={this.generateText.bind(this)}/> 
                ) : (
                    <GeneratorOutputContainer
                        restart={() => this.toggleIsSettingParameters(true)}
                        paragraphGenerator={this.paragraphGenerator}
                        numberOfParagraphs={this.state.numberOfParagraphs}
                    />
                )}
            </div>
        );
    }
}

export default Generator;