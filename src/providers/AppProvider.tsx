import { FC, PropsWithChildren, useEffect, useState } from "react"
import { AppContext } from "../contexts/AppContext"
import { useNavigate } from "react-router-dom";
import { IfromStorage, fromStorage } from "../fromStorage/fromStorage";
import { Icard } from "../Components/Card/Card";
import { nanoid } from "nanoid";

export interface Iform {
  phone: string,
  address: string,
  policy: boolean
}

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


export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
    const [change, setChange] = useState<string>('');
    const [url, setUrl] = useState(`http://localhost:7070/api/items?q=${change}`);
    const [category, setCategory] = useState<number>(0);
    const [categores, setCategores] = useState<{id: number, title: string}[]>([])
    const [offset, setOffset] = useState<number>(6);
    const [hidden, setHidden] = useState<boolean>(false);
    const [order, setOrder] = useState<Iorder>({owner: {phone: '', address: ''}, items: [{id: 0, price: 0, count: 0}]});
    const [fetchStatus, setFetchStatus] = useState<number>(0);
    const [queryType, setQueryType] = useState<string>('GET');
    const [error, setError] = useState<Error>();
    const [initValue, setInitvalue] = useState<string>('');
    const [form, setForm] = useState<Iform>({phone: '', address: '', policy: false});
    const [searchSatus, setSearchStatus] = useState<string>(' invisible');
    const [cart, setCart] = useState<IfromStorage[]>(fromStorage());
    const [count, setCount] = useState<number>(1);
    const [selectSize, setSize] = useState<string>('');

    const [data, setData] = useState<Icard[]>([]);
    const [info, setInfo] = useState<Icard>();
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();


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
            if (!url.includes('?') && !url.includes('categories')) {
              setInfo(resJson)
            }
            else {
              if (url.includes('categories')) {
                setCategores(resJson)
              }
              else {
                setData(prevData => prevData = chekData(prevData.concat(resJson), resJson, setHidden))
              }
              
            }
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
    }, [url])

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

    const handleOnClickIncrement = () => {
      setCount(count => count < 10 ? count + 1 : 10)
    }
  
    const handleOnClickDecrement = () => {
      setCount(count => count > 1 ? count - 1 : 1)
    }
  
    const handlleOnselected = (e: React.MouseEvent<HTMLButtonElement>) => {
      const selectedEl = e.currentTarget;
      if (selectedEl.classList.contains('selected')) {
         setSize('');
      }
      else {
        setSize(selectedEl.textContent ? selectedEl.textContent : '');
      }
    }
  
    const handleOnInCart = (e: React.MouseEvent<HTMLButtonElement>) => {
      const btnState = e.currentTarget.classList.contains('disabled');
      if (!btnState) {
        const data = fromStorage();
        const filtered = data.filter(item => item.name === info?.title && item.size === selectSize);
        if (filtered.length !== 0) {
          data.map(item => item.name === info?.title && item.size === selectSize ? item.quantity += count : '');
        }
        else {
          data.push({id: nanoid(), name: info?.title ? info.title : '', size: selectSize, quantity: count, price: info?.price ? info.price : 0});
        }
        setCart(data);
        localStorage.setItem('cart', JSON.stringify(data));
        navigate('/cart.html');
      }
    }

    const handlers = {handleOnClickCategory,
                      handleOnClickLoad,
                      handleOnSubmit,
                      handleOnDelete,
                      handleOnClickCart,
                      handleOnSubmitCatalog,
                      handleOnSubmitHeader,
                      handleOnClickSearchBtn,
                      handleOnChangeForm,
                      handleOnChange,
                      handleOnClickIncrement,
                      handleOnClickDecrement,
                      handlleOnselected,
                      handleOnInCart
                    };
    
    const variables = {data, info, loading, change,
                       url, category, categores, offset,
                       hidden, order, fetchStatus, queryType,
                       error, initValue, form, searchSatus,
                       cart, count, selectSize}
    
  return (
    <AppContext.Provider value={{...variables, ...handlers, setCart, setUrl}}>
        {children}
    </AppContext.Provider>
  )
}
