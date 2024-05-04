import { NavLink } from "react-router-dom"

export interface InavLink {
    name: string,
    link: string,
    id?: number
}

export const NavigationItem = ({name, link, id}: InavLink) => {
  return (
    <li className="nav-item">
      <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to={link} id={id?.toString()}>{name}</NavLink> 
    </li>
  )
}
