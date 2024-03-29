//'use client';
import { FormatItalicSharp } from '@mui/icons-material';
import React from 'react';
import { useState, useEffect } from 'react';
import { formHeaderStyle } from 'styles/formStyles';
import { useRouter } from 'next/router';

export type DataType = {
  id: string; 
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
      type: number;
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
    'Last Edited Time': {
      id: string;
      type: string;
      date: string;
    };
    'Owner': {
      id: string;
      type: string;
      text: {
        content: string;
        link: null | string;
      }[];
    };
    'Notes': {
      id: string;
      type: string;
      text: {
        content: string;
        link: null | string;
      }[];
    };// Add more properties as needed
  };
};

type SortConfigType = {
  key: string;
  direction: 'ascending' | 'descending';
};

export const tableStyle: React.CSSProperties = {
  borderCollapse: 'collapse',
  width: '100%',
  marginTop: '20px',
};

export const thStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
  //backgroundColor: '#e2e8f0',
  backgroundColor: '#f2f2f2',
  cursor: 'pointer',
};

export const trStyle: React.CSSProperties = {
  padding: '8px',
  textAlign: 'left',
  fontWeight: 'normal'
};

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const [deal, setDeal] = useState<DataType | null>(null);
  const [allData, setAllData] = useState<DataType[]>([]);
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
  const tdStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };
  
  const h1Style: React.CSSProperties = {
    fontSize: '1.5em',
  };
  
  const radioButtonContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  };
  const radioButtonStyle: React.CSSProperties = {
    marginLeft: '10px', // Adjust this value as needed
  };
