import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import AboutPage from '../../features/about/AboutPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetail from '../../features/catalog/ProductDetail';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ServerError from '../errors/ServerError';
import NotFound from '../errors/NotFound';

function App() {
  const [darkMode, setDarkmode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background:{
        default: palleteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })
  
  function handleThemeChange(){
    setDarkmode(!darkMode);
  }
  return (
      <ThemeProvider theme={theme}>
        <ToastContainer position='bottom-right' hideProgressBar/>
        <CssBaseline/>
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
        <Container>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/catalog" component={Catalog}/>
            <Route path="/catalog/:id" component={ProductDetail}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/contact" component={ContactPage}/>
            <Route path="/server-error" component={ServerError}/>
            <Route component={NotFound}/>
          </Switch>
        </Container>
      </ThemeProvider>
  );
}

export default App;
