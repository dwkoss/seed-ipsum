import React from 'react';
import _ from 'lodash';

const textAreaStyle = {
  flexGrow: 1,
  flexShrink: 0,
  resize: 'vertical',
  height: '500px',
  fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
  fontSize: '17px',
  lineHeight: '1.4',
  boxShadow: 'inset 0 1px 2px rgba(10,10,10,.1)',
  borderColor: '#dbdbdb',
  padding: '10px',
  color: 'rgba(0,0,0,.7)',
  minWidth: '400px'
};

const textOptionStyle = {
  fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
  fontSize: '14px',
  width: '300px'
};

const algorithmOptionStyle = {
  display: 'flex',
  flexFlow: 'row wrap'
};

const hardOptionStyle = {};

export default ({
  seedText,
  setSeedText,
  numberOfParagraphs,
  setNumberOfParagraphs,
  memorySize,
  setMemorySize,
  selectionThreshold,
  setSelectionThreshold,
  sampleText,
  generateText
}) => {
  const sampleTextOptions = {
    empty: {
      name: '',
      text: ''
    },
    ...sampleText
  };

  return (
    <div>
      <div style={algorithmOptionStyle}>
        <div className="bordered">
          <div>Enter some text, or select from a sample:</div>
          <select
            size={_.keys(sampleTextOptions).length}
            onChange={e => setSeedText(e.target.value)}
          >
            {_.map(sampleTextOptions, (st, key) => (
              <option style={textOptionStyle} key={key} value={st.text}>
                {st.name}
              </option>
            ))}
          </select>
          <div>Number of Paragraphs:</div>
          <input
            type="text"
            className="opt-paragraphs"
            value={numberOfParagraphs}
            onChange={e => setNumberOfParagraphs(e.target.value)}
          />

          <div>Memory:</div>
          <input
            type="text"
            className="opt-paragraphs"
            value={memorySize}
            onChange={e => setMemorySize(e.target.value)}
          />

          <div>Selection Threshold:</div>
          <input
            type="text"
            className="opt-paragraphs"
            value={selectionThreshold}
            onChange={e => setSelectionThreshold(e.target.value)}
          />
          <button onClick={generateText}>Generate Ipsum</button>
        </div>
        <textarea
          className="bordered"
          style={textAreaStyle}
          value={seedText}
          onChange={e => setSeedText(e.target.value)}
        />
      </div>
    </div>
  );
};
