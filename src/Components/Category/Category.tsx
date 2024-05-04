
import { Link } from 'react-router-dom';
import useJsonFetch from '../../useJsonFetch/useJsonFetch';

interface Icategory {
  category: number;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export const Category = ({ category, onClick }: Icategory) => {
  const { data } = useJsonFetch(' http://localhost:7070/api/categories');

  return (
    <>
      {data.length !== 0 ? 
      <ul className="catalog-categories nav justify-content-center">
        <li className="nav-item">
          {category === 0 ? <Link className="nav-link active" to='#' id='0' onClick={onClick}>Все</Link> : 
          <Link className="nav-link" to='#' id='0' onClick={onClick}>Все</Link>}
        </li>
        {data.map(cat => 
        <li className="nav-item" key={cat.id}>
          {category === cat.id ? <Link className= "nav-link active" to='#' id={cat.id.toString()} key={cat.id} onClick={onClick}>{cat.title}</Link> : 
          <Link className= "nav-link" to='#' id={cat.id.toString()} key={cat.id} onClick={onClick}>{cat.title}</Link>} 
        </li>)}
      </ul> : ''}
    </>
    
  )
}
