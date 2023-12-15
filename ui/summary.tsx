'use client';

import * as React from 'react';
import { summaryContainer } from 'styles/formStyles';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const data = [
  {
    icon: <CurrencyExchangeIcon />,
    text: 'Total Week Income',
    amount: '12420.375',
    updown: <ArrowUpwardIcon style={{ fontSize: '14px' }} />,
    percent: 5.6,
    status: 1,
  },
  {
    icon: <CurrencyExchangeIcon />,
    text: "Today's Productivity",
    amount: '12420.375',
    updown: <ArrowUpwardIcon style={{ fontSize: '14px' }} />,
    percent: 5.6,
    status: 1,
  },
  {
    icon: <CurrencyExchangeIcon />,
    text: 'New Clients',
    amount: '12420.375',
    updown: <ArrowDownwardIcon style={{ fontSize: '14px' }} />,
    percent: 4.0,
    status: -1,
  },
  {
    icon: <CurrencyExchangeIcon />,
    text: "Today's Money",
    amount: '12420.375',
    updown: <ArrowUpwardIcon style={{ fontSize: '14px' }} />,
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
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 3, sm: 8, md: 12 }}
        >
          {data.map((item, index) => (
            <Grid item xs={2} sm={4} md={3} key={index}>
              <Item>
                <div className="text-left">{item.icon}</div>
                <div className="my-2 text-left font-bold">{item.text}</div>
                <div className="flex">
                  <div className="text-lg font-bold">${item.amount}</div>
                  <div className="ml-2 text-sm">{item.updown}</div>
                  <span
                    className={`text-sm font-bold ${
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
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
