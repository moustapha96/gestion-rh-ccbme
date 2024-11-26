import { Link } from "react-router-dom";
import { LuExternalLink } from "react-icons/lu";

const PreviewCard = ({ demo }) => {
  const { darkImage, lightImage, link, name } = demo;
  return (
    <Link to={link} target="_blank">
      <div className="relative group rounded-lg text-center transition-all duration-500 shadow-md border border-default-100 bg-white hover:-translate-y-1 dark:bg-default-50">
        <div className="p-4">
          <div className="relative rounded-lg overflow-hidden ">
            <img
              alt="demo-img"
              className="dark:hidden w-full rounded-lg border border-default-100"
              src={lightImage}
            />
            <img
              alt="demo-img"
              className="hidden dark:block w-full rounded-lg border border-default-100"
              src={darkImage}
            />
            <div className="absolute inset-0 flex items-center justify-center h-full w-full bg-default-500/20 opacity-0 transition-all duration-300 group-hover:opacity-100 cursor-pointer">
              <div className="py-1.5 ps-5 pe-2 inline-flex items-center justify-center font-semibold align-middle duration-500 text-base text-center bg-primary hover:bg-primary-600 text-white rounded-lg">
                Live Preview{" "}
                <span className="h-8 w-8 inline-flex items-center justify-center rounded-md bg-white border border-white text-primary ms-3">
                  <LuExternalLink className="h-5 w-5" />
                </span>
              </div>
            </div>
          </div>
          <h5 className="mt-4 text-lg font-medium text-default-900 text-center capitalize">
            {name}
          </h5>
        </div>
      </div>
    </Link>
  );
};

export default PreviewCard;
