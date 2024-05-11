import { Loader } from '../Loader/Loader'
import { Card } from '../Card/Card';
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';

export const CatalogComponent = () => {

 const {data, loading, offset, hidden, handleOnClickLoad} = useContext(AppContext);

 return (
    <>
    <div className="text-center">
      {loading && offset === 6 ? <Loader/> : 
        <div className='row'>
            {data.map(card => 
            <div className='col-4' key={card.id}>
                <Card id={card.id} images={card.images} category={card.category} title={card.title} price={card.price}/>
            </div>)}
        </div>}
        {loading && offset !== 6 ? 
        <>
          <Loader/> 
          <button className='btn btn-outline-primary' disabled onClick={handleOnClickLoad}>Загрузить ещё</button>
        </> : ''}
        {!loading ? hidden ? <button className='btn btn-outline-primary' hidden onClick={handleOnClickLoad}>Загрузить ещё</button> : 
              <button className='btn btn-outline-primary' onClick={handleOnClickLoad}>Загрузить ещё</button>: ''}
    </div>
    </>
  )
}
