// pages/row/[id].tsx
import { GetServerSideProps } from 'next';
import { DataType, tableStyle, thStyle, trStyle} from '../data';
import { Italic } from '@tremor/react';
import { formHeaderStyle } from 'styles/formStyles';


interface DealProps {
    deal: DataType; // DataType is the type you defined in your page.tsx file
    comments: any[]; // Add a comments prop
}

export default function DealPage({ deal, comments }: DealProps) {
  // Now you can use `deal` to display the data for the specific deal
  const dealValue = deal.properties && deal.properties['Deal Value'] ? deal.properties['Deal Value'].number : null;
  const formattedDealValue = dealValue !== null ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dealValue) : '-';
  const dealName = deal.properties && deal.properties.Visibility && deal.properties.Visibility.select.name === 'Custom Visibility' ? '---' : (deal.properties.Name && deal.properties.Name.title[0] ? deal.properties.Name.title[0].text.content : '-');
  
  return (
   <>
   <h1 style={{...formHeaderStyle}}>{dealName} Deal Details</h1>
    <div className="mx-auto h-full bg-white py-20 pl-0 lg:py-0 lg:pl-0">
      <div className="rounded-lg" bg-white>
      </div>
      
      <div className="rounded-lg p-1px shadow-lg text-left pl-3.5" > {/* Add text-left class */}
        <div className="rounded-lg bg-white p-3.5 lg:p-1" ></div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Deal Name</th>
            <th style={thStyle}>Estimated Value</th>
            <th style={thStyle}>Pipeline Status</th>
            <th style={thStyle}>Owner</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th style={trStyle}>{dealName}</th>
            <th style={trStyle}>{formattedDealValue}</th>
            <th style={trStyle}>{deal.properties && deal.properties.Status ? deal.properties.Status.status.name : '-'}</th>    
            <th style={trStyle}>{deal.properties['Owner'] && deal.properties['Owner'].text ? deal.properties['Owner'].text.map(block => block.content).join(' ') : 'No owner assigned'}</th> 
          </tr>
        </tbody>
      </table>
      <br></br>
          <div style={{ textAlign: 'center', padding: '10px 0'}}>
              <Italic>Commentary component being updated</Italic>
          </div>
        </div>
      </div>
      </>
  );
  }
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  // Fetch data from your Notion API
  const VERCEL_URL = process.env.VERCEL_URL || 'http://localhost:3000';  
  const res = await fetch(`${VERCEL_URL}/api/getPage?id=${id}`); 
  const deal: DataType = await res.json();

  // Fetch reviews from your MongoDB database
  //const reviews = await fetchReviewsForDeal(id); // You'll need to implement this function

  return {
    props: {
      deal,
      //reviews,
    },
  };
};

/*
import type { Review } from '#/app/api/reviews/review';
import { TabNavItem } from '#/ui/tab-nav-item';
import { Reviews } from '#/ui/page-directory/reviews';



<div className="mx-auto max-w-l space-y-2 px-2 pt-20 lg:px-8 lg:py-8"></div>
//Reviews data={Reviews} /> {/* Replace the CommentList component with the Reviews component 

*/