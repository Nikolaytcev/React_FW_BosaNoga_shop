import { FC, useContext } from 'react'
import logo from '../../img/header-logo.png'
import { NavigationItem } from '../NavigationItem/NavigationItem'
import { nanoid } from 'nanoid'
import { fromStorage } from '../../fromStorage/fromStorage';
import { AppContext } from '../../contexts/AppContext';

export interface Iheader {
  navLinks: {name: string, link: string}[];
}

export const Header: FC<Iheader> = ({ navLinks }) => {
  const {searchSatus, initValue, handleOnClickCart, handleOnChange, handleOnSubmitHeader, handleOnClickSearchBtn} = useContext(AppContext);

  const data =fromStorage();

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
                  <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handleOnClickSearchBtn}></div>
                  <div className="header-controls-pic header-controls-cart" onClick={handleOnClickCart}>
                    {data.length !== 0 ? <div className="header-controls-cart-full">{data.length}</div> : ''}
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form data-id="search-form" className={"header-controls-search-form form-inline" + searchSatus} onSubmit={handleOnSubmitHeader}>
                  <input className="form-control" placeholder="Поиск" onChange={handleOnChange} value={initValue}></ input>
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
