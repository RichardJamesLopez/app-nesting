'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useEnsName } from 'wagmi';

import * as React from 'react';
import Image from 'next/image';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsIcon from '@mui/icons-material/Settings';

const ImageContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  cursor: 'pointer',
  '&:hover .hover-overlay': {
    display: 'block',
  },
}));

const HoverOverlay = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  background: 'rgba(0, 0, 0, 0.1)',
  display: 'none',
  borderRadius: '50%',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Edit Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="settings" color="inherit">
          <Badge badgeContent={2} color="error">
            <NotificationsNoneOutlinedIcon style={{ color: 'black' }} />
          </Badge>
        </IconButton>
        <p>Notification</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="settings" color="inherit">
          <Badge badgeContent={0} color="error">
            <SettingsIcon />
          </Badge>
        </IconButton>
        <p>Settings</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Image
          src="/avatar.png"
          alt="avatar"
          width={40}
          height={40}
          style={{
            borderRadius: '50%',
            marginRight: '10px',
          }}
        />
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const { address, isConnecting, isDisconnected } = useAccount();
  const { open } = useWeb3Modal();
  const [localAddress, setLocalAddress] = useState<string | undefined>(
    undefined,
  );
  const [greetingsValue, setGreetingsValue] = useState<string>();
  const { data, isError, isLoading } = useEnsName({
    address: address,
  });

  const shortenedAddress = (address: string) => {
    return address.slice(0, 4) + '...' + address.slice(-6);
  };

  useEffect(() => {
    if (!isError) {
      if (data !== null) setGreetingsValue(data);
      else {
        const walletAddress = localAddress
          ? shortenedAddress(localAddress)
          : '';
        setGreetingsValue(walletAddress);
      }
    }
  }, [address, data, isError, localAddress]);

  useEffect(() => {
    if (address) {
      setLocalAddress(address);
    } else {
      redirect('/');
      setLocalAddress('');
    }
  }, [address]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 'none' }}>
        <Toolbar style={{ minHeight: '80px' }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, color: 'black' }}
          >
            Hi, {greetingsValue}
          </Typography>
          <div className="relative mx-auto ml-6 w-full max-w-md">
            <div className="flex items-center">
              <input
                type="text"
                className="h-10 w-full rounded-md border border-gray-300 pl-10 pr-4 text-gray-800 focus:border-blue-500 focus:outline-none"
                placeholder="Global search"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon sx={{ color: '#404040' }} />
              </div>
            </div>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 2 new notifications"
              color="inherit"
            >
              <Badge badgeContent={2} color="error">
                <NotificationsNoneIcon style={{ color: 'black' }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="settings"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <Badge badgeContent={0} color="error">
                <SettingsIcon style={{ color: 'black' }} />
              </Badge>
            </IconButton>
            <ImageContainer onClick={() => open()}>
              <Image
                src="/avatar.png"
                alt="avatar"
                width={50}
                height={50}
                style={{
                  borderRadius: '50%',
                  width: '50px',
                }}
              />
              <HoverOverlay className="hover-overlay"></HoverOverlay>
            </ImageContainer>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={() => open()}
              sx={{ borderRadius: '5px' }}
            >
              <p className="w-20 text-sm text-black">
                {localAddress ? shortenedAddress(localAddress) : ''}
              </p>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="info"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
