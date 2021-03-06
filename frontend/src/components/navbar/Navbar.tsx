import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './navbar.module.css';
import SearchBar from './SearchBar';
import { getBuildings } from '../../services/buildingsService';
import { IBuildingsData } from '../../types/interfaces';

export default function Navbar() {
  // Fetching all the buildings for the navbar search field
  const [search, setSearch] = useState <IBuildingsData[]>([]);
  useEffect(() => {
    const fetchdata = async () => {
      const response:IBuildingsData[] = await getBuildings('');
      setSearch(response);
    };
    fetchdata();
  }, []);

  return (
    <nav className={style.container}>
      <SearchBar data={search} />
      <NavLink className={`${style.menuitems} ${style.oversikt}`} activeClassName={`${style.selected} ${style.oversiktF}`} exact to="/">Oversikt</NavLink>
      <NavLink className={`${style.menuitems} ${style.skoler}`} activeClassName={`${style.selected} ${style.skolerF}`} to="/skole">Skoler</NavLink>
      <NavLink className={`${style.menuitems} ${style.barnehager}`} activeClassName={`${style.selected} ${style.barnehagerF}`} to="/barnehage">Barnehager</NavLink>
      <NavLink className={`${style.menuitems} ${style.sykehjem}`} activeClassName={`${style.selected} ${style.sykehjemF}`} to="/helsebygg">Sykehjem</NavLink>
      <NavLink className={`${style.menuitems} ${style.idrett}`} activeClassName={`${style.selected} ${style.idrettF}`} to="/idrettsbygg">Idrettsbygg</NavLink>
      <NavLink className={`${style.menuitems} ${style.andre}`} activeClassName={`${style.selected} ${style.andreF}`} to="/annet">Andre bygg</NavLink>
      <NavLink className={`${style.menuitems} ${style.energi}`} activeClassName={`${style.selected} ${style.energiF}`} to="/energitips">Energitips</NavLink>
    </nav>
  );
}
