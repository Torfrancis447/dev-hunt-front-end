import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Avatar,
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { UserContext } from "../context/user";

function Header() {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMenuAnchor);
  const { user, setUser } = useContext(UserContext)

  function handleLogout() {
    fetch("http://localhost:3000/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        localStorage.removeItem("userId");
        // history.push("/login");
      }
    });
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { md: 'none' } }}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h5" component={RouterLink} to="/" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
            Dev Hunt
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {user && user.is_employer === true ? (
              <>
                <Button component={RouterLink} to="/job" sx={{ fontWeight: 600 }} color="inherit">
                  Post a Job
                </Button>
                <Button component={RouterLink} to="/applied-jobs" sx={{ fontWeight: 600 }} color="inherit">
                  Applied
                </Button>
              </>
            ) : (
              <>
                <Button component={RouterLink} to="/application" sx={{ fontWeight: 600 }} color="inherit">
                  Application
                </Button>
                <Button component={RouterLink} to="/home" sx={{ fontWeight: 600 }} color="inherit">
                  Jobs
                </Button>
              </>
            )}
          </Box>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
              }}
              src={user ? user.image_url : ''}
              alt={user ? user.name : ''}
            />
          </IconButton>

          <Menu
            anchorEl={mobileMenuAnchor}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id="mobile-menu"
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
          >
            {user && user.is_employer === true && (     
              <Box>        
                <MenuItem component={RouterLink} to="/job-post" onClick={handleMobileMenuClose}>
                  Post a Job
                </MenuItem>
                <MenuItem component={RouterLink} to="/applied-jobs" onClick={handleMobileMenuClose}>
                  Applied
                </MenuItem>
                </Box>              
            )}
            {user ? (
              <Box>
                <MenuItem onClick={() => {handleLogout(); handleMobileMenuClose();}}>Logout</MenuItem>

                <MenuItem onClick={handleMobileMenuClose}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      marginRight: '12px',
                    }}
                    src={user.image_url}
                    alt={user.name}
                  />
                  <Typography sx={{ marginLeft: '12px', fontWeight: 600 }}>
                    {user.name}
                  </Typography>
                </MenuItem>
              </Box>
            ) : (
             <Box>
                <MenuItem component={RouterLink} to="/signup" onClick={handleMobileMenuClose}>
                  Signup
                </MenuItem>
                <MenuItem component={RouterLink} to="/login" onClick={handleMobileMenuClose}>
                  Login
                </MenuItem>
              </Box>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;