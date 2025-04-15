import logoLight from "@/assets/images/logo-light.png";
// import logoAuthenticPage from "@/assets/logo_256.png";
import logo_ccbm from "@/assets/logo.png";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";

import MaximizeScreen from "./MaximizeScreen";

import ProfileDropdown from "./ProfileDropdown";
import GestionMenu from "./GestionMenu";

const TopBar = () => {

  return (
    <header className="sticky top-0 z-50">
      <div className="z-50 flex w-full flex-wrap border-b border-default-200 bg-zinc-950 py-2.5 text-sm sm:flex-nowrap sm:justify-start sm:py-4">
        <nav className="container flex w-full items-center justify-between gap-6">
          <div>
            <Link to="/gestion/dashboard" className="block">
              <img src={logo_ccbm} className="flex h-16" alt="images" />
              {/* <span className=" text-bold text-2xl" >
                <span className="text-blueLogo">CCBM SHOP</span>
              </span> */}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex">
              <MaximizeScreen />
            </div>
            <div className="flex">
              <ProfileDropdown />
            </div>
          </div>
        </nav>
      </div>

      <GestionMenu />
    </header>
  );
};

export default TopBar;
