import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Box, IconButton, Drawer, List, ListItem, ListItemText, Avatar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './Profile';
import AddPropertyModal from './AddPropertyModal';
import useAuthCheck from './hooks/useAuthCheck';

const Navbar = () => {
    const [modalOpened, setModalOpened] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
    const { validateLogin } = useAuthCheck();
    
    const handleAddPropertyClick = () => {
        if (validateLogin()) {
            setModalOpened(true);
        }
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerList = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {isAuthenticated && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                    <Avatar src={user.picture} alt={user.name} sx={{ width: 80, height: 80 }} />
                </Box>
            )}
            <List>
                <ListItem button component={NavLink} to="/">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={NavLink} to="/properties">
                    <ListItemText primary="Properties" />
                </ListItem>
                <ListItem button onClick={isAuthenticated ? () => logout() : loginWithRedirect}>
                    <ListItemText primary={isAuthenticated ? "Logout" : "Login"} />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#ffffff', width: '100%', top: 0, left: 0 }}>
            <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Mobile Menu Icon */}
                <IconButton
                    edge="start"
                    color="Black"
                    aria-label="menu"
                    sx={{ mr: 2, display: { md: 'none' } }}
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    {drawerList}
                </Drawer>

                {/* Logo */}
                <NavLink to={'/'}>
                    <Box
                        component="img"
                        sx={{ height: 60 }}
                        src="/images/logo.png"
                        alt="Logo"
                    />
                </NavLink>

                {/* Desktop Nav Links */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto' }}>
                    <Button component={NavLink} to="/" sx={{ color: "black", mr: 5 }}>Home</Button>
                    <Button component={NavLink} to="/properties" sx={{ color: "black", mr: 4 }}>Properties</Button>
                     {/* ad property button */}
                     <Button component={NavLink} to="/addproperty" sx={{ color: "black", mr: 4 }}>Add Property</Button>
                    {/* Login button */}
                    {!isAuthenticated ? (
                        <Button onClick={loginWithRedirect} variant="secondary" sx={{ backgroundColor: "rgb(201, 39, 39)", '&:hover': { backgroundColor: '#5aabda' } }}>
                            Login
                        </Button>
                    ) : (
                        // Pass the user data to Profile component
                        <Profile user={user} logout={logout} />
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
