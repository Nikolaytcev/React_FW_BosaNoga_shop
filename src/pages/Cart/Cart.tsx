import { useContext, useEffect, useState } from "react";
import { Loader } from "../../Components/Loader/Loader";
import { fromStorage } from "../../fromStorage/fromStorage"
import { AppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { handleOnDelete, handleOnChangeForm, handleOnSubmit, setError, setQueryType, setFetchStatus, setForm,
    form, fetchStatus, queryType, order } = useContext(AppContext);

  const { phone, address, policy } = form;
  const data = fromStorage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);


  let sum: number = 0;
  data.forEach(item => sum += item.price * item.quantity)

  useEffect(() => {
    setFetchStatus(0);
    setForm({phone: '', address: '', policy: false});
  }, [])

  useEffect(() => {
    setLoading(true)
    async function fetchData () {
      try {
        if (queryType === 'POST') {
          const res = await fetch('http://localhost:7070/api/order', {
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
  }, [queryType])

  return (
    <> 
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
        {data.map((item, idx) => 
          <tr key={idx} id={item.id}>
            <td scope="row">{idx + 1}</td>
            <td><a href="/products/1.html">{item.name}</a></td>
            <td>{item.size}</td>
            <td>{item.quantity}</td>
            <td>{item.price} руб.</td>
            <td>{item.price * item.quantity} руб.</td>
            <td><button className="btn btn-outline-danger btn-sm" id={item.id} onClick={handleOnDelete}>Удалить</button></td>
          </tr>)}
          <tr>
            <td colSpan={5} className="text-right">Общая стоимость</td>
            {sum !== 0 ? <td>{sum} руб.</td> : ''}
          </tr>
        </tbody>
      
      </table>
    </section>
    {loading ? <Loader/> : fetchStatus === 0 ? 
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
        <form className="card-body" onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input className="form-control" name="phone" type="tel" id="phone" placeholder="Ваш телефон" onChange={handleOnChangeForm} value={phone}/>
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input type="text" className="form-control" name="address" id="address" placeholder="Адрес доставки" onChange={handleOnChangeForm} value={address}/>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" name="policy" id="agreement" checked={policy} onChange={handleOnChangeForm} />
            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
          </div>
          {phone !== ''&& address !== '' && policy && data.length !== 0 ?
            <button type="submit" className="btn btn-outline-secondary" >Оформить</button> : 
            <button type="submit" className="btn btn-outline-secondary" disabled >Оформить</button>
          }
        </form>
      </div>
    </section> : "Ваш заказ оформлен!"}
    </>
  )
}
