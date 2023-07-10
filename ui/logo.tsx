//'use client'

import React from 'react';
import Image from 'next/image';

function Logo() {
  return (
    <div>
      <Image src="/logo.png" alt="Logo" width={200} height={200} />
    </div>
  );
}

export default Logo;
