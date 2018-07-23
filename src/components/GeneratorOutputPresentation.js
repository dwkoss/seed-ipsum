import React from 'react';
import _ from 'lodash';

const buttonStyle = {
  width: '100%'
};

export default ({ restart, paragraphs }) => {
  return (
    <div>
      <button style={buttonStyle} onClick={restart}>
        Generate New Ipsum
      </button>
      <div>
        {_.map(paragraphs, (paragraph, idx) => <p key={idx}>{paragraph}</p>)}
      </div>
    </div>
  );
};
