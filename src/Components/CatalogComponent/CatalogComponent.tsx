import { Loader } from '../Loader/Loader'
import useJsonFetch from '../../useJsonFetch/useJsonFetch';
import { Card } from '../Card/Card';
import { Category } from '../Category/Category';
import { useRef, useState } from 'react';
import { Icard } from '../../contexts/CardContext';

interface Iurl {
  search: string
}

export const CatalogComponent = ({ search }: Iurl) => {
  const [url, setUrl] = useState(`http://localhost:7070/api/items?q=${search}`);
  const [category, setCategory] = useState<number>(0);
  const [offset, setOffset] = useState<number>(6);

  const allData = useRef<Icard[]>([]);
  const oldCategory = useRef<number>(category)
  const oldId = useRef<Icard[]>([]);

  const {data, loading} = useJsonFetch(url);
  
  let hidden: boolean = false;

  if (!loading && data.length < 6) {
    hidden = true;
  }

  if (!loading) {
    if (data.length === 0) {
      allData.current = []
    }
    if(oldCategory.current !== category) {
        oldCategory.current = category;
        allData.current = [];
        oldId.current = data;
    }
    else {
        allData.current = allData.current.concat(data);
        const listId: number[] = [];
        allData.current.map(d => listId.push(d.id))
        const setId = Array.from(new Set(listId));
        if (oldId.current.length !== 0 && oldId.current[0].id === setId[0]) {
          if (setId.slice(oldId.current.length, setId.length).length !== 0) {
            const list: Icard[] = [];
            setId.slice(oldId.current.length, setId.length).forEach(id => {
            const d = allData.current.find(d => d.id === id);
            d !== undefined ? list.push(d) : '';
          });
          allData.current = list;
          }
          else {
            const list: Icard[] = [];
            setId.forEach(id => {
            const d = allData.current.find(d => d.id === id);
            d !== undefined ? list.push(d) : '';
          });
          allData.current = list;
          }
        }
        else {
          const list: Icard[] = [];
          setId.forEach(id => {
            const d = allData.current.find(d => d.id === id);
            d !== undefined ? list.push(d) : '';
          });
          allData.current = list;
        }
    }
  }

  const handleOnClickCategory = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setCategory(Number(e.currentTarget.id));
    setUrl(`http://localhost:7070/api/items?q=${search}&categoryId=${e.currentTarget.id}`);
    setOffset(6)
  }
  
  const handleOnClickLoad = () => {
    setOffset(offset => offset += 6)
    setUrl(`http://localhost:7070/api/items?q=${search}&categoryId=${category}&offset=${offset}`)
  }

  return (
    <>
    <Category category={category} onClick={handleOnClickCategory}/>
    {loading && offset === 6 ? <Loader/> : 
    <div className='row'>
        {allData.current.map(card => 
        <div className='col-4' key={card.id}>
            <Card id={card.id} images={card.images} category={card.category} title={card.title} price={card.price}/>
        </div>)}
    </div>}
    <div className="text-center">
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
