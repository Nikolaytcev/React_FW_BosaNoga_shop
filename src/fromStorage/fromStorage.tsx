import { Icart } from "../pages/Cart/Cart";

export function fromStorage() {
    const datafromlocalStorage = localStorage.getItem('cart');
    let data: Icart[] = [];
    if(datafromlocalStorage !== null) {
        data = JSON.parse(datafromlocalStorage);
    }
  return data
}
