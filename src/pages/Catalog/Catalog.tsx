import { CatalogComponent } from '../../Components/CatalogComponent/CatalogComponent'

interface Icatalog {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  fromFinder: string
}

export const Catalog = ({ onChange, onSubmit, fromFinder }: Icatalog) => {
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <form className="catalog-search-form form-inline" onSubmit={onSubmit}>
        <input className="form-control" placeholder="Поиск" defaultValue={fromFinder} onChange={onChange}></input>
      </form>
        <CatalogComponent search={fromFinder}/>
    </section>
  )
}
