'use client';
import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)({
  '.MuiBadge-dot': {
    width: 10,
    height: 10,
  },
  '.MuiBadge-anchorOriginBottomRightRectangle': {
    transform: 'scale(1) translate(50%, 50%)',
  },
  '.MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
    padding: '1px',
  },
});

export default function Leaderboard() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const data = [
    {
      photo: <InsertPhotoRoundedIcon />,
      badgetNumber: 2,
      profileImg: <AccountCircle />,
      userName: 'jane_Wagmi',
      amount: '5932 pts',
    },
    {
      photo: <InsertPhotoRoundedIcon />,
      badgetNumber: 1,
      profileImg: <AccountCircle />,
      userName: '0xSomething',
      amount: '4263 pts',
    },
    {
      photo: <InsertPhotoRoundedIcon />,
      badgetNumber: 4,
      profileImg: <AccountCircle />,
      userName: 'big JON',
      amount: '3642 pts',
    },
    {
      photo: <InsertPhotoRoundedIcon />,
      badgetNumber: 2,
      profileImg: <AccountCircle />,
      userName: 'Rebecca Moore',
      amount: '2542 pts',
    },
    {
      photo: <InsertPhotoRoundedIcon />,
      badgetNumber: 3,
      profileImg: <AccountCircle />,
      userName: 'Jane Doe',
      amount: '1832 pts',
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex items-center">Loeaderboard</div>
          <div className="flex items-center">
            <InfoOutlinedIcon sx={{ color: 'rgb(99 102 241)' }} />
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center">Time Period</div>
          <FormControl
            sx={{ minWidth: 120, padding: '1px', marginLeft: '6px' }}
          >
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ padding: '1px' }}
            >
              <MenuItem value="">This month</MenuItem>
              <MenuItem value={0}>This week</MenuItem>
              <MenuItem value={20}>Today</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {data.map((item, index) => (
        <div className="mt-6 flex justify-between" key={index}>
          <div className="w-44 text-left">
            <StyledBadge
              badgeContent={item.badgetNumber}
              color="success"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <InsertPhotoRoundedIcon sx={{ color: 'black' }} />
            </StyledBadge>
            <AccountCircle sx={{ marginLeft: '10px' }} />
            <span className="font-bold">{item.userName}</span>
          </div>
          <div>
            <StarBorderRoundedIcon sx={{ color: 'yellow' }} />
            <span className="ml-2 font-bold">{item.amount}</span>
          </div>
          <div>
            <LinkRoundedIcon />
          </div>
        </div>
      ))}
    </div>
  );
}
