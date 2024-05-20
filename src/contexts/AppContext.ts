import { createContext } from "react";
import { IfromStorage } from "../fromStorage/fromStorage";
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
    category: number,
    offset: number,
    change: string,
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
    search: string,
    handleOnClickCategory: (e: React.MouseEvent<HTMLAnchorElement>) => void,
    fetchMoreProducts: () => void,
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
    setCart: (e: React.SetStateAction<IfromStorage[]>) => void,
    setError: (e: React.SetStateAction<Error | undefined>) => void,
    setOffset: (e: React.SetStateAction<number>) => void,
    setQueryType: (e: React.SetStateAction<string>) => void,
    setFetchStatus: (e: React.SetStateAction<number>) => void,
    setCount: (e: React.SetStateAction<number>) => void,
    setSize: (e: React.SetStateAction<string>) => void,
    setChange: (e: React.SetStateAction<string>) => void,
    setCategory: (e: React.SetStateAction<number>) => void,
    setForm: (e: React.SetStateAction<Iform>) => void,
  }

  const catalogComponentContext = {
    category: 0,
    offset: 0,
    change: '',
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
    search: '',
    handleOnClickCategory: () => {},
    fetchMoreProducts: () => {},
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
    setCart: () => {},
    setError: () => {},
    setOffset: () => {},
    setQueryType: () => {},
    setFetchStatus: () => {},
    setCount: () => {},
    setSize: () => {},
    setChange: () => {},
    setCategory: () => {},
    setForm: () => {}
  }


  export const AppContext = createContext<Iapp>(catalogComponentContext);