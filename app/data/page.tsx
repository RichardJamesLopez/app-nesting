'use client';
import { FormatItalicSharp } from '@mui/icons-material';
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

type SortConfigType = {
  key: string;
  direction: 'ascending' | 'descending';
};

export default function Page() {
  const [data, setData] = useState<DataType[] | null>(null);
  const [allData, setAllData] = useState<DataType[] | null>(null); // Add this line

  const [selectedOption, setSelectedOption] = useState('Total');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

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
  const [sortConfig, setSortConfig] = useState<SortConfigType>({ key: '', direction: 'ascending' }); // Add this line

  const handleHeaderClick = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction: direction as 'ascending' | 'descending' });
  
    // Sort the data array
    setData(prevData => {
      if (!prevData) return null;
      return [...prevData].sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;
        switch (key) {
          case 'dealName':
            aValue = a.properties.Name.title[0].text.content;
            bValue = b.properties.Name.title[0].text.content;
            break;
          case 'dealValue':
            aValue = a.properties['Deal Value'] ? a.properties['Deal Value'].number : 0;
            bValue = b.properties['Deal Value'] ? b.properties['Deal Value'].number : 0;
            break;
          case 'status':
            aValue = a.properties.Status.status.name;
            bValue = b.properties.Status.status.name;
            break;
          default:
            return 0;
        }
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    });
  };


  return (
    <div style={containerStyle}>
      
      <h1 style={formHeaderStyle}>Selected Deal Details</h1>
      <p> The following activity are selected deals that are visible to the community. </p>
      <p>Click on the column headers to sort the data.</p>
      <table>
        <thead>
          <tr>
          <th onClick={() => handleHeaderClick('dealName')}>Deal Name</th>
          <th onClick={() => handleHeaderClick('dealValue')}>Estimated Value</th>
          <th onClick={() => handleHeaderClick('status')}>Pipeline Status</th>
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
      <p> The following activitiy are all deals in an anonymized fashion.</p>
      <div>
        <strong><h2>Filter</h2></strong>
        <input type="radio" value="Total" checked={selectedOption === 'Total'} onChange={handleOptionChange} /> Total
        <input type="radio" value="Status" checked={selectedOption === 'Status'} onChange={handleOptionChange} /> Status
        <input type="radio" value="Visibility" checked={selectedOption === 'Visibility'} onChange={handleOptionChange} /> Visibility
      </div>
      
      {selectedOption === 'Total' && (<table>
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
      )}
    
    {selectedOption === 'Status' && (
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Count</th>
            <th>Total Deal Value</th>
          </tr>
        </thead>
        <tbody>
          {allData && Array.from(new Set(allData.map(row => row.properties.Status.status.name))).map(status => {
            const rowsWithStatus = allData.filter(row => row.properties.Status.status.name === status);
            const count = rowsWithStatus.length;
            const totalDealValue = rowsWithStatus.reduce((sum, row) => sum + (row.properties['Deal Value'] ? row.properties['Deal Value'].number : 0), 0);
            const formattedTotalDealValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalDealValue);
            return (
              <tr key={status}>
                <td>{status}</td>
                <td>{count}</td>
                <td>{formattedTotalDealValue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )}
    
    {selectedOption === 'Visibility' && (
      <table>
        <thead>
          <tr>
            <th>Visibility</th>
            <th>Count</th>
            <th>Total Deal Value</th>
          </tr>
        </thead>
        <tbody>
          {allData && Array.from(new Set(allData.map(row => row.properties.Visibility.select.name))).map(visibility => {
            const rowsWithVisibility = allData.filter(row => row.properties.Visibility.select.name === visibility);
            const count = rowsWithVisibility.length;
            const totalDealValue = rowsWithVisibility.reduce((sum, row) => sum + (row.properties['Deal Value'] ? row.properties['Deal Value'].number : 0), 0);
            const formattedTotalDealValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalDealValue);
            return (
              <tr key={visibility}>
                <td>{visibility}</td>
                <td>{count}</td>
                <td>{formattedTotalDealValue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      )}
      </div>
  )
  }