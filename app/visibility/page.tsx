'use client';

import { useState } from 'react';
import { formHeaderStyle } from 'styles/formStyles';

export default function Page() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
    return (
                <div>
                    <h1 style={formHeaderStyle} >Visibility</h1>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p style={{ padding: '0 5px' }}>Include hidden deals in total count </p>
                        <button onClick={toggleVisibility} style={{ color: isVisible ? 'red' : 'green',  padding: '0 5px' }}>
                            {isVisible ? 'Exclude' : 'Include'}
                        </button>
                    </div>
                </div>
    );
}