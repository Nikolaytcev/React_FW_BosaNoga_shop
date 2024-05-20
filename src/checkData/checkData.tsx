import { Icard } from "../Components/Card/Card";

export function chekData (Alldata : Icard[], data: Icard[], setLoadedAll: (e: React.SetStateAction<boolean>) => void) {
    data.length < 6 ? setLoadedAll(true) : setLoadedAll(false);
    const listId: number[] = [];
    Alldata.map(d => listId.push(d.id));
    const setId = Array.from(new Set(listId));
  
    const list: Icard[] = [];
    setId.forEach(id => {
    const d = Alldata.find(d => d.id === id);
    d !== undefined ? list.push(d) : '';});
    return list;
  }