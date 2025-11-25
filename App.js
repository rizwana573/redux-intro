import Header from './components/Header'
import { Outlet } from 'react-router' 


import "./App.css"

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
};
export default App;
