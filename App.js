import Header from './components/Header'
import { Outlet } from 'react-router'

import './App.css'

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}