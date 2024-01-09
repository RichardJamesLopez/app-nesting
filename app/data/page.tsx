'use client';
import React from 'react';
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
    'Visibility': {
      id: string;
      type: string;
      select: {
        name: string;
      };
    };
    'Status': {
      id: string;
      type: string;
      status: {
        id: string;
        name: string;
        color: string;
      };
    };
    // Add more properties as needed
  };
};

export default function Page() {
  const [data, setData] = useState<DataType[] | null>(null);
  const [allData, setAllData] = useState<DataType[] | null>(null); // Add this line

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '20px'
  };

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
        setAllData(data); // Add this line
        const filteredData = data.filter(row => row.properties.Visibility.select.name !== 'Hide');
        setData(filteredData);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []);

  // Add the constants here
  const totalCount = allData ? allData.length : 0;
  const totalDealValue = allData ? allData.reduce((sum, row) => sum + (row.properties['Deal Value'] ? row.properties['Deal Value'].number : 0), 0) : 0;
  const formattedTotalDealValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalDealValue);

  return (
    <div style={containerStyle}>
      <h1 style={formHeaderStyle}>Data</h1>
      <table>
        <thead>
          <tr>
            <th>Deal Name</th>
            <th>Estimated Value</th>
            <th>Pipeline Status</th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(data) && data.map((row: DataType, index: number) => {
          const dealValue = row.properties && row.properties['Deal Value'] ? row.properties['Deal Value'].number : null;
          const formattedDealValue = dealValue !== null ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dealValue) : '-';
          const dealName = row.properties && row.properties.Visibility && row.properties.Visibility.select.name === 'Custom Visibility' ? '---' : (row.properties.Name && row.properties.Name.title[0] ? row.properties.Name.title[0].text.content : '-');
          return (
            <tr key={index}>
              <td>{dealName}</td>    
              <td>{formattedDealValue}</td>
              <td>{row.properties && row.properties.Status ? row.properties.Status.status.name : '-'}</td>    
            </tr>
          );
        })}
        </tbody>
      </table>
      <h1 style={formHeaderStyle}>Pipeline Summary</h1>
      <table>
        <thead>
          <tr>
            <th>Total Count</th>
            <th>Total Deal Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalCount}</td>
            <td>{formattedTotalDealValue}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  }