import logo from './logo.svg';
import './App.css';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import GlobalStyle from './style/GlobalStyle';
import Login from './components/login/Login';
import Navigation from './components/global/Navigation';
import { NavigationProvider } from './components/global/NavigationContext';

function App() {

  const location = useLocation();

  return (
    <NavigationProvider>
      <GlobalStyle/>
      <Routes>
      </Routes>
      <Outlet/>
    </NavigationProvider>

  );
}

export default App;
