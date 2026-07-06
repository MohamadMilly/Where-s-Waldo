import { Navbar } from "./components/shared/Navbar";
import { Outlet } from "react-router";

function App() {
  return (
    <div
      className={
        "grid grid-cols-1 sm:grid-cols-[12vw_1fr_12vw] grid-rows-[64px_1fr] h-full"
      }
    >
      <header className="flex items-center justify-between p-3 border-b border-purple-200 col-span-3 row-start-1 row-end-2">
        <h1 className="text-xl md:text-2xl text-purple-700">Waldo</h1>
        <Navbar />
      </header>
      <Outlet />
    </div>
  );
}

export default App;
