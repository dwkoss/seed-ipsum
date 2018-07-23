import React, { Component } from 'react';

import GeneratorInputPresentation from './GeneratorInputPresentation';
import sampleText from '../sample-text';

class GeneratorInputContainer extends Component {
  constructor({ setSeedText, seedText, generateTextCallback }) {
    super({ seedText });

    this.state = {
      numberOfParagraphs: 5,
      memorySize: 1,
      selectionThreshold: 1
    };

    this.generateTextCallback = generateTextCallback;
    this.setSeedText = setSeedText;
  }

  setNumberOfParagraphs(numberOfParagraphs) {
    this.setState({ numberOfParagraphs });
  }

  setMemorySize(memorySize) {
    this.setState({ memorySize });
  }

  setSelectionThreshold(selectionThreshold) {
    this.setState({ selectionThreshold });
  }

  generateText() {
    this.generateTextCallback({
      seedText: this.state.seedText,
      memorySize: this.state.memorySize,
      selectionThreshold: this.state.selectionThreshold,
      numberOfParagraphs: this.state.numberOfParagraphs
    });
  }

  render() {
    return (
      <div>
        <GeneratorInputPresentation
          seedText={this.props.seedText}
          setSeedText={this.setSeedText.bind(this)}
          numberOfParagraphs={this.state.numberOfParagraphs}
          setNumberOfParagraphs={this.setNumberOfParagraphs.bind(this)}
          memorySize={this.state.memorySize}
          setMemorySize={this.setMemorySize.bind(this)}
          selectionThreshold={this.state.selectionThreshold}
          setSelectionThreshold={this.setSelectionThreshold.bind(this)}
          sampleText={sampleText}
          generateText={this.generateText.bind(this)}
        />
      </div>
    );
  }
}

export default GeneratorInputContainer;
