import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';

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
        <CssBaseline/>
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
        <Container>
          <Catalog/>
        </Container>
      </ThemeProvider>
  );
}

export default App;
