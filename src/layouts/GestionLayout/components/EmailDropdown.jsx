import { Link } from "react-router-dom";

import { LuMail } from "react-icons/lu";

const EmailDropdown = () => {
  return (
    <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
      <button
        id="hs-dropdown-with-header"
        type="button"
        className="hs-dropdown-toggle inline-flex size-9 flex-shrink-0 items-center justify-center gap-2 rounded-md align-middle font-medium text-zinc-200 transition-all duration-300 hover:bg-white/10"
      >
        <LuMail className="size-5" />
        <span className="absolute -end-0 -top-0 size-4 rounded-full bg-blueLogo text-xs font-medium text-white">
          2
        </span>
      </button>
      <div className="hs-dropdown-menu duration mt-2 hidden min-w-[20rem] rounded-lg border border-default-200 bg-white opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:bg-default-50">
        <div className="flex items-center justify-between px-4 py-3">
          <h6 className="text-base font-semibold text-default-900">Messages</h6>
          <Link
            to=""
            className="border-b border-dashed border-default-300 font-semibold text-default-800"
          >
            <small>Clear All</small>
          </Link>
        </div>
        <div className="h-52 overflow-y-auto border-y border-dashed border-default-200 py-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-default-300 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1">

        </div>
        <Link
          to=""
          className="block px-4 py-3 text-center text-sm font-medium text-blueLogo"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default EmailDropdown;
