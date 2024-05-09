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
import React, { useEffect, useState } from 'react';
import { Icard } from './contexts/CardContext';
import { IfromStorage, fromStorage } from './fromStorage/fromStorage';
import { NotFound } from './pages/404/404';

interface IitemOrder {
  id: number,
  price: number,
  count: number
}

interface Iorder {
  owner: {
    phone: string,
    address: string
  },
  items: IitemOrder[]
}

const headerNavLinks = [{name: 'Главная', link: '/'},
                     {name: 'Каталог', link: '/catalog.html'},
                     {name: 'О магазине', link: '/about.html'},
                     {name: 'Контакты', link: '/contacts.html'}];

const footerNavLinks = [{name: 'О магазине', link: '/about.html'},
                            {name: 'Каталог', link: '/catalog.html'},
                            {name: 'Контакты', link: '/contacts.html'}];


function chekData (Alldata : Icard[], data: Icard[], setHidden: (e: React.SetStateAction<boolean>) => void) {
  data.length < 6 ? setHidden(true) : setHidden(false);
  const listId: number[] = [];
  Alldata.map(d => listId.push(d.id));
  const setId = Array.from(new Set(listId));

  const list: Icard[] = [];
  setId.forEach(id => {
  const d = Alldata.find(d => d.id === id);
  d !== undefined ? list.push(d) : '';});
  return list;
}

export interface Iform {
  phone: string,
  address: string,
  policy: boolean
}

function App() {
  const navigate = useNavigate();
  const [change, setChange] = useState<string>('');
  const [form, setForm] = useState<Iform>({phone: '', address: '', policy: false})
  const [searchSatus, setSearchStatus] = useState<string>(' invisible');
  const [initValue, setInitvalue] = useState<string>('');
  const [url, setUrl] = useState(`http://localhost:7070/api/items?q=${change}`);
  const [category, setCategory] = useState<number>(0);
  const [offset, setOffset] = useState<number>(6);
  const [hidden, setHidden] = useState<boolean>(false);
  const [cart, setCart] = useState<IfromStorage[]>(fromStorage());
  const [order, setOrder] = useState<Iorder>({owner: {phone: '', address: ''}, items: [{id: 0, price: 0, count: 0}]});
  const [fetchStatus, setFetchStatus] = useState<number>(0);
  const [queryType, setQueryType] = useState<string>('GET');
  const [error, setError] = useState<Error>();

  const [data, setData] = useState<Icard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData () {
       try {
           setLoading(true)
           if (queryType === 'POST') {
            const res = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(order)
            });
            if (!res.ok) {throw new Error(res.statusText)}
            setQueryType('GET')
            setFetchStatus(res.status)
           }
           else {
            const res = await fetch(url);
            if (!res.ok) {throw new Error(res.statusText)}
            const resJson = await res.json()
            setData(prevData => prevData = chekData(prevData.concat(resJson), resJson, setHidden))
           }
       }
       catch(e) {
           if (e instanceof Error) {
               setError(e)
               navigate('/404.html')
           }
       }
       finally {
           setLoading(false)
       }
   }
   fetchData()
 }, [url, navigate, order, queryType])


  const handleOnClickCategory = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setData([]);
    setCategory(Number(e.currentTarget.id));
    setUrl(`http://localhost:7070/api/items?q=${change}&categoryId=${e.currentTarget.id}`);
    setOffset(6);
  }
  
  const handleOnClickLoad = () => {
    setOffset(offset => offset += 6);
    setUrl(`http://localhost:7070/api/items?q=${change}&categoryId=${category}&offset=${offset}`);
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChange(e.currentTarget.value);
    setInitvalue(e.currentTarget.value)
  };

  const handleOnChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked: value
    }))
  }

  const handleOnClickSearchBtn = () => {
    if (searchSatus === ' invisible') {
      setSearchStatus('');
    }
    else if (change !== '') {
      setInitvalue('');
      setSearchStatus(' invisible');
      setData([]);
      setUrl(`http://localhost:7070/api/items?q=${change}&categoryId=${category}`);
      navigate('/catalog.html');
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
    setData([]);
    setUrl(`http://localhost:7070/api/items?q=${change}&categoryId=${category}`)
  }

  const handleOnClickCart = () => {
    navigate('/cart.html')
  }

  const handleOnDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const elem = e.currentTarget.id;
    const data = fromStorage().filter(item => item.id !== elem);
    localStorage.setItem('cart', JSON.stringify(data));
    setCart(data);
  }

  const handleOnSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allItems: IitemOrder[] = [];
    cart.forEach((c, idx) => allItems.push({id: idx + 1, price: c.price, count: c.quantity})) 
    const order = {
      owner: {
        phone: form.phone,
        address: form.address
      },
      items: allItems
    }
    setQueryType('POST');
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    setOrder(order);
    setUrl('http://localhost:7070/api/order');
  }

  return (
    <>
      <Header navLinks={headerNavLinks}
              onClickCart={handleOnClickCart}
              onChange={handleOnChange}
              onSubmit={handleOnSubmitHeader}
              onClickSearch={handleOnClickSearchBtn}
              searchSatus={searchSatus}
              initValue={initValue} />          

      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Routes>
              <Route path='/' element={<Home catalogInfo={{data: data, loading: loading, category: category, offset: offset, hidden: hidden, handleOnClickCategory, handleOnClickLoad}}/>} />
              <Route path='/catalog/:id.html' element={<Item setCart={setCart} />}/>
              <Route path='/cart.html' element={<Cart onDelte={handleOnDelete} onChange={handleOnChangeForm} onSubmit={handleOnSubmit} form={form} loading={loading} status={fetchStatus}/>}/>
              <Route path='/catalog.html' element={<Catalog onChange={handleOnChange} onSubmit={handleOnSubmitCatalog} fromSearch={change}
                                          catalogInfo={{data: data, loading: loading, category: category, offset: offset, hidden: hidden, handleOnClickCategory, handleOnClickLoad}}/>} />
              <Route path='/about.html' element={<About />}/>
              <Route path='/contacts.html' element={<Contacts />}/>
              {error !== undefined ? <Route path='/404.html' element={<NotFound error={error}/>}/> : ''}
            </Routes>
          </div>
        </div>
      </main>
      <Footer navLinks={footerNavLinks}/>
    </>
  )
}

export default App
