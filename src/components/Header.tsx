import React from "react";
import {
  AppBar,
  Box,
  Tooltip,
  Avatar,
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Typography,
  Divider,
  Drawer,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { useRouter } from "next/router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

function Header() {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [state, setState] = React.useState({ left: false });
  const [activeItem, setActiveItem] = React.useState<any>("/");

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  const toggleDrawer = (anchor: "left", open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    router.push("/login");
  };

  const listItems = [
    { name: "Home", url: "/", icon: <MovieCreationIcon /> },
    { name: "Movies", url: "/movies", icon: <LocalMoviesIcon /> },
    { name: "Series", url: "/series", icon: <LiveTvIcon /> },
    { name: "My List", url: "/favorites", icon: <FavoriteIcon /> },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="fixed">
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "flex-start",
              display: "flex",
              alignItems: "row",
            }}
          >
            <Box display={{ xs: "none", md: "block" }}>
              <Tooltip title="Home">
                <IconButton onClick={() => router.push("/")} sx={{ mr: 1 }}>
                  <MovieCreationIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Box>
            <Box display={{ md: "none" }} sx={{ mt: 1 }}>
              <IconButton onClick={toggleDrawer("left", true)} sx={{ mr: 1 }}>
                <MovieCreationIcon fontSize="large" />
              </IconButton>
            </Box>
            <Box display={{ xs: "none", md: "block" }} sx={{ mt: 1 }}>
              <IconButton onClick={() => router.push("/movies")} sx={{ mr: 1 }}>
                <Typography> Movies </Typography>
              </IconButton>
              <IconButton onClick={() => router.push("/series")} sx={{ mr: 1 }}>
                <Typography> Series </Typography>
              </IconButton>
              <IconButton
                onClick={() => router.push("/favorites")}
                sx={{ mr: 1 }}
              >
                <Typography> My List </Typography>
              </IconButton>
            </Box>
          </Box>

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
              <MenuItem onClick={() => router.push("/profile")}>
                <Avatar sx={{ mr: 0.7 }} />
                Profile
              </MenuItem>
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
      <Box>
        <Drawer
          sx={{ display: { md: "none" } }}
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          <List>
            {listItems.map((item) => (
              <ListItem
                key={item.name}
                disablePadding
                onClick={() => {
                  router.push(item.url);
                  setActiveItem(item.url);
                  setState({ ...state, left: false });
                }}
                sx={{
                  backgroundColor:
                    activeItem === item.url ? "#7D7D00" : "transparent",
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
export default Header;
