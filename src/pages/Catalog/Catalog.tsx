import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { Category } from '../../Components/Category/Category';
import { useNavigate } from 'react-router-dom';
import { Icard } from '../../Components/Card/Card';
import { chekData } from '../../checkData/checkData';
import { Cards } from '../../Components/Cards/Cards';

export const Catalog = () => {
 const { search, category, offset, handleOnChange, handleOnSubmitCatalog, setOffset, setError, setCategory, fetchMoreProducts } = useContext(AppContext);

 const navigate = useNavigate();

 const [loading, setLoading] = useState<boolean>(true);
 const [data, setData] = useState<Icard[]>([]);
 const [isLoadedAll, setLoadedAll] = useState<boolean>(false);
 const [newPage, setNewPage] = useState<boolean>(true);
 
 const prevChange = useRef(search);

 useEffect(() => {
    if (prevChange.current !== search) {
      prevChange.current = search;
      setOffset(6);
      setData([]);
    }
    async function fetchData () {
      try {
        setLoading(true);
        let url: string = `http://localhost:7070/api/items?q=${search}`
        if (newPage) {
          setCategory(0),
          setNewPage(false);
        }
        if (!newPage && offset !== 6) {
          url = `http://localhost:7070/api/items?q=${search}&categoryId=${category}&offset=${offset}`
        }
        else if (!newPage) {
          setData([]);
          url =  `http://localhost:7070/api/items?q=${search}&categoryId=${category}`
        }
          const res = await fetch(url);
          if (!res.ok) {throw new Error(res.status.toString())}
          const resJson = await res.json();
          console.log(resJson)
          setData(prevData => prevData = chekData(prevData.concat(resJson), resJson, setLoadedAll));
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
}, [category, offset, search])

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <form className="catalog-search-form form-inline" onSubmit={handleOnSubmitCatalog}>
        <input className="form-control" placeholder="Поиск" defaultValue={search} onChange={handleOnChange}></input>
      </form>
        <Category />
        <Cards data={data} loading={loading} isLoadedAll={isLoadedAll} onLoaded={fetchMoreProducts}/>
    </section>
  )
}
