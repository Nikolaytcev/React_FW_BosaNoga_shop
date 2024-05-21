import { useContext, useEffect, useState } from "react";
import { TopSales } from "../../Components/Topsales/TopSales"
import { AppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { Icard } from "../../Components/Card/Card";
import { chekData } from "../../checkData/checkData";
import { Category } from "../../Components/Category/Category";
import { Cards } from "../../Components/Cards/Cards";

export const Home = () => {
 const { offset, category, setError, setCategory, fetchMoreProducts} = useContext(AppContext);
 const navigate = useNavigate();

 const [loading, setLoading] = useState<boolean>(true);
 const [data, setData] = useState<Icard[]>([]);
 const [isLoadedAll, setLoadedAll] = useState<boolean>(false);
 const [newPage, setNewPage] = useState<boolean>(true);

 useEffect(() => {
    async function fetchData () {
      try {
        setLoading(true);

        let url: string = 'http://localhost:7070/api/items';
        if (newPage) {
          setCategory(0),
          setNewPage(false);
        }
        if (!newPage && offset !== 6) {
          url =  `http://localhost:7070/api/items?categoryId=${category}&offset=${offset}`;
        }
        else if (!newPage) {
          setData([]);
          url = `http://localhost:7070/api/items?categoryId=${category}`
        }
          const res = await fetch(url);
          if (!res.ok) {throw new Error(res.status.toString())}
          const resJson = await res.json()
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
}, [category, offset])

  return (
    <>
      <TopSales />
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Category />
        <Cards data={data} loading={loading} isLoadedAll={isLoadedAll} onLoaded={fetchMoreProducts} />
    </section>
    </>
  )
}
