import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EventSeatOutlinedIcon from "@mui/icons-material/EventSeatOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PanoramaOutlinedIcon from "@mui/icons-material/PanoramaOutlined";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import Link from "next/link";
import { Avatar, Badge, Grid, Menu, MenuItem, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Router from "next/router";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { logout } from "../../../features/slice/users/LoginSlice";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DashboadHeader() {
  const navigation = [
    {
      name: "Home",
      link: "/",
      icon: <HomeOutlinedIcon />,
    },

    {
      name: "Activity",
      link: "/users/activity",
      icon: <LayersOutlinedIcon />,
    },
    {
      name: "Profile",
      link: "/users/update-profile",
      icon: <AccountCircleOutlinedIcon />,
    },
    {
      name: "friends",
      link: "/users/friend",
      icon: <EventSeatOutlinedIcon />,
    },
    {
      name: "Media",
      link: "/users/friend",
      icon: <SaveAsOutlinedIcon />,
    },
    {
      name: "Photos",
      link: "/users/photo",
      icon: <PanoramaOutlinedIcon />,
    },
    {
      name: "More",
      link: "/users/photo",
      icon: <ExpandCircleDownOutlinedIcon />,
    },
  ];
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // online  avater
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  // logout user
  const handleLogout = () => {
    dispatch(logout());
    Router.push("/");
  };

  // menu bar when you click on user img
  const dispatch = useDispatch();

  const [anchorEls, setAnchorEls] = React.useState(null);
  const openMenu = Boolean(anchorEls);
  const handleClick = (event) => {
    setAnchorEls(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEls(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 3,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flex: 1, color: "#fff" }}
          >
            E-COMPANION
          </Typography>
          <div>
            <Stack spacing={0} direction="row" sx={{ color: "action.active" }}>
              <IconButton>
                <SearchOutlinedIcon />
              </IconButton>
              <IconButton>
                <Badge color="secondary" badgeContent={1}>
                  <NotificationsOutlinedIcon />
                </Badge>
              </IconButton>

              <IconButton
                disableFocusRipple
                disableRipple={true}
                sx={{
                  display: { xs: "block", sm: "none", md: "block" },
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#fff",
                    display: { xs: "block", sm: "none", md: "block" },
                  }}
                >
                  hi {user?.data?.user?.username}
                </Typography>
              </IconButton>

              <IconButton onClick={handleClick}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={user?.data?.user?.avater?.filename}
                    sx={{ height: 40, width: 40 }}
                  />
                </StyledBadge>
              </IconButton>
            </Stack>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navigation?.map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Link href={text?.link}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {text?.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={text.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Menu
        anchorEl={anchorEls}
        id="account-menu"
        open={openMenu}
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
        <MenuItem onClick={() => Router.push("/users/dashboard")}>
          <Avatar /> My account
        </MenuItem>

        <MenuItem onClick={() => Router.push("/users/update-password")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Change Passsword
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
