'use client';
import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SelectChangeEvent } from '@mui/material/Select';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import { styled } from '@mui/material/styles';
import styles from 'styled-components';
const HeaderContainer = styles.div`
  display: flex;
   
  @media (max-width: 1500px) {
    display: block; 
  }
  @media (max-width: 768px) {
    display: flex; 
  } ;
`;

const List = styles.div`
  display: flex;
   
  @media (max-width: 1350px) {
    display: block; 
  }
  @media (max-width: 768px) {
    display: flex; 
  } ;
`;

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
      rating: 1,
      profileImg: <AccountCircle />,
      userName: 'jane_Wagmi',
      amount: '5932 pts',
    },
    {
      photo: <InsertPhotoRoundedIcon />,
      rating: 2,
      profileImg: <AccountCircle />,
      userName: '0xSomething',
      amount: '4263 pts',
    },
    {
      photo: <InsertPhotoRoundedIcon />,
      rating: 3,
      profileImg: <AccountCircle />,
      userName: 'big JON',
      amount: '3642 pts',
    },
    {
      photo: <InsertPhotoRoundedIcon />,
      rating: 4,
      profileImg: <AccountCircle />,
      userName: 'Rebecca Moore',
      amount: '2542 pts',
    },
    {
      photo: <InsertPhotoRoundedIcon />,
      rating: 5,
      profileImg: <AccountCircle />,
      userName: 'Jane Doe',
      amount: '1832 pts',
    },
  ];

  return (
    <div>
      <HeaderContainer className="block justify-between lg:flex">
        <div className="flex">
          <div className="mr-1 flex items-center text-lg font-bold">
            Loeaderboard
          </div>
          <div className="flex items-center">
            <InfoOutlinedIcon sx={{ color: 'rgb(99 102 241)' }} />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex w-36 items-center font-bold">Time Period</div>
          <select
            id="countries"
            className="block w-2/3 rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value="0">This month</option>
            <option value="1">This week</option>
            <option value="2">Today</option>
          </select>
        </div>
      </HeaderContainer>
      {data.map((item, index) => (
        <List className="mt-6 block justify-between" key={index}>
          <div className="w-44 text-left">
            <StyledBadge
              badgeContent={item.rating}
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
          <div className="flex justify-between md:mt-2 lg:w-1/2">
            <div className="block lg:flex">
              <StarBorderRoundedIcon sx={{ color: 'yellow' }} />
              <span className="ml-2 font-bold">{item.amount}</span>
            </div>
            <div>
              <LinkRoundedIcon />
            </div>
          </div>
        </List>
      ))}
    </div>
  );
}
