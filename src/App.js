import logo from './logo.svg';
import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import GlobalStyle from './style/GlobalStyle';
import Login from './components/login/Login';

function App() {
  return (

    <>
    <GlobalStyle/>
    {/* {location.pathname !== '/' && <NavigationBar></NavigationBar>} */}
      <Routes>
      </Routes>
      <Outlet/>
    </>

  );
}

export default App;
