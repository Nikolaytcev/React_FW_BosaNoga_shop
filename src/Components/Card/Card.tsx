import { FC } from 'react'

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

export const Card: FC<Icard> = ({id, images, title, price}) => {
  return (
    <div className="card catalog-item-card" id={id.toString()}>
        <img src={images? images[0] : ''} className="card-img-top img-fluid" alt={title}></img>
        <div className="card-body">
            <p className="card-text">{title}</p>
            <p className="card-text">{price} руб.</p>
            <a href={`/catalog/${id}.html`} className="btn btn-outline-primary" id={id.toString()}>Заказать</a>
        </div>
    </div>
  )
}
