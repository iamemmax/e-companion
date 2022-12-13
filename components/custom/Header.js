import React, { useEffect, useState } from "react";
import Link from "next/link";
import Styles from "./styles/header.module.scss";
import { HiOutlineMenu } from "react-icons/hi";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { logout } from "../../features/slice/users/LoginSlice";
import { getChats } from "../../features/slice/chat/getChat";
import Router from "next/router";
import Cookies from "js-cookie";
import OutsideClickHandler from 'react-outside-click-handler';
function Header() {
  const [toggle, setToggle] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [active, setActive] = useState(1)

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (e) => {
    setToggle((prev) => !prev);
  };
  // logout
  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("token")
    Router.push("/");
  };
  return (
    <div className={Styles.header}>
      <nav>
        <div className={Styles.logo}>
          <Link href="/">
            E-Companion

           
          </Link>
        </div>

          <OutsideClickHandler
      onOutsideClick={() => {
       setToggle(false)
      }}
        >
          
          <div className={toggle ? Styles.showMenu : Styles.navigation}>
          
              
            <ul>
              <li  onClick={() => setActive(1)}
                className={active === 1 ? Styles.active : ""}>

              <Link href="/post" >
             Post
            </Link>
              </li>
              
                <li  onClick={() => setActive(2)}
                className={active === 2 ? Styles.active : ""}>
                
            <Link href="/users/find-love" >
             Find love
            </Link>
              </li>
                <li  onClick={() => setActive(3)}
                className={active === 3 ? Styles.active : ""}>
                
            <Link href="/" >
             {/* Help */}
            </Link>
              </li>
              
              <li onClick={() => setActive(4)}
                className={active === 4 ? Styles.active : ""}>

            <Link href="/" >
             Go pro
              </Link>
                  </li>
              
              <li onClick={() => setActive(5)}
                className={active === 5 ? Styles.active : ""}>
                
            <Link  href="/chat"  >
             Chat
            </Link>
                  </li>
          </ul>
         
        </div>
    </OutsideClickHandler>

        <div className={Styles.rightMenu}>
          {user?.res === "ok" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleClick}
            >
              <h4 style={{ color: "#fff", paddingRight: "5px" }}>
                {user?.data?.user?.username}
              </h4>
              <Tooltip title="Account settings">
                <Avatar
                  alt={user?.data?.user?.username}
                  src={user?.data?.user?.avater?.filename}
                  sx={{ cursor: "pointer", border:"2px solid #fff" }}
                />
              </Tooltip>
            </div>
          ) : (
            <ul>
              <Link href="/auth/login">
                Login / Register
              </Link>
            </ul>
          )}
          {/* <Link href="/register">Register</a></Link> */}
        </div>
        <div className={Styles.menu}>
          <button onClick={handleToggle}>
            <HiOutlineMenu className={Styles.barIcon} />
          </button>
        </div>
      </nav>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> {user?.data?.user?.username}
        </MenuItem>
        <MenuItem onClick={() => Router.push("/users/update-profile")}>
          <Avatar /> Profile
        </MenuItem>
        {/* <MenuItem onClick={() => Router.push("/users/dashboard")}>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Help & support
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Give FeedBack
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Display & Accessibility
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings & privacy
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Header;
