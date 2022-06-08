import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useContext } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import HomePage from "../pages/home-page/home-page";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CachedIcon from "@mui/icons-material/Cached";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ExpensesPage from "../pages/expenses-page/Expenses-Page";
import EmployeesPage from "../pages/employees-page/employees-page";
import Login from "./Login/Login";
import RecoveryPage from "../pages/recovery-page";
import DelegatePage from "../pages/delegate-page/delegate-page";
import Reports from "../pages/reports-page/Reports";
import ICAS from "../pages/icas-page/ICAS";

import { UserContext } from "../context/AuthContext";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import { ThemeContext } from "../context/themeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ExpensesType from "./ExpensesType";
import ExtraTime from "./ExtraTime";
const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

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
const routeInfo = {
  home: {
    name: "HOME",
    icon: <HomeIcon />,
    component: <HomePage />,
  },
  types: {
    name: "Types",
    icon: <TrackChangesIcon />,
    component: <HomePage />,
  },
  icas: {
    name: "ICAS",
    icon: <TextSnippetIcon />,
    component: <ICAS />,
  },
  expensesTypes: {
    name: "Expenses Types",
    icon: <AttachMoneyIcon />,
    component: <ExpensesType />,
  },
  extrahours: {
    name: "Extra Hours",
    icon: <AddAlarmIcon />,
    component: <ExtraTime />,
  },
  delegate: {
    name: "Delegate",
    icon: (
      <GroupAddIcon
        className={clsx({
          transform: "scaleX(-1)",
        })}
      />
    ),
    component: <DelegatePage />,
  },
  employee: {
    name: "Employee",
    icon: <PersonIcon />,
    component: (
      <Box>
        <EmployeesPage />
      </Box>
    ),
  },
  expenses: {
    name: "Expenses",
    icon: <AccountBalanceIcon />,
    component: <ExpensesPage />,
  },
  recovery: {
    name: "Recovery",
    icon: <CachedIcon />,
    component: <RecoveryPage />,
  },
  reports: {
    name: "Reports",
    icon: <InsertDriveFileIcon />,
    component: <Reports />,
  },
};
export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [log, setLog] = React.useState(true);
  const AuthCtx = React.useContext(UserContext);
  const { value, setValue } = useContext(ThemeContext);
  const theme = createTheme({
    palette: {
      //@ts-ignore
      mode: value,
    },
  });
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              open={open}
              style={{ background: "#000000" }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  LERT - LABOR EXPENSES RECOVERY TOOL
                </Typography>

                <IconButton
                  sx={{ ml: 1 }}
                  onClick={() => {
                    setValue((prevValue) =>
                      prevValue == "light" ? "dark" : "light"
                    );
                  }}
                  color="inherit"
                >
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
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

              <Avatar alt="Sasa" sx={{ mx: "auto", my: 1 }} />

              <Divider />
              <List>
                {Object.keys(routeInfo).map((k) => (
                  <ListItemButton
                    component={Link}
                    to={k}
                    key={k}
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
                      {routeInfo[k].icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={routeInfo[k].name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                ))}
                <ListItemButton
                  onClick={() => {
                    AuthCtx.logout();
                  }}
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
                    {<LogoutIcon />}
                  </ListItemIcon>

                  <ListItemText
                    primary={"Logout"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />

              <Routes>
                <Route path="/" element={<HomePage />} />
                {Object.keys(routeInfo).map((k) => (
                  <Route
                    key={k}
                    path={"/" + k}
                    element={routeInfo[k].component}
                  />
                ))}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}
