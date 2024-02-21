import React, { useEffect, useState } from 'react';
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
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import PaymentsIcon from '@mui/icons-material/Payments';

// Import other components
import Home from './Home/Home.tsx';
import Dobavljaci from './Dobavljaci/Dobavljaci.tsx';
import Settings from './Settings/Settings.tsx';
import Kupci from './Kupci/Kupci.tsx';
import KupacUnos from './Unos/Kupac.tsx';
import Unos from './Unos/Unos.tsx';

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
  nestedListItem: {
    paddingLeft:"30px"
  },
  doubleNestedListItem: {
    paddingLeft:"45px"
  }
}));

function App() {
  const classes = useStyles();
  const [openKupci, setOpenKupci] = useState(false);
  const [openUnos, setOpenUnos] = useState(false);
  const [openRoba, setOpenRoba] = useState(false);
  const [openPregled, setOpenPregled] = useState(false);
  const [openSifarnik, setOpenSifarnik] = useState(false);

  const handleKupciClick = () => {
    setOpenKupci(!openKupci);
  };

  const handleUnosClick = () => {
    setOpenUnos(!openUnos);
  };

  const handleRobaClick = () => {
    setOpenRoba(!openRoba);
  };

  const handlePregledClick = () => {
    setOpenPregled(!openPregled);
  };

  const handleSifarnikClick = () => {
    setOpenSifarnik(!openSifarnik);
  };

  

  // Define routes
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/dobavljaci', element: <Dobavljaci /> },
    { path: '/settings', element: <Settings /> },
    { path: '/kupci', element: <Kupci /> },
    { path: '/kupac', element: <KupacUnos /> },
    { path: '/unos', element: <Unos /> }
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
              <ListItemText primary="Home" />
            </ListItem>
        
            <ListItem button onClick={handleUnosClick}>
              <ListItemIcon><KeyboardIcon /></ListItemIcon>
              <ListItemText primary="Unos" />
              {openUnos ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openUnos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nestedListItem} component={Link}  to="/unos">
                  <ListItemIcon><ReceiptIcon /></ListItemIcon>
                  <ListItemText primary="Fakture" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} onClick={handleSifarnikClick} component="div">
                  <ListItemIcon><SubtitlesIcon /></ListItemIcon>
                  <ListItemText primary="Šifarnici" />
                  {openSifarnik ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                  <Collapse in={openSifarnik} timeout="auto" unmountOnExit>
                    <ListItem button className={classes.doubleNestedListItem} component={Link}  to="/unos">
                      <ListItemIcon><ReceiptIcon /></ListItemIcon>
                      <ListItemText primary="Kupaca" />
                    </ListItem>
                    <ListItem button className={classes.doubleNestedListItem} component={Link}  to="/unos">
                      <ListItemIcon><ReceiptIcon /></ListItemIcon>
                      <ListItemText primary="Faktura" />
                    </ListItem>
                    <ListItem button className={classes.doubleNestedListItem} component={Link}  to="/unos">
                      <ListItemIcon><ReceiptIcon /></ListItemIcon>
                      <ListItemText primary="Dobavljaca" />
                    </ListItem>
                  </Collapse>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><ContentPasteIcon /></ListItemIcon>
                  <ListItemText primary="Dokumenta" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PaymentsIcon /></ListItemIcon>
                  <ListItemText primary="Uplate" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Storno" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="PDV" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Izvod" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Izvod TK" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={handleKupciClick}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Kupci i dobavljači" />
              {openKupci ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openKupci} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nestedListItem} component={Link}  to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Kartica kupaca" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Kartica dobavljača" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Specifikacija kupaca" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Specifikacija dobavljača" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Dnevnik kupaca" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Dnevnik dobavljača" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Zbirno stanje" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="IOS kupaca" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="IOS dobavljača" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Knjiga prim. računa" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Knjiga izd. računa" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Poreska prijava" />
                </ListItem>
              </List>
            </Collapse>


            <ListItem button onClick={handleRobaClick}>
              <ListItemIcon><Inventory2Icon /></ListItemIcon>
              <ListItemText primary="Roba" />
              {openRoba ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openRoba} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nestedListItem} component={Link}  to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Kartica prometa" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Zalihe" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Zbirno promet" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Kalkulacije" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Trgovačka knjiga" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Prodaja robe" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Lager lista robe" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Popis robe" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Preračun popisa" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Kepu knjiga" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Unos pazara" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Pregled poreza" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Nivelacija" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Dnevni list ugost." />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Knjiga prihoda" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PaymentsIcon /></ListItemIcon>
                  <ListItemText primary="Uplata akontacija" />
                </ListItem>
              </List>
            </Collapse>


            <ListItem button onClick={handlePregledClick}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Pregled" />
              {openPregled ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openPregled} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nestedListItem} component={Link}  to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Nivelacija" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><SubtitlesIcon /></ListItemIcon>
                  <ListItemText primary="Šifarnici" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><ContentPasteIcon /></ListItemIcon>
                  <ListItemText primary="Dokumenta" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Tarife" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><ReceiptIcon /></ListItemIcon>
                  <ListItemText primary="Fakture" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Indeksiranje" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Firma" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Popis" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Popisne liste" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Liste stanja" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Obrazac KEPU" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><ReceiptIcon /></ListItemIcon>
                  <ListItemText primary="Pregled faktura" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Odjava robe" />
                </ListItem>
                <ListItem button className={classes.nestedListItem} component={Link} to="/kupci">
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Izveštaj o akontaciji" />
                </ListItem>
              </List>
            </Collapse>
            



            <ListItem button component={Link} to="/settings">
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Podesavanja" />
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
