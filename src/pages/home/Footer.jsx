import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative border-t border-default-200">
      <div className="container relative">
        <p className="py-6 text-center font-medium text-default-900">
          {new Date().getFullYear()} © &nbsp;
          <Link
            className="text-primary-700"
            to="https://authenticpage.com/"
            target="_blank"
          >
            AuthenticPage
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
