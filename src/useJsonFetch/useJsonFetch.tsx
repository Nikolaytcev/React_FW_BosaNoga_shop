import { useEffect, useState } from 'react'
import { Icard } from '../contexts/CardContext';
import { useNavigate } from 'react-router-dom';

export default function useJsonFetch (url: string, opts?: {method: string}) {
  const [data, setData] = useState<Icard[]>([]);
  const [info, setInfo] = useState<Icard>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>()

  const navigate = useNavigate();

  useEffect(() => {
     async function fetchData () {
        try {
            setLoading(true)
            const res = await fetch(url, opts);
            if (!res.ok) {throw new Error(res.statusText)}
            const resJson = await res.json();
            setData(resJson);
            setInfo(resJson);
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
  return {data, info, loading, error}
}
