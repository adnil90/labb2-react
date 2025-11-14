import { NavLink, Outlet } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div>
      <header style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <h1>Open-Meteo</h1>
        <nav aria-label="Primary">
          <NavLink to="/">Home</NavLink>
          {" | "}
          <NavLink to="/favorites">Favorites</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
