import { Loader } from '../Loader/Loader';
import { Card } from '../Card/Card';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';

export const TopSales = () => {
  const {topSales, loading, categories, setUrl } = useContext(AppContext);

  useEffect (() => {
    setUrl('http://localhost:7070/api/top-sales')
  }, [categories.length])
   return (
    <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {loading ? <Loader/> : 
        <div className='row'>
            {topSales.map(card => 
            <div className='col-4' key={card.id}>
                <Card id={card.id} images={card.images} category={card.category} title={card.title} price={card.price}/>
            </div>)}
        </div>}
    </section>
  )
}
