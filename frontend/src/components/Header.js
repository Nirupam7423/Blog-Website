import React, { useState } from 'react';
import {AppBar, Box, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
const Header = () => 
{
  const dispath= useDispatch();
    const isLoggedIn= useSelector(state=> state.isLoggedIn)// To get the state
    const[value, setValue]= useState();
  return(
//   <h1>Inside Header</h1>
  <AppBar 
  position='sticky'
  sx={{background:"green"}}>
  <Toolbar>
    <Typography variant='h4'>BlogsApp </Typography>
    {isLoggedIn && <Box display={"flex"}>
        <Tabs textColor="inherit" value={value} onChange={(e, val)=>setValue(val)}>
            <Tab LinkComponent={Link} to ="/blog" label="All Blogs"/>
            <Tab LinkComponent={Link} to ="/myblogs" label="My Blogs"/>
            <Tab LinkComponent={Link} to ="/blogs/add" label="Add Blog"/>
        </Tabs>
    </Box>}
    <Box display={'flex'} marginLeft={"auto"} >
        {!isLoggedIn && <><Button 
        LinkComponent={Link} to ="/auth"
        variant ='contained' sx={{margin:1, borderRadius: 10}} color="warning">Login
        </Button>
        <Button 
        LinkComponent={Link} to ="/auth"
        variant ='contained' sx={{margin:1, borderRadius: 10}} color="warning">Signup
        </Button>
        </>}
        {/* // inside single parent tab  */}
        {isLoggedIn && <Button 
        onClick={()=>dispath(authActions.logout())}
        LinkComponent={Link} to ="/auth"
        variant ='contained' sx={{margin:1, borderRadius: 10}} color="warning"
        >
        Logout
        </Button>}
    </Box>
  </Toolbar>
  </AppBar>
  )
}

export default Header