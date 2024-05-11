import { nanoid } from 'nanoid';
import { Loader } from '../../Components/Loader/Loader';
import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react';

import { AppContext } from '../../contexts/AppContext';

export const Item = () => {
  const { setUrl, handleOnClickIncrement,
                  handleOnClickDecrement,
                  handlleOnselected,
                  handleOnInCart,
                  selectSize, info, loading, url, count,} = useContext(AppContext);
  const { id } = useParams();

  useEffect(() => {
    setUrl(`http://localhost:7070/api/items/${id}`)
  }, [url])
  
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
