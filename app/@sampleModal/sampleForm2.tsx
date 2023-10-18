import React, { useState } from 'react';
import {
  formHeaderStyle,
  inputStyleSubmitted,
  thumbsStyle,
  contentInputStyleSubmitted,
} from 'styles/formStyles';

interface FormInputData {
  id: number;
  title: string;
  content: string;
}

export default function SampleForm2() {
  const content = `Our main contact at {small fixed income trader} who was the Portfolio Manager is leaving the firm. They put us in touch with {redacted} who is the COO for the group. 
{Redacted} has a legal background and is very interested in how we can remove counterpark risk in their liquidity providers. They are in principle still on board with our deal moving forward.  
Their contact information is {redacted} and {redacted}`;

  return (
    <form>
      <input
        id="0001"
        value="New Contact-{small fixed income trader}-0034" //hardcoded copy
        style={formHeaderStyle}
      />
      <input
        type="text"
        placeholder="Title"
        value="Updated Contact" //hardcoded copy
        style={inputStyleSubmitted}
      />

      <textarea
        placeholder="Content"
        value={content} // using state variable
        style={contentInputStyleSubmitted}
        rows={10} // Number of visible rows
      />
      <div className="columns-2">
        <button
        style={thumbsStyle}
        //onClick={() => handleThumbsUp(page.id)}
        >
          Thumbs Up
        </button>
        <button
        style={thumbsStyle}
        //onClick={() => handleThumbsDown(page.id)}
        >
          Thumbs Down
        </button>
        <button
          style={thumbsStyle} // Use the imported thumbsStyle
        >
          Comment
        </button>
        <button
        style={thumbsStyle}
        >
          Add a file
        </button>
      </div>
    </form>
  );
}
