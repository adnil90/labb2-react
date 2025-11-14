import { NavLink } from "react-router-dom";

export function HeaderNav() {
  return (
    <header style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <h1>Open-Meteo</h1>
      <nav aria-label="Primary">
        <NavLink to="/">Home</NavLink>
        {" | "}
        <NavLink to="/favorites">Favorites</NavLink>
      </nav>
    </header>
  );
}
