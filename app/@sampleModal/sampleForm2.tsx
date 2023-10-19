import React, { useState } from 'react';
import Image from 'next/image';
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
        defaultValue="New Contact-{small fixed income trader}-0034" //hardcoded copy
        style={formHeaderStyle}
      />
      <input
        type="text"
        placeholder="Title"
        defaultValue="Updated Contact" //hardcoded copy
        style={inputStyleSubmitted}
      />

      <textarea
        placeholder="Content"
        defaultValue={content} // using state variable
        style={contentInputStyleSubmitted}
        rows={10} // Number of visible rows
      />

      <div className="flex columns-2">
        <button style={thumbsStyle}>
          <Image src="/thumb-up.png" alt="Thumb Up" width={20} height={20} />
        </button>
        <button style={thumbsStyle}>
          <Image
            src="/thumb-down.png"
            alt="Thumb Down"
            width={20}
            height={20}
          />
        </button>
        <button style={thumbsStyle}>
          <Image src="/comments.png" alt="Comments" width={20} height={20} />
        </button>
        <button style={thumbsStyle}>
          <Image src="/upload.png" alt="Upload" width={20} height={20} />
        </button>
      </div>
    </form>
  );
}
