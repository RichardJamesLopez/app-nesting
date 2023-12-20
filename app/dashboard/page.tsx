'use client';

import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Slogan from '#/ui/slogan';
import Leaderboard from '#/ui/leaderboard';
import Health from '#/ui/health';
import Activities from '#/ui/activities';
import Summary from '#/ui/summary';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Page() {
  return (
    <>
      <Box sx={{ flexGrow: 1, margin: '10px' }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={12} sm={12} md={8}>
            <Grid>
              <Slogan />
              <Summary />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Grid>
              <Item>
                <Leaderboard />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, margin: '10px' }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={12} sm={12} md={8}>
            <Grid>
              <Item>
                <Activities />
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Grid>
              <Item>
                <Health />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
