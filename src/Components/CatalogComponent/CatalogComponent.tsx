import { Loader } from '../Loader/Loader'
import { Category } from '../Category/Category';
import { Icard } from '../../contexts/CardContext';
import { Card } from '../Card/Card';

export interface Iurl {
  data: Icard[],
  loading: boolean,
  category: number,
  offset: number,
  hidden: boolean,
  handleOnClickCategory: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  handleOnClickLoad: () => void
}

export const CatalogComponent = ({data, loading, category, offset, hidden, handleOnClickCategory, handleOnClickLoad }: Iurl) => {

 return (
    <>
    <Category category={category} onClick={handleOnClickCategory}/>
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
