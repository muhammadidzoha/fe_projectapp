import React from "react";
import { HSStaticMethods } from "preline/preline";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useAuth } from "../../hooks/auth/useAuth";

const Header = () => {
  React.useEffect(() => {
    HSStaticMethods.autoInit();
  }, []);

  const { logout, user } = useAuth();

  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-white border-b border-obito-grey text-sm py-2.5 lg:ps-65 shadow-sm">
      <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
        <div className="me-5 lg:me-0 lg:hidden">
          {/* Logo */}
          <a
            className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
            href="/"
            aria-label="Preline"
          >
            <svg
              className="w-28 h-auto"
              width="116"
              height="32"
              viewBox="0 0 116 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.5696 30.8182V11.3182H37.4474V13.7003H37.6229C37.7952 13.3187 38.0445 12.9309 38.3707 12.5369C38.7031 12.1368 39.134 11.8045 39.6634 11.5398C40.1989 11.2689 40.8636 11.1335 41.6577 11.1335C42.6918 11.1335 43.6458 11.4044 44.5199 11.946C45.3939 12.4815 46.0926 13.291 46.6158 14.3743C47.139 15.4515 47.4006 16.8026 47.4006 18.4276C47.4006 20.0095 47.1451 21.3452 46.6342 22.4347C46.1295 23.518 45.4401 24.3397 44.5661 24.8999C43.6982 25.4538 42.7256 25.7308 41.6484 25.7308C40.8852 25.7308 40.2358 25.6046 39.7003 25.3523C39.1709 25.0999 38.737 24.7829 38.3984 24.4013C38.0599 24.0135 37.8014 23.6226 37.6229 23.2287H37.5028V30.8182H33.5696ZM37.4197 18.4091C37.4197 19.2524 37.5367 19.9879 37.7706 20.6158C38.0045 21.2436 38.343 21.733 38.7862 22.0838C39.2294 22.4285 39.768 22.6009 40.402 22.6009C41.0421 22.6009 41.5838 22.4254 42.027 22.0746C42.4702 21.7176 42.8056 21.2251 43.0334 20.5973C43.2673 19.9633 43.3842 19.2339 43.3842 18.4091C43.3842 17.5904 43.2704 16.8703 43.0426 16.2486C42.8149 15.6269 42.4794 15.1406 42.0362 14.7898C41.593 14.4389 41.0483 14.2635 40.402 14.2635C39.7618 14.2635 39.2202 14.4328 38.777 14.7713C38.34 15.1098 38.0045 15.59 37.7706 16.2116C37.5367 16.8333 37.4197 17.5658 37.4197 18.4091ZM49.2427 25.5V11.3182H53.0559V13.7926H53.2037C53.4622 12.9124 53.8961 12.2476 54.5055 11.7983C55.1149 11.3428 55.8166 11.1151 56.6106 11.1151C56.8076 11.1151 57.02 11.1274 57.2477 11.152C57.4754 11.1766 57.6755 11.2105 57.8478 11.2536V14.7436C57.6632 14.6882 57.4077 14.639 57.0815 14.5959C56.7553 14.5528 56.4567 14.5312 56.1859 14.5312C55.6073 14.5312 55.0903 14.6574 54.6348 14.9098C54.1854 15.156 53.8284 15.5007 53.5638 15.9439C53.3052 16.3871 53.176 16.898 53.176 17.4766V25.5H49.2427ZM64.9043 25.777C63.4455 25.777 62.1898 25.4815 61.1373 24.8906C60.0909 24.2936 59.2845 23.4503 58.7182 22.3608C58.1519 21.2652 57.8688 19.9695 57.8688 18.4737C57.8688 17.0149 58.1519 15.7346 58.7182 14.6328C59.2845 13.531 60.0816 12.6723 61.1096 12.0568C62.1437 11.4..."
                className="fill-blue-600"
                fill="currentColor"
              />
              <path
                d="M1 29.5V16.5C1 9.87258 6.37258 4.5 13 4.5C19.6274 4.5 25 9.87258 25 16.5C25 23.1274 19.6274 28.5 13 28.5H12"
                className="stroke-blue-600"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M5 29.5V16.66C5 12.1534 8.58172 8.5 13 8.5C17.4183 8.5 21 12.1534 21 16.66C21 21.1666 17.4183 24.82 13 24.82H12"
                className="stroke-blue-600"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="13"
                cy="16.5214"
                r="5"
                className="fill-blue-600"
                fill="currentColor"
              />
            </svg>
          </a>
          {/* End Logo */}

          <div className="lg:hidden ms-1"></div>
        </div>

        <div className="w-full flex items-center justify-end ms-auto">
          <div className="flex flex-row items-center justify-end gap-2">
            {/* Search (mobile only) */}
            <button
              type="button"
              className="md:hidden size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            >
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span className="sr-only">Search</span>
            </button>

            {/* Notifikasi Bell */}
            <div className="hs-dropdown relative inline-flex">
              <button
                type="button"
                className="relative size-9.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-600 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Notifikasi"
              >
                <MdOutlineNotificationsActive size={24} />
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
              </button>

              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-80 bg-white shadow-md rounded-lg mt-2"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="hs-dropdown-custom-trigger"
              >
                <div className="py-3 px-5 bg-gray-100 rounded-t-lg">
                  <p className="text-sm font-medium text-gray-900">
                    Notifikasi
                  </p>
                </div>
                <div className="p-6 text-center text-sm text-gray-400">
                  <svg
                    className="size-10 mx-auto mb-3 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
                    />
                  </svg>
                  <p>Belum ada notifikasi</p>
                </div>
              </div>
            </div>
            {/* End Notifikasi */}

            {/* Dropdown Profil */}
            <div className="hs-dropdown relative inline-flex">
              <button
                id="hs-dropdown-custom-trigger"
                type="button"
                className="hs-dropdown-toggle py-1 ps-1 pe-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
              >
                <img
                  className="w-8 h-auto rounded-full"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Avatar"
                />
                <span className="text-gray-600 font-medium truncate max-w-30">
                  {user?.username}
                </span>
                <svg
                  className="hs-dropdown-open:rotate-180 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="hs-dropdown-custom-trigger"
              >
                <div className="py-3 px-5 bg-gray-100 rounded-t-lg">
                  <p className="text-sm text-gray-500">Masuk sebagai</p>
                  <p className="text-sm font-medium text-gray-900">
                    {user?.email}
                  </p>
                </div>
                <div className="p-1.5 space-y-0.5">
                  <div
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-900 hover:bg-red-100 hover:text-red-500 focus:outline-hidden focus:bg-gray-100 cursor-pointer"
                    onClick={() => logout()}
                  >
                    <RiLogoutCircleRLine size={16} />
                    Keluar
                  </div>
                </div>
              </div>
            </div>
            {/* End Dropdown Profil */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
