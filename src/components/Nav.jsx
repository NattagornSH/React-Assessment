import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-end gap-6 pr-8">
          <Link
            to="/"
            className={`font-medium text-lg transition-colors ${
              location.pathname === "/"
                ? "text-indigo-600"
                : "text-slate-600 hover:text-indigo-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/owner"
            className={`font-medium text-lg transition-colors ${
              location.pathname === "/owner"
                ? "text-indigo-600"
                : "text-slate-600 hover:text-indigo-600"
            }`}
          >
            Owner
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
