import logo from './logo.svg';
import './App.css';
import Register from './components/login/Register';
import Login from './components/login/Login';
import { Outlet, Route, Routes } from 'react-router-dom';

function App() {
  return (

    <>
    {/* <GlobalStyle> */}
    {/* {location.pathname !== '/' && <NavigationBar></NavigationBar>} */}
      <Routes>
      </Routes>
      <Outlet/>
    {/* </GlobalStyle> */}
    </>

  );
}

export default App;
