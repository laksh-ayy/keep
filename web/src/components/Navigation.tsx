import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Dashboard from "../pages/Dashboard";
import LabelIcon from "@mui/icons-material/Label";
import { color } from "../theme/color";
import { NoteService } from "../services/NoteService";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState, useContext } from "react";
import { Button, TextField } from "@mui/material";
import { StoreContext } from "../context/Store";
import { toast } from "react-toastify";

const drawerWidth = 274;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const Label = styled(LabelIcon)(({}) => ({
  color: color.yellow_l,
  marginRight: 25,
}));

const Home = styled(HomeIcon)(({}) => ({
  color: color.yellow_l,
  marginRight: 25,
}));

const closedMixin = (theme: Theme): CSSObject => ({
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
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

const Img = styled("img")(({}) => ({
  position: "relative",
  marginRight: "10px",
  height: "40px",
  width: "40px",
}));

const Nav = styled(AppBar)(({}) => ({
  backgroundColor: "#fff",
  color: "#000",
  boxShadow: "none",
  borderBottom: "1px solid #e0e0e0",
}));

export const YellowButton = styled(Button)(({}) => ({
  backgroundColor: color.yellow_l,
  color: color.black,
  // marginLeft: "9%",
}));

const Search = styled(TextField)(({}) => ({
  width: "50%",
  marginLeft: "10%",
  marginRight: "10%",
  "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
    padding: "10px",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: color.yellow_l,
    },
  },
}));

const Navigation = () => {
  const [open, setOpen] = React.useState(true);
  const noteService = new NoteService();
  const [labels, setLabels] = useState<string[]>([]);
  const [isLabel, setIsLabel] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const { setStore } = useContext(StoreContext);

  const handleLabel = (l: string) => {
    setIsLabel(true);
    setLabel(l);
    setIsSearch(false);
    setSearch("");
  };

  const handleHome = () => {
    setIsLabel(false);
    setLabel("");
    setIsSearch(false);
    setSearch("");
  };

  const handleSearch = (search: string) => {
    if (search) {
      setIsLabel(false);
      setLabel("");
      setIsSearch(true);
      setSearch(search);
    } else {
      setIsLabel(false);
      setLabel("");
      setIsSearch(false);
      setSearch("");
    }
  };

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const getLabels = async () => {
    try {
      setLabels(await noteService.getLabels());
    } catch (err) {
      // @ts-ignore
      toast.error(err.message);
    }
  };
  useEffect(() => {
    getLabels();
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    setStore(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Nav position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Img src="keep-nav.png" />
          <Typography variant="h6" noWrap component="div">
            Keep 0.5
          </Typography>
          <Search
            placeholder="Search your notes..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          <YellowButton
            variant="contained"
            onClick={() => {
              handleSignOut();
            }}
            sx={{ ml: 15 }}
          >
            Sign Out
          </YellowButton>
        </Toolbar>
      </Nav>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader></DrawerHeader>
        <List>
          <ListItem button onClick={() => handleHome()}>
            <Home />
            <ListItemText primary={"Home"} />
          </ListItem>
          {labels.map((text) => (
            <ListItem button key={text} onClick={() => handleLabel(text)}>
              <Label />
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, pt: 7, ml: 9, mr: 9 }}>
        <DrawerHeader />
        <Dashboard
          isLabel={isLabel}
          label={label}
          isSearch={isSearch}
          search={search}
        />
      </Box>
    </Box>
  );
};

export default Navigation;
