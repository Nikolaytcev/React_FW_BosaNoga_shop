import { FC } from 'react'
import logo from '../../img/header-logo.png'
import { NavigationItem } from '../NavigationItem/NavigationItem'
import { nanoid } from 'nanoid'

export interface Iheader {
  navLinks: {name: string, link: string}[];
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

export const Header: FC<Iheader> = ({ navLinks, onClick, onChange, onSubmit }) => {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <a className="navbar-brand" href="/">
            <img src={logo} alt="Bosa Noga"></ img>
            </a>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                {navLinks.map(link => <NavigationItem name={link.name} link={link.link} key={nanoid()}/>)}
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                  {/* <!-- Do programmatic navigation on click to /cart.html --> */}
                  <div className="header-controls-pic header-controls-cart" onClick={onClick}>
                    <div className="header-controls-cart-full">1</div>
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form data-id="search-form" className="header-controls-search-form form-inline invisible" onSubmit={onSubmit}>
                  <input className="form-control" placeholder="Поиск" onChange={onChange}></ input>
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
