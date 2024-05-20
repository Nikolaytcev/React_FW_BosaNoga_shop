import { FC, PropsWithChildren, useState } from "react"
import { AppContext } from "../contexts/AppContext"
import { useNavigate } from "react-router-dom";
import { IfromStorage, fromStorage } from "../fromStorage/fromStorage";


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

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
    const [change, setChange] = useState<string>('');
    const [search,  setSearch] = useState<string>('');

    const [category, setCategory] = useState<number>(0);
    const [offset, setOffset] = useState<number>(6);
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

    const navigate = useNavigate();

    const handleOnClickCategory = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setCategory(Number(e.currentTarget.id));
        setOffset(6);
    }
      
    const fetchMoreProducts = () => {
        setOffset(offset => offset += 6);
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
          setSearch(change)
          setSearchStatus(' invisible');
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
        setSearch(change);
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

    const handlers = {handleOnClickCategory,
                      fetchMoreProducts,
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
                    };
    
    const variables = {change, category, offset,order,
                       fetchStatus, queryType, error, 
                       initValue, form, searchSatus,
                       cart, count, selectSize, search};
    
    const setters = {setCart, setError, setOffset, setQueryType, setFetchStatus, setCount, setSize, setCategory, setChange, setForm}

    
  return (
    <AppContext.Provider value={{...variables, ...handlers, ...setters}}>
        {children}
    </AppContext.Provider>
  )
}
