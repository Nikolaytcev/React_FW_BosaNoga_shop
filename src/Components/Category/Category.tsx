
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';

export const Category = () => {
  const { categories, category, handleOnClickCategory, setUrl, url} = useContext(AppContext);

  useEffect(() => {
    setUrl('http://localhost:7070/api/categories')
  }, [url])

  return (
    <>
      {categories.length !== 0 ? 
      <ul className="catalog-categories nav justify-content-center">
        <li className="nav-item">
          {category === 0 ? <Link className="nav-link active" to='#' id='0' onClick={handleOnClickCategory}>Все</Link> : 
          <Link className="nav-link" to='#' id='0' onClick={handleOnClickCategory}>Все</Link>}
        </li>
        {categories.map(cat => 
        <li className="nav-item" key={cat.id}>
          {category === cat.id ? <Link className= "nav-link active" to='#' id={cat.id.toString()} key={cat.id} onClick={handleOnClickCategory}>{cat.title}</Link> : 
          <Link className= "nav-link" to='#' id={cat.id.toString()} key={cat.id} onClick={handleOnClickCategory}>{cat.title}</Link>} 
        </li>)}
      </ul> : ''}
    </>
    
  )
}
