import React from "react";
const Nav = ({ children }) => (
  <div>
    <nav>
      <ul>
        <li><a href='/'>home</a></li>
      </ul>
    </nav>
    {children}
    <input type="text" placeholder="Summoner Name"/>
    <input type="submit"/>
  </div>
);

export default Nav;
