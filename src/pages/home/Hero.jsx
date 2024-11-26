import logoSm from "@/assets/images/logo-sm.png";
import { Link } from "react-router-dom";
import { LuAirplay, LuEye } from "react-icons/lu";

import backgroundLine2 from "@/assets/images/other/bg-lines-2.png";
import backgroundLine2Dark from "@/assets/images/other/bg-lines-2-dark.png";

import { developmentTools } from "./data";
import { useLayoutContext } from "@/context";

const Hero = () => {
  const { themeMode } = useLayoutContext();
  return (
    <section
      className="bg-default-10 relative border-b border-default-100  py-6 dark:bg-default-50 sm:py-10 md:py-32"
      style={{
        backgroundImage: `url(${themeMode === "light" ? backgroundLine2 : backgroundLine2Dark
          })`,
      }}
      id="home"
    >
      <div className="px-6 sm:px-10 md:px-20">
        <div className="grid items-center gap-x-6 gap-y-10">
          <div className="mb-10 mt-12 flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="mb-4 flex items-center justify-center gap-4">
                <span className="h-10">
                  <img
                    src={logoSm}
                    alt="images"
                    className="h-full max-w-full"
                  />
                </span>
                <span className="inline-block rounded-md bg-primary/10 px-4 text-base/loose font-semibold text-primary">
                  v1.0.0
                </span>
              </div>
              <h1 className="mb-6 text-3xl font-semibold capitalize text-default-950 sm:text-5xl/tight">
                <span className="text-primary">AuthenticPage</span> - One Page
                Template
              </h1>
              <p className="mx-auto max-w-3xl text-base text-default-700">
                The Make your website or web application perfect starting point
                for your next project and the ultimate resource for learning how
                experts build real websites with Tailwind CSS.
              </p>
            </div>
            <div className="my-16 text-center">
              <p className="text-xl font-medium text-default-900">
                Technology stack
              </p>
              <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-3">
                {developmentTools.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="hs-tooltip inline-block [--trigger:hover] [--placement:top]"
                    >
                      <div className="hs-tooltip-toggle w-14 h-14 flex justify-center items-center rounded-lg bg-default-100">
                        <img src={item.logo} className="w-8 h-8" />
                      </div>
                      <div
                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible transition-opacity opacity-0 relative px-3 py-1 rounded bg-default-950 text-default-200 font-semibold z-50 hidden"
                        role="tooltip"
                        data-popper-placement="top"
                      >
                        {item.name}
                        <div className="bg-default-950 w-2.5 h-2.5 rotate-45 absolute -bottom-1 start-1/2 -translate-x-1/2 -z-10 rounded-[1px]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#demos"
                className="inline-flex items-center justify-center px-6 py-2 font-semibold backdrop-blur-2xl bg-primary text-white rounded-lg transition-all duration-500 hover:bg-primary-600"
              >
                {" "}
                Landing Demos <LuEye className="h-5 w-5 ms-3" />
              </a>
              <Link
                to="/admin/dashboard"
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-2 font-semibold backdrop-blur-2xl bg-primary/20 text-primary rounded-lg transition-all duration-500 hover:bg-primary hover:text-white"
              >
                {" "}
                Admin Demos <LuAirplay className="h-5 w-5 ms-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
