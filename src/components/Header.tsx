import React from "react";
import {
  AppBar,
  Box,
  Tooltip,
  Avatar,
  Button,
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import Logout from "@mui/icons-material/Logout";
import Router from "next/router";

function Header() {
  const addClick = () => {
    Router.push("/movies");
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary" sx={{ maxWidth: "100%" }}>
        <Toolbar>
          <Tooltip title="Home">
            <IconButton onClick={addClick} sx={{ mr: 1 }}>
              <HomeIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              mr: 1,
            }}
          >
            Movies
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Avatar sx={{ mr: 0.7 }} />
                Profile
              </MenuItem>
              {/* <MenuItem onClick={handleCloseUserMenu}>My account</MenuItem> */}
              <Divider />
              <MenuItem onClick={handleCloseUserMenu}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
export default Header;
