'use client';

import React from 'react';
import Image from 'next/image';

export function Logo() {
  return (
    <div>
      <Image
        src="/logo.png"
        alt="Logo"
        width={200}
        height={200}
        style={{ borderRadius: '10px' }}
      />
    </div>
  );
}

export default Logo;
