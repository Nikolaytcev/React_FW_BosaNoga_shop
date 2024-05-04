import { createContext } from "react";

export interface Icard {
    id: number,
    category?: number,
    title: string,
    images?: string[],
    sku?: string,
    manufacturer?: string,
    color?: string,
    material?: string,
    reason?: string,
    season?: string,
    heelSize?: string,
    price?: number,
    oldPrice?: number,
    sizes?: {size: string, available: boolean}[]}

const card = {
    id: 0,
    category: 0,
    title: '',
    images: [''],
    sku: '',
    manufacturer: '',
    color: '',
    material: '',
    reason: '',
    season: '',
    heelSize: '',
    price: 0,
    oldPrice: 0,
    sizes: [{size: '', available: false}]
};

export const CardContext = createContext<Icard>(card);