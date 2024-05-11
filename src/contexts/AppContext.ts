import { createContext } from "react";
import { IfromStorage } from "../fromStorage/fromStorage";
import { Icard } from "../Components/Card/Card";
import { Iform } from "../providers/AppProvider";

interface IitemOrder {
    id: number,
    price: number,
    count: number
  }
  
  interface Iorder {
    owner: {
      phone: string,
      address: string
    },
    items: IitemOrder[]
  }

export interface Iapp {
    data: Icard[],
    info: Icard | undefined,
    loading: boolean,
    category: number,
    categores: {id: number, title: string}[],
    offset: number,
    hidden: boolean,
    change: string,
    url: string,
    order: Iorder,
    fetchStatus: number,
    queryType: string,
    error: Error | undefined,
    initValue: string,
    form: Iform,
    searchSatus: string,
    cart: IfromStorage[],
    count: number;
    selectSize: string,
    handleOnClickCategory: (e: React.MouseEvent<HTMLAnchorElement>) => void,
    handleOnClickLoad: () => void,
    handleOnSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void,
    handleOnDelete: (e: React.MouseEvent<HTMLButtonElement>) => void,
    handleOnClickCart: () => void,
    handleOnSubmitCatalog: (e: React.FormEvent<HTMLFormElement>) => void,
    handleOnSubmitHeader: (e: React.FormEvent<HTMLFormElement>) => void,
    handleOnClickSearchBtn: () => void,
    handleOnChangeForm: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleOnClickIncrement: () => void,
    handleOnClickDecrement: () => void,
    handlleOnselected: (e: React.MouseEvent<HTMLButtonElement>) => void,
    handleOnInCart: (e: React.MouseEvent<HTMLButtonElement>) => void,
    setCart: (e: React.SetStateAction<IfromStorage[]>) => void,
    setUrl: (e: React.SetStateAction<string>) => void
  }

  const catalogComponentContext = {
    data: [],
    info: {id: 0, title: ''},
    loading: true,
    category: 0,
    categores: [],
    offset: 0,
    hidden: false,
    change: '',
    url: '',
    order: {owner: {phone: '', address: ''}, items: [{id: 0, price: 0, count: 0}]},
    fetchStatus: 0,
    queryType: '',
    error: undefined,
    initValue: '',
    form: {phone: '', address: '', policy: false},
    searchSatus: '',
    cart: [],
    count: 1,
    selectSize: '',
    handleOnClickCategory: () => {},
    handleOnClickLoad: () => {},
    handleOnSubmit: () => {},
    handleOnDelete: () => {},
    handleOnClickCart: () => {},
    handleOnSubmitCatalog: () => {},
    handleOnSubmitHeader: () => {},
    handleOnClickSearchBtn: () => {},
    handleOnChangeForm: () => {},
    handleOnChange: () => {},
    handleOnClickIncrement: () => {},
    handleOnClickDecrement: () => {},
    handlleOnselected: () => {},
    handleOnInCart: () => {},
    setCart: () => {},
    setUrl: () => {}
  }


  export const AppContext = createContext<Iapp>(catalogComponentContext);