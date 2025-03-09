'use client';  

import { Copy } from 'lucide-react';
import { useState } from 'react';

interface CopyToClipboardProps {
  text: string;
}


const CopyToClipboard = ({ text }: CopyToClipboardProps) => {
  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied("copied")
  };
  const [copied,setCopied]=useState("");
  return (
    <button onClick={copyTextToClipboard} className="hover:scale-90 duration-300 cursor-pointer flex gap-1">
      <span>
      {copied && <span className='text-white'>{copied} </span> }
      </span>
      <Copy />
    </button>
  );
};

export default CopyToClipboard;
