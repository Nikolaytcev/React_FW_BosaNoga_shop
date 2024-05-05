import { Loader } from '../Loader/Loader';
import useJsonFetch from '../../useJsonFetch/useJsonFetch';
import { Card } from '../Card/Card';

export const TopSales = () => {
  const {data, loading} = useJsonFetch('http://localhost:7070/api/top-sales');
  return (
    <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {loading ? <Loader/> : 
        <div className='row'>
            {data.map(card => 
            <div className='col-4' key={card.id}>
                <Card id={card.id} images={card.images} category={card.category} title={card.title} price={card.price}/>
            </div>)}
        </div>}
    </section>
  )
}