const [sortConfig, setSortConfig] = useState<SortConfigType>({ key: '', direction: 'ascending' }); // Add this line
const handleHeaderClick = (key: string) => {
  let direction = 'ascending';
  if (sortConfig.key === key && sortConfig.direction === 'ascending') {
    direction = 'descending';
  }
  setSortConfig({ key, direction: direction as 'ascending' | 'descending' });

}

  useEffect(() => {
    fetch(`/api/getPages`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((allData: DataType[]) => {
        setAllData(allData);
        console.log(allData); 
        console.log(deal);
        //console.log(row);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []);

    // Add the constants here
    const totalCount = allData ? allData.length : 0;
    const totalDealValue = allData ? allData.reduce((sum, row) => sum + (row.properties['Deal Value'] ? row.properties['Deal Value'].number : 0), 0) : 0;
    const formattedTotalDealValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalDealValue);
    
  /*
  // Sort the data array
  function sortData(key: string) {
    setData((prevData: Deal[]) => {
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
  
        if (aValue < bValue) return sortDirection === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'ascending' ? 1 : -1;
        return 0;
      });
    });
  }
   */
    
    {return (
    <> 
      <p>{deal?.properties['Deal Value'].number}</p>
      <h1 style={{...formHeaderStyle, ...h1Style}}>Selected Deal Details</h1>
      <p> The following activity are selected deals that are visible to the community. </p>
      <p>Click on the column headers to sort the data.</p>
      <table style={tableStyle}>
  
        <thead>
          <tr>
            <th style={thStyle} onClick={() => handleHeaderClick('dealName')}>Deal Name</th>
            <th style={thStyle} onClick={() => handleHeaderClick('dealValue')}>Estimated Value</th>
            <th style={thStyle} onClick={() => handleHeaderClick('status')}>Pipeline Status</th>
            <th style={thStyle} onClick={() => handleHeaderClick('Owner')}>Owner</th>
          </tr>
        </thead>
        <tbody>
            {Array.isArray(allData) && allData.map((row: DataType, index: number) => {
              const totalCount = allData ? allData.length : 0;
              const dealValue = row.properties && row.properties['Deal Value'] ? row.properties['Deal Value'].number : null;
              const formattedDealValue = dealValue !== null ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dealValue) : '-';
              const dealName = row.properties && row.properties.Visibility && row.properties.Visibility.select.name === 'Custom Visibility' ? '---' : (row.properties.Name && row.properties.Name.title[0] ? row.properties.Name.title[0].text.content : '-');
              const Last_Edited_Time= row.properties && row.properties['Last Edited Time'] ? row.properties['Last Edited Time'].date : null;
              return (
                <tr key={index}>
                  <td style={tdStyle} onClick={() => router.push(`/row/${row.id}`)}>{dealName}</td>   
                  <td style={tdStyle}>{formattedDealValue}</td>
                  <td style={tdStyle}>{row.properties && row.properties.Status ? row.properties.Status.status.name : '-'}</td>    
                  <td style={tdStyle}> {row.properties['Owner'] && row.properties['Owner'].text ? row.properties['Owner'].text.map(block => block.content).join(' ') : 'No owner assigned'}</td> 
                </tr>
              );
            })}
        </tbody>
      </table>
      <h1 style={{...formHeaderStyle, ...h1Style}}>Pipeline Summary</h1>
      <p> The following summaries are all deals aggregated and in an anonymized fashion.</p>
      <br></br>
     
      <div style={radioButtonContainerStyle}>
        <div> Total<input style={radioButtonStyle} type="radio" value="Total" checked={selectedOption === 'Total'} onChange={handleOptionChange} /> 
        </div>
        <div>Status<input style={radioButtonStyle} type="radio" value="Status" checked={selectedOption === 'Status'} onChange={handleOptionChange} /> 
        </div>
        <div>Visibility<input style={radioButtonStyle} type="radio" value="Visibility" checked={selectedOption === 'Visibility'} onChange={handleOptionChange} /> 
        </div>
      </div>
      {selectedOption === 'Total' && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Total Count</th>
              <th style={thStyle}>Total Deal Value</th>
            </tr>
          </thead>
          <tbody>
          {allData && (() => {
        const totalCount = allData.length;
        const totalDealValue = allData.reduce((sum, row) => sum + (row.properties['Deal Value'] ? row.properties['Deal Value'].number : 0), 0);
        const formattedTotalDealValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalDealValue);
        return (
          <tr>
            <td style={tdStyle}>{totalCount}</td>
            <td style={tdStyle}>{formattedTotalDealValue}</td>
          </tr>
        );
      })()}
          </tbody>
        </table>
      )}
  
      {selectedOption === 'Status' && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Count</th>
              <th style={thStyle}>Total Deal Value</th>
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
                  <td style={tdStyle}>{status}</td>
                  <td style={tdStyle}>{count}</td>
                  <td style={tdStyle}>{formattedTotalDealValue}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      
      {selectedOption === 'Visibility' && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Visibility</th>
              <th style={thStyle}>Count</th>
              <th style={thStyle}>Total Deal Value</th>
            </tr>
          </thead>
          <tbody>
            {allData && Array.from(new Set(allData.map(row => row.properties.Visibility.select.name))).map(visibility => {
              const totalCount = allData ? allData.length : 0;
              const rowsWithVisibility = allData.filter(row => row.properties.Visibility.select.name === visibility);
              const count = rowsWithVisibility.length;
              const totalDealValue = rowsWithVisibility.reduce((sum, row) => sum + (row.properties['Deal Value'] ? row.properties['Deal Value'].number : 0), 0);
              const formattedTotalDealValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalDealValue);
              return (
                 
                <tr key={visibility}>
                  <td style={tdStyle}>{visibility}</td>
                  <td style={tdStyle}>{count}</td>
                  <td style={tdStyle}>{formattedTotalDealValue}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      
      
      </>
      );
          }
        }


/*
import { GlobalNav } from '#/ui/global-nav';
import Header from '#/ui/header';
import { WagmiProvider } from 'wagmi';



// this is the column with the property of last updated time in Notion that I can't get the dataType set on
  <td style={tdStyle}>{Last_Edited_Time}</td> 
  <th style={thStyle} onClick={() => handleHeaderClick('lastEditedTime')}>Last Edited Time</th> 

// this is the title that is supposed to read the id but can't resolve it
  <h1>{deal && deal.properties && deal.properties.Name ? deal.properties.Name.title[0].plain_text : 'Loading...'}</h1>      

//this is because these const are pulling from allData instead of the API call
  <tr>
                <td style={tdStyle}>{totalCount}</td>
                <td style={tdStyle}>{formattedTotalDealValue}</td>
              </tr>


              <tbody>
          <tr>
                <td style={tdStyle}>{totalCount}</td>
                <td style={tdStyle}>{formattedTotalDealValue}</td>
              </tr>

          </tbody>



    <div style={containerStyle}>
    </div>
    
    */