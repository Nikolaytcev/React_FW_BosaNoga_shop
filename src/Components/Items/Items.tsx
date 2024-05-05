import { CatalogComponent, Iurl } from "../CatalogComponent/CatalogComponent"

interface Iitems {
    catalogInfo: Iurl
}

export const Items = ({ catalogInfo }: Iitems) => {
  return (
    <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <CatalogComponent {...catalogInfo}/>
    </section>
  )
}
