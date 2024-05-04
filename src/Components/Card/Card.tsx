import { FC } from 'react'
import { Icard } from '../../contexts/CardContext';

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
