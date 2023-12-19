'use client';

import * as React from 'react';
import { summaryContainer } from 'styles/formStyles';
// import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import styled from 'styled-components';
const AmountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  @media (max-width: 1700px) {
    display: block;
    margin-top: 36px;
  }
  @media (max-width: 768px) {
    display: flex;
    margin-top: 26px;
  } ;
`;

const CardTitle = styled.div`
  font-size: 17px;
  @media (max-width: 1700px) {
    font-size: 15px;
  }
  @media (max-width: 768px) {
    font-size: 13px;
  } ;
`;

const CardAmount = styled.div`
  font-size: 24px;
  @media (max-width: 1700px) {
    font-size: 18px;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  } ;
`;

const data = [
  {
    icon: <CurrencyExchangeIcon />,
    text: 'Total Week Income',
    amount: '13,420.37',
    updown: (
      <ArrowUpwardIcon style={{ fontSize: '18px', marginBottom: '2px' }} />
    ),
    percent: 5.6,
    status: 1,
  },
  {
    icon: <CurrencyExchangeIcon />,
    text: "Today's Productivity",
    amount: '98%',
    updown: (
      <ArrowUpwardIcon style={{ fontSize: '18px', marginBottom: '2px' }} />
    ),
    percent: 5.6,
    status: 1,
  },
  {
    icon: <CurrencyExchangeIcon />,
    text: 'New Clients',
    amount: '+3,420',
    updown: (
      <ArrowDownwardIcon style={{ fontSize: '18px', marginBottom: '2px' }} />
    ),
    percent: 4.0,
    status: -1,
  },
  {
    icon: <CurrencyExchangeIcon />,
    text: "Today's Money",
    amount: '43,420.37',
    updown: (
      <ArrowUpwardIcon style={{ fontSize: '18px', marginBottom: '2px' }} />
    ),
    percent: 5.6,
    status: 1,
  },
];

export default function Summary() {
  return (
    <div style={summaryContainer}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 3, sm: 8, md: 12 }}
        >
          {data.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <div className="bg-slate-100 p-5 text-gray-500">
                <div className="text-left">{item.icon}</div>
                <CardTitle className="md:10   my-2 h-3 text-left font-bold leading-4   lg:h-5  ">
                  {item.text}
                </CardTitle>
                <AmountWrapper className="flex">
                  <CardAmount className="mr-2 text-left font-bold text-gray-500  ">
                    ${item.amount}
                  </CardAmount>
                  <div className="flex items-end text-left text-xl">
                    {item.updown}
                    <span
                      className={` text-lg font-bold	 ${
                        item.status === 1
                          ? 'text-green-500'
                          : item.status === -1
                          ? 'text-red-500'
                          : ''
                      }`}
                    >
                      {item.percent}%
                    </span>
                  </div>
                </AmountWrapper>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
