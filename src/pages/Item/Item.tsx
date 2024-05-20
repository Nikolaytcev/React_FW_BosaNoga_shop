import { nanoid } from 'nanoid';
import { Loader } from '../../Components/Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../contexts/AppContext';
import { Icard } from '../../Components/Card/Card';
import { fromStorage } from '../../fromStorage/fromStorage';

export const Item = () => {
  const { handleOnClickIncrement,
          handleOnClickDecrement,
          handlleOnselected,
          selectSize, count, setError, setCart, setCount, setSize} = useContext(AppContext);

  const { id } = useParams();

  const [data, setData] = useState<Icard>();
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleOnInCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btnState = e.currentTarget.classList.contains('disabled');
    if (!btnState) {
      const dataFromStorage = fromStorage();
      const filtered = dataFromStorage.filter(item => item.name === data?.title && item.size === selectSize);
      if (filtered.length !== 0) {
        dataFromStorage.map(item => item.name === data?.title && item.size === selectSize ? item.quantity += count : '');
      }
      else {
        dataFromStorage.push({id: nanoid(), name: data?.title ? data.title : '', size: selectSize, quantity: count, price: data?.price ? data.price : 0});
      }
      setCart(dataFromStorage);
      localStorage.setItem('cart', JSON.stringify(dataFromStorage));
      navigate('/cart.html');
    }
  }

  useEffect(() => {
    setCount(1);
    setSize('');
    async function fetchData () {
      try {
        setLoading(true)
          const res = await fetch(`http://localhost:7070/api/items/${id}`);
          if (!res.ok) {throw new Error(res.status.toString())}
          const resJson = await res.json()
          setData(resJson)
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
  }, [])

  return (
    <>
    {loading ? <Loader/> : 
    <section className="catalog-item">
      <h2 className="text-center">{data?.title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={data?.images ? data?.images[0] : ''} className="img-fluid" alt=""></img>
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{data?.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{data?.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{data?.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{data?.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{data?.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{data?.reason}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <p>Размеры в наличии: 
              {data?.sizes?.map(size => size.available ? 
              size.size === selectSize ? <span className="catalog-item-size selected" key={nanoid()} onClick={handlleOnselected}>{`${size.size}`}</span> : 
              <span className="catalog-item-size" key={nanoid()} onClick={handlleOnselected}>{`${size.size}`}</span>
               : '')}
            </p>
            {data?.sizes?.filter(size => size.available).length !== 0 ?
            <p>Количество: <span className="btn-group btn-group-sm pl-2">
            <button className="btn btn-secondary" onClick={handleOnClickDecrement}>-</button>
            <span className="btn btn-outline-primary">{count}</span>
            <button className="btn btn-secondary" onClick={handleOnClickIncrement}>+</button>
            </span></p>: ''}
          </div>
          {data?.sizes?.filter(size => size.available).length !== 0 ? 
          selectSize !== '' ? <button className='btn btn-danger btn-block btn-lg' onClick={handleOnInCart}>В корзину</button> :
          <button className='btn btn-danger btn-block btn-lg disabled' onClick={handleOnInCart}>В корзину</button> : ''}
        </div>
      </div>
    </section>}
    </>
  )
}
