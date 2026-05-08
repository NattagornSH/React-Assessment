import { useState } from "react";
import UserSection from "./UserSection";
import AdminSection from "./AdminSection";

function Home() {
  const [activeSection, setActiveSection] = useState("user");

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold tracking-tight text-center mb-16 text-slate-900">
          Generation Thailand <br />
          React - Assessment
        </h1>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveSection("user")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeSection === "user"
                ? "bg-indigo-600 text-white shadow-md"
                : "border-2 border-slate-300 text-slate-600 hover:border-indigo-300"
            }`}
          >
            User Home Section
          </button>
          <button
            onClick={() => setActiveSection("admin")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeSection === "admin"
                ? "bg-indigo-600 text-white shadow-md"
                : "border-2 border-slate-300 text-slate-600 hover:border-indigo-300"
            }`}
          >
            Admin Home Section
          </button>
        </div>

        {/* Content Section */}
        {activeSection === "user" ? <UserSection /> : <AdminSection />}
      </div>
    </div>
  );
}

export default Home;
