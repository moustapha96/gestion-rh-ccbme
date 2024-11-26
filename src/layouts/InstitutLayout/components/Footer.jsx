import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t border-default-200 bg-white py-4 dark:bg-default-50">
      <div className="container">
        <div className="grid items-center gap-6 lg:grid-cols-2">
          <p className="text-center text-default-900 lg:text-start">
            {new Date().getFullYear()} © &nbsp;
            {/* <span className="text-red-500">❤️</span> by&nbsp; */}
            <Link
              className="text-blueLogo text-bold text-xl"
              to="https://authenticpage.com/"
              target="_blank"
            >
              <span className="text-blueLogo" >Authentic</span><span className="text-rougeLogo" >Page</span>
            </Link>
          </p>
          <div className="hidden justify-center gap-6 text-center lg:flex lg:justify-end">
            <Link to="" className="font-medium text-default-500">
              Conditions générales
            </Link>
            <Link to="" className="font-medium text-default-500">
              Confidentialité
            </Link>
            <Link to="" className="font-medium text-default-500">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
