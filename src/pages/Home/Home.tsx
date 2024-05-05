import { Iurl } from "../../Components/CatalogComponent/CatalogComponent"
import { Items } from "../../Components/Items/Items"
import { TopSales } from "../../Components/Topsales/TopSales"

interface Ihome {
  catalogInfo: Iurl
}

export const Home = ({ catalogInfo }: Ihome) => {
  return (
    <>
      <TopSales/>
      <Items catalogInfo={catalogInfo}/>
    </>
  )
}
