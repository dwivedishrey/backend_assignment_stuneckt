import React, { useState } from 'react'
import './Sidebar.css'
import TwitterIcon from '@mui/icons-material/Twitter';
import SidebarOptions from './SidebarOptions';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreIcon from '@mui/icons-material/More';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneIcon from '@mui/icons-material/Done';
import ListIcon from '@mui/icons-material/List';
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import {Link} from 'react-router-dom'
import CustomeLink from './CustomeLink';
import useLoggedInUser from '../../hooks/useLoggedInUser';
const Sidebar = ({handleLogout,user}) => {
const [anchorEl,setanchorEl]=useState(null);
const [loggedInUser] = useLoggedInUser();
console.log(loggedInUser)
const userProfilePic = loggedInUser[0]?.profileImage ? loggedInUser[0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"

  const openMenu=Boolean(anchorEl);
  const handleClick=e=>{
    setanchorEl(e.currentTarget);
  }
  const handleClose=()=>{
    setanchorEl(null);
  }
  const result=user[0]?.email.split('@')[0];
  return (
    <div className='sidebar'>
    <TwitterIcon className='sidebar__twitterIcon' />
    <CustomeLink to='/home/feed'>
    <SidebarOptions active Icon={HomeIcon} text='Home'/>
    </CustomeLink>
    <CustomeLink to='/home/explore'>
    <SidebarOptions active Icon={SearchIcon} text='Explore'/>
    </CustomeLink>
    <CustomeLink to='/home/notifications'>
    <SidebarOptions active Icon={NotificationsIcon} text='Notifications'/>
    </CustomeLink>
    <CustomeLink to='/home/messages'>
    <SidebarOptions active Icon={MailOutlineIcon} text='Messages'/>
    </CustomeLink>
    <CustomeLink to='/home/bookmarks'>
    <SidebarOptions active Icon={BookmarkBorderIcon} text='Bookmarks'/>
    </CustomeLink>
    <CustomeLink to='/home/lists'>
    <SidebarOptions active Icon={ListAltIcon} text='Lists'/>
    </CustomeLink>
    <CustomeLink to='/home/profile'>
    <SidebarOptions active Icon={PermIdentityIcon} text='Profile'/>
    </CustomeLink>
    <CustomeLink to='/home/more'>
    <SidebarOptions active Icon={MoreIcon} text='More'/>
    </CustomeLink> 
    <Button variant='outlined' className='sidebar__tweet'>
        Tweet
    </Button>
    <div className='Profile__info'>
        <Avatar src={userProfilePic} />
        <div className="user__info">
            <h4>
            {loggedInUser[0]?.name ? loggedInUser[0].name : user && user.displayName}
            </h4>
            <h5>@{result}</h5>
        </div>
        <IconButton size="small"
          sx={{ ml: 2 }} aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleClick}><MoreHorizIcon /></IconButton>
      
            <Menu id="basic-menu" anchorEl={anchorEl} open={openMenu} onClick={handleClose} onClose={handleClose}>
          <MenuItem className="Profile__info1" >
          <Avatar src={userProfilePic} />
            <div className="user__info subUser__info">
              <div>
                <h4>
                  shreya
                </h4>
                <h5>@shrey</h5>
              </div>
              <ListItemIcon className="done__icon" color="blue"><DoneIcon /></ListItemIcon>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>Add an existing account</MenuItem>
          <MenuItem onClick={handleLogout}>Log out shrey</MenuItem>
        </Menu>
    </div>
    </div>
  )
}

export default Sidebar
