import { nanoid } from 'nanoid';
import { Loader } from '../../Components/Loader/Loader';
import useJsonFetch from '../../useJsonFetch/useJsonFetch'
import { useParams } from 'react-router-dom'
import { useState } from 'react';

export const Item = () => {
  const { id } = useParams();
  const [count, setCount] = useState<number>(1)
  const {info, loading} = useJsonFetch(`http://localhost:7070/api/items/${id}`);

  const handleOnClickIncrement = () => {
    setCount(count => count < 10 ? count + 1 : 10)
  }

  const handleOnClickDecrement = () => {
    setCount(count => count > 1 ? count - 1 : 1)
  }

  const handlleOnselected = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedEl = e.currentTarget;
    const allSizes = selectedEl.closest('.text-center')?.querySelectorAll('.catalog-item-size');
    const inCartBtn = selectedEl.closest('.col-7')?.querySelector('.btn-danger');
    allSizes?.forEach(size => {
     if (size.textContent === selectedEl.textContent) {
      if (size.classList.contains('selected')) {
        selectedEl.classList.remove('selected');
        inCartBtn?.classList.add('disabled')
      }
      else {
        selectedEl.classList.add('selected');
        inCartBtn?.classList.remove('disabled')
      }
     }
     else {
      size.classList.remove('selected');
     }
    })
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
              {info?.sizes?.map(size => size.available? <span className="catalog-item-size" key={nanoid()} onClick={handlleOnselected}>{`${size.size}`}</span> : '')}
            </p>
            <p>Количество: <span className="btn-group btn-group-sm pl-2">
            <button className="btn btn-secondary" onClick={handleOnClickDecrement}>-</button>
            <span className="btn btn-outline-primary">{count}</span>
            <button className="btn btn-secondary" onClick={handleOnClickIncrement}>+</button>
            </span></p>
          </div>
          <button className='btn btn-danger btn-block btn-lg disabled'>В корзину</button>
        </div>
      </div>
    </section>}
    </>
  )
}
