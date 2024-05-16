import { useContext, useEffect, useState } from 'react'
import { AppContext, Icard } from '../contexts/AppContext';

export default function useJsonFetch (url: string) {
  const [data, setData] = useState<Icard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { setError } = useContext(AppContext);

  useEffect(() => {
    async function fetchData () {
        try {
            const res = await fetch(url);
            if (!res.ok) {throw new Error(res.statusText)}
            const resJson = await res.json();
            setData(resJson)
        }
        catch(e) {
            if (e instanceof Error) {
                setError(e)
            } else {
                const error = new Error('unknown error')
                setError(error)
            }
        }
        finally {
            setLoading(false)
        }
    }
    fetchData()
  }, [url, setError])
  return {data, loading}
}
