import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Banner } from './Components/Banner/Banner';
import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header'
import { About } from './pages/About/About';
import { Contacts } from './pages/Contacts/Contacts';
import { Home } from './pages/Home/Home';
import { Catalog } from './pages/Catalog/Catalog';
import { Item } from './pages/Item/Item';
import { Cart } from './pages/Cart/Cart';
import { NotFound } from './pages/404/404';
import { useContext } from 'react';
import { AppContext } from './contexts/AppContext';

const headerNavLinks = [{name: 'Главная', link: '/'},
                     {name: 'Каталог', link: '/catalog.html'},
                     {name: 'О магазине', link: '/about.html'},
                     {name: 'Контакты', link: '/contacts.html'}];

const footerNavLinks = [{name: 'О магазине', link: '/about.html'},
                        {name: 'Каталог', link: '/catalog.html'},
                        {name: 'Контакты', link: '/contacts.html'}];


function App() {
  
  const error = useContext(AppContext);

  return (
    <>
      <Header navLinks={headerNavLinks} />          
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/catalog/:id.html' element={<Item />}/>
              <Route path='/cart.html' element={<Cart />}/>
              <Route path='/catalog.html' element={<Catalog />} />
              <Route path='/about.html' element={<About />}/>
              <Route path='/contacts.html' element={<Contacts />}/>
              {error !== undefined ? <Route path='/404.html' element={<NotFound/>}/> : ''}
            </Routes>
          </div>
        </div>
      </main>
      <Footer navLinks={footerNavLinks}/>
    </>
  )
}

export default App
