import React, { useState } from 'react';
import Image from 'next/image';
import {
  formHeaderStyle,
  inputStyleSubmitted,
  thumbsStyle,
  contentInputStyleSubmitted,
} from 'styles/formStyles';
//import { Modal } from '@/components/modal';

interface FormInputData {
  id: number;
  title: string;
  content: string;
}

export default function SampleForm() {
  const content = `🚀 YourDAO x DogeDAO Partnership Proposal! 🌐

    Hey fellow DAO enthusiasts! Exciting news from the BD team at YourDAO! 🎉 We've been on the lookout for incredible partnerships, and we've got our eyes on none other than DogeDAO 🐶🚀, a leading player in the DeFi space!
    
    We're stoked to offer DogeDAO a whopping $10 million in USDC liquidity as a service! 💰💰 Imagine the potential for seamless token swapping and optimized liquidity management for their community. But wait, there's more! 🤝 We're proposing trades with their foundation at 100 basis points below the market rate! That's an irresistible deal for both parties, don't you think?
    
    Hold on, we've got another ace up our sleeve! 🎁 As part of this fantastic partnership, we're proposing a co-marketing clause. For three whole months, we'll run a series of super engaging blog pieces highlighting the top 5 DeFi platforms, featuring our rock-solid alliance with DogeDAO front and center. 📝💻 Talk about a win-win!
    
    We're confident that this collaboration will not only take both our DAOs to new heights but also set new standards in the DeFi world. 📈 So let's all cross our fingers 🤞 and hope DogeDAO loves this proposal as much as we do! Together, we'll revolutionize liquidity solutions and create waves in the decentralized finance realm. 🌊
    
    Stay tuned for updates, and let's make this partnership happen! 🚀🌐💙
    
    YourDAO Team`;

  return (
    <form>
      <input
        id="0023"
        defaultValue="Proposal-DogeDAO-0001" //hardcoded copy
        style={formHeaderStyle}
      />
      <input
        type="text"
        placeholder="Title"
        defaultValue=" Proposal Drafted for RevShare Partnership" //hardcoded copy
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
