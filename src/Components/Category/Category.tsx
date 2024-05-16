
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import useJsonFetch from '../../useJsonFetch/useJsonFetch';

export const Category = () => {
  const { category, handleOnClickCategory} = useContext(AppContext);
  const { data, loading } = useJsonFetch('http://localhost:7070/api/categories')

  return (
    <>
      {!loading  && data.length !== 1? 
      <ul className="catalog-categories nav justify-content-center">
        <li className="nav-item">
          {category === 0 ? <Link className="nav-link active" to='#' id='0' onClick={handleOnClickCategory}>Все</Link> : 
          <Link className="nav-link" to='#' id='0' onClick={handleOnClickCategory}>Все</Link>}
        </li>
        {data.map(cat => 
        <li className="nav-item" key={cat.id}>
          {category === cat.id ? <Link className= "nav-link active" to='#' id={cat.id.toString()} key={cat.id} onClick={handleOnClickCategory}>{cat.title}</Link> : 
          <Link className= "nav-link" to='#' id={cat.id.toString()} key={cat.id} onClick={handleOnClickCategory}>{cat.title}</Link>} 
        </li>)}
      </ul> : ''}
    </>
    
  )
}
