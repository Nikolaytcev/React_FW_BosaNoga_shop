import { CatalogComponent, Iurl } from '../../Components/CatalogComponent/CatalogComponent'

interface Icatalog {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  fromSearch: string,
  catalogInfo: Iurl
}

export const Catalog = ({ onChange, onSubmit, fromSearch, catalogInfo }: Icatalog) => {
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <form className="catalog-search-form form-inline" onSubmit={onSubmit}>
        <input className="form-control" placeholder="Поиск" defaultValue={fromSearch} onChange={onChange}></input>
      </form>
        <CatalogComponent {...catalogInfo}/>
    </section>
  )
}
