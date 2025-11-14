import { Outlet } from "react-router-dom";
import { HeaderNav } from "./components/HeaderNav";
import "./index.css";

export default function App() {
  return (
    <div>
      <a
        href="#main"
        className="skip-link"
      >
        Skip to main content
      </a>

      <HeaderNav />

      <main id="main">
        <Outlet />
      </main>
    </div>
  );
}
