import { CatalogComponent } from "../CatalogComponent/CatalogComponent"
import { Category } from "../Category/Category"

export const Items = () => {
  return (
    <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Category />
        <CatalogComponent />
    </section>
  )
}
