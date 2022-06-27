import { BrowserRouter, Route, Routes } from 'react-router-dom';
// styles
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import Nav from './componenets/Nav';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import { minRiskTheme } from './styles/theme';
import Evaluation from './pages/evaluation/Evaluation';

// theme

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={minRiskTheme}>
        <div className="App">
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" exact element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/evaluation" element={<Evaluation />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
