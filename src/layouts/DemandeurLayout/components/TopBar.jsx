import logoLight from "@/assets/images/logo-light.png";
// import logoAuthenticPage from "@/assets/logo_256.png";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import MaximizeScreen from "./MaximizeScreen";
import EmailDropdown from "./EmailDropdown";
import AppsDropdown from "./AppsDropdown";
import ProfileDropdown from "./ProfileDropdown";


import logoAuthenticPage from "@/assets/logo_authentic_page.png";
import logoAuthenticPageDark from "@/assets/logo_authentic_page_dark.png";

const TopBar = () => {
  return (
    <header className="sticky top-0 z-50">
      <div className="z-50 flex w-full flex-wrap border-b border-default-200 bg-zinc-950 py-2.5 text-sm sm:flex-nowrap sm:justify-start sm:py-4">
        <nav className="container flex w-full items-center justify-between gap-6">
          <div>
            <Link to="/" className="block">
              {/* <img src={logoAuthenticPage} className="flex h-8" alt="images" /> */}
              <span className=" text-bold text-2xl" >
                <span className="text-blueLogo" >Authentic</span><span className="text-rougeLogo" >Page</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {/* <div className="relative hidden lg:block">
              <LuSearch className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="search"
                className="h-10 w-full rounded-full border-0 bg-zinc-800 pe-4 ps-11 text-zinc-300 placeholder-zinc-400 focus:ring-0 sm:text-sm"
                placeholder="Search..."
              />
            </div> */}
            <div className="hidden sm:flex">
              <MaximizeScreen />
            </div>

            <div className="hidden sm:flex">
              <EmailDropdown />
            </div>
            <div className="hidden sm:flex">
              <AppsDropdown />
            </div>
            <div className="flex">
              <ProfileDropdown />
            </div>
          </div>
        </nav>
      </div>

      <AdminMenu />
    </header>
  );
};

export default TopBar;
