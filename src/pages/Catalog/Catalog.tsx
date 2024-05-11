import { useContext } from 'react';
import { CatalogComponent } from '../../Components/CatalogComponent/CatalogComponent'
import { AppContext } from '../../contexts/AppContext';

export const Catalog = () => {
  const { handleOnChange, handleOnSubmitCatalog, change } = useContext(AppContext);
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <form className="catalog-search-form form-inline" onSubmit={handleOnSubmitCatalog}>
        <input className="form-control" placeholder="Поиск" defaultValue={change} onChange={handleOnChange}></input>
      </form>
        <CatalogComponent/>
    </section>
  )
}
