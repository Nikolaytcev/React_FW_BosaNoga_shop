export interface IfromStorage {
    id: string,
    name: string,
    size: string,
    quantity: number,
    price: number
  }

export function fromStorage() {
    const datafromlocalStorage = localStorage.getItem('cart');
    let data: IfromStorage[] = [];
    if(datafromlocalStorage !== null) {
        data = JSON.parse(datafromlocalStorage);
    }
  return data
}
