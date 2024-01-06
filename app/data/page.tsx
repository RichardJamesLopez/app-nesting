'use client';

import { useState, useEffect } from 'react';
import { formHeaderStyle } from 'styles/formStyles';

type DataType = {
  properties: {
    Name: {
      id: string;
      type: string;
      title: {
        type: string;
        text: {
          content: string;
          link: null | string;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null | string;
      }[];
    };
    'Deal Value': {
      id: string;
      type: string;
      number: number;
    };
    // Add more properties as needed
  };
};

export default function Page() {
  const [data, setData] = useState<DataType[] | null>(null);

  useEffect(() => {
    fetch('/api/getPages')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: DataType[]) => {
        console.log(data); // Log the data to the console
        setData(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []);

  if (!data) {
    return (
      <div>
        <h1 style={formHeaderStyle}>Data</h1>
        <p>Loading</p>
      </div>
    );
  }
  return (
    <div>
      <h1 style={formHeaderStyle}>Data</h1>
      <table>
        <thead>
          <tr>
            <th>Deal Name</th>
            <th>Estimated Value</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(data) && data.map((row: DataType, index: number) => {
  return (
    <tr key={index}>
      <td>{row.properties && row.properties.Name && row.properties.Name.title[0] ? row.properties.Name.title[0].text.content : 'N/A'}</td>    
      <td>{row.properties && row.properties['Deal Value'] ? row.properties['Deal Value'].number : 'N/A'}</td>    
    </tr>
  );
})}
        </tbody>
      </table>
    </div>
  );
}