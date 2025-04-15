import { Link } from "react-router-dom";
import logo_ccbm from "@/assets/logo.png";
const Footer = () => {
  return (
    <footer className="w-full border-t border-default-200 bg-white py-4 dark:bg-default-50">
      <div className="container">
        <div className="grid items-center gap-6 lg:grid-cols-2">
          <p className="text-center text-default-900 lg:text-start">

            {/* <span className="text-red-500">❤️</span> by&nbsp; */}
            <Link
              className="text-blueLogo text-bold"
              to="https://ccbme.sn/"
              target="_blank"
            >
              {/* {new Date().getFullYear()} © &nbsp; */}
              <img src={logo_ccbm} className=" h-12" alt="images" />

            </Link>
          </p>
          {/* <div className="hidden justify-center gap-6 text-center lg:flex lg:justify-end">
            <Link to="" className="font-medium text-default-500">
              Conditions générales
            </Link>
            <Link to="" className="font-medium text-default-500">
              Confidentialité
            </Link>
            <Link to="" className="font-medium text-default-500">
              Cookies
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
