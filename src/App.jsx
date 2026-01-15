import './App.scss'

import Header from './layouts/Header/Header';
import Sidebar from './layouts/Sidebar/Sidebar';
import Main from "./sections/Main"
import Footer from './layouts/Footer/Footer';

export default function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Main />
      <Footer />
    </>
  )
}