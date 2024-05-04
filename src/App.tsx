import { Routes, Route, useNavigate } from 'react-router-dom';
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
import React, { useState } from 'react';

const headerNavLinks = [{name: 'Главная', link: '/'},
                     {name: 'Каталог', link: '/catalog.html'},
                     {name: 'О магазине', link: '/about.html'},
                     {name: 'Контакты', link: '/contacts.html'}];

const footerNavLinks = [{name: 'О магазине', link: '/about.html'},
                            {name: 'Каталог', link: '/catalog.html'},
                            {name: 'Контакты', link: '/contacts.html'}];


function App() {
  const navigate = useNavigate();
  const [change, setChange] = useState<string>('');
  const [form, setForm] = useState<string>('')
  const [searchSatus, setSearchStatus] = useState<string>(' invisible');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChange(e.currentTarget.value)
  };

  const handleOnClickSearchBtn = () => {
    if (searchSatus === ' invisible') {
      setSearchStatus('');
    }
    else if (change !== '') {
      setForm(change);
      navigate('/catalog.html')
    }
    else {
      setSearchStatus(' invisible');
    }
  }

  const handleOnSubmitHeader = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const handleOnSubmitCatalog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm(change)
  }

  const handleOnClickCart = () => {
    navigate('/cart.html')
  }

  return (
    <>
      <Header navLinks={headerNavLinks}
              onClickCart={handleOnClickCart}
              onChange={handleOnChange}
              onSubmit={handleOnSubmitHeader}
              onClickSearch={handleOnClickSearchBtn}
              searchSatus={searchSatus}
      />                       
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/catalog/:id.html' element={<Item />}/>
              <Route path='/cart.html' element={<Cart />}/>
              <Route path='/catalog.html' element={<Catalog onChange={handleOnChange} onSubmit={handleOnSubmitCatalog} fromFinder={form}/>} />
              <Route path='/about.html' element={<About />}/>
              <Route path='/contacts.html' element={<Contacts />}/>
            </Routes>
          </div>
        </div>
      </main>
      <Footer navLinks={footerNavLinks}/>
    </>
  )
}

export default App
