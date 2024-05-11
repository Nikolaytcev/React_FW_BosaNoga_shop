import { useContext, useEffect, useState } from 'react'
import { Icard } from '../Components/Card/Card';
import { AppContext } from '../contexts/AppContext';

export default function useJsonFetch (url: string, opts?: {method: string}) {
  const [topSales, setTopSales] = useState<Icard[]>([{id: 0, title: ''}]);
  const [categories, setCategories] = useState<{id: number, title: string}[]>([{id: 0, title: ''}])
  const [loading, setLoading] = useState<boolean>(true);

  const { setError } = useContext(AppContext);

  useEffect(() => {
    async function fetchData () {
        try {
            const res = await fetch(url, opts);
            if (!res.ok) {throw new Error(res.statusText)}
            const resJson = await res.json();
            if (url.includes('categories')) {
                setCategories(resJson)
            }
            else {
                setTopSales(resJson)
            }
        }
        catch(e) {
            if (e instanceof Error) {
                setError(e)
            }
        }
        finally {
            setLoading(false)
        }
    }
    fetchData()
  }, [url, opts])
  return {topSales, categories, loading}
}
