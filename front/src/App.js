import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';

// Import other components
import Home from './Home/Home.tsx';
import Dobavljaci from './Dobavljaci/Dobavljaci.tsx';
import Settings from './Settings/Settings.tsx';
import Kupci from './Kupci/Kupci.tsx';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();

  // Define routes
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/dobavljaci', element: <Dobavljaci /> },
    { path: '/settings', element: <Settings /> },
    { path: '/kupci', element: <Kupci /> }
  ];

  return (
    <Router>
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <List>
          <ListItem button component={Link} to="/">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/kupci">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Kupci" />
            </ListItem>
            <ListItem button component={Link} to="/dobavljaci">
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dobavljaci" />
            </ListItem>
            <ListItem button component={Link} to="/settings">
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Fakture Kupaca" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
