import { nanoid } from 'nanoid';
import { Loader } from '../../Components/Loader/Loader';
import useJsonFetch from '../../useJsonFetch/useJsonFetch'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import { IfromStorage, fromStorage } from '../../fromStorage/fromStorage';

interface Iitem {
  setCart: (e: React.SetStateAction<IfromStorage[]>) => void
}

export const Item = ({ setCart }: Iitem) => {
  const { id } = useParams();
  const [count, setCount] = useState<number>(1);
  const [selectSize, setSize] = useState<string>('');

  
  const {info, loading} = useJsonFetch(`http://localhost:7070/api/items/${id}`);
  const navigate = useNavigate();

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
      let filtered = data.filter(item => item.name === info?.title && item.size === selectSize);
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

  return (
    <>
    {loading ? <Loader/> : 
    <section className="catalog-item">
      <h2 className="text-center">{info?.title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={info?.images ? info?.images[0] : ''} className="img-fluid" alt=""></img>
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{info?.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{info?.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{info?.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{info?.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{info?.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{info?.reason}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <p>Размеры в наличии: 
              {info?.sizes?.map(size => size.available ? 
              size.size === selectSize ? <span className="catalog-item-size selected" key={nanoid()} onClick={handlleOnselected}>{`${size.size}`}</span> : 
              <span className="catalog-item-size" key={nanoid()} onClick={handlleOnselected}>{`${size.size}`}</span>
               : '')}
            </p>
            {info?.sizes?.filter(size => size.available).length !== 0 ?
            <p>Количество: <span className="btn-group btn-group-sm pl-2">
            <button className="btn btn-secondary" onClick={handleOnClickDecrement}>-</button>
            <span className="btn btn-outline-primary">{count}</span>
            <button className="btn btn-secondary" onClick={handleOnClickIncrement}>+</button>
            </span></p>: ''}
          </div>
          {info?.sizes?.filter(size => size.available).length !== 0 ? 
          selectSize !== '' ? <button className='btn btn-danger btn-block btn-lg' onClick={handleOnInCart}>В корзину</button> :
          <button className='btn btn-danger btn-block btn-lg disabled' onClick={handleOnInCart}>В корзину</button> : ''}
        </div>
      </div>
    </section>}
    </>
  )
}
