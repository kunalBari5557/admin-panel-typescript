import React, { useState } from "react";
import { styled } from "@mui/material/styles";
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
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
// import { AiFillHome, AiFillVideoCamera } from "react-icons/ai";
import Users from "./components/Users/Users";
import { Link, Route, Routes, useLocation, Navigate } from "react-router-dom";
import SignUp from "./components/Auth/Auth";
import LogoutButton from "./components/LogoutButton/LogoutButton";
import Products from "./components/Products/Products";
import EditProducts from "./components/Products/EditProducts";
import ViewProductDetails from "./components/Products/ViewProductDetails";
import AddProduct from "./components/Products/AddProduct";
import { AiFillHome, AiFillVideoCamera } from "react-icons/ai";
import AddUser from "./components/Users/AddUser";
import ViewUserDetails from "./components/Users/ViewUserDetails";
import EditUser from "./components/Users/EditUser";
import Tooltip from "@mui/material/Tooltip";

const drawerWidth = 240;

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: any) => ({
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: any) => ({
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
})(({ theme, open }: any) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  // ...(!open && {
  //   ...closedMixin(theme),
  //   "& .MuiDrawer-paper": closedMixin(theme),
  // }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
    "& .responsive-text": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  }),
}));

export default function Sidenav() {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const tokenState = localStorage.getItem("Token");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {location.pathname !== "/" && (
        <AppBar
          position="fixed"
          elevation={4}
          sx={{ backgroundColor: "#ffffff", color: "#2f2f2f" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
              edge="start"
            >
              <MenuIcon className="radius_icon" />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <img src="./youtube.png" height={40} alt="YouTube Logo" />
            </Typography>
            <LogoutButton />
          </Toolbar>
        </AppBar>
      )}
      {location.pathname !== "/" && (
        <Drawer variant="permanent" open={open}>
          <Divider />
          <List sx={{ marginTop: "4rem" }}>
            <ListItem disablePadding>
              <ListItemButton
                style={{
                  backgroundColor:
                    location.pathname === "/Users" ? "black" : "transparent",
                }}
              >
                <Tooltip title="Users" arrow placement="right">
                  <ListItemIcon>
                    <Link to="/Users">
                      <AiFillVideoCamera className="radius_icon" />
                    </Link>
                  </ListItemIcon>
                </Tooltip>
                <Link
                  to="/Users"
                  style={{
                    color: location.pathname === "/Users" ? "white" : "black",
                    textDecoration: "none",
                  }}
                >
                  Users
                </Link>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                style={{
                  backgroundColor:
                    location.pathname === "/Products"
                      ? "black"
                      : "transparent",
                }}
              >
                <Tooltip title="Products" arrow placement="right">
                  <ListItemIcon>
                    <Link to="/Products">
                      <AiFillHome className="radius_icon" />
                    </Link>
                  </ListItemIcon>
                </Tooltip>
                <Link
                  to="/Products"
                  style={{
                    color:
                      location.pathname === "/Products" ? "white" : "black",
                    textDecoration: "none",
                  }}
                >
                  Products
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          {!tokenState ? (
            <>
              <Route path="/" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/" />} />{" "}
            </>
          ) : (
            <>
              <Route path="/Products" element={<Products />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="products/edit" element={<EditProducts />} />
              <Route path="products/details" element={<ViewProductDetails />} />
              <Route path="/Users" element={<Users />} />
              <Route path="users/add" element={<AddUser />} />
              <Route path="users/details" element={<ViewUserDetails />} />
              <Route path="users/edit" element={<EditUser />} />
              <Route path="*" element={<Navigate to="/Users" />} />{" "}
            </>
          )}
        </Routes>
      </Box>
    </Box>
  );
}
