import { Button } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.scss';
export default function Navbar({ user, setUser }) {
  const wtspImage = '/assets/wtsp.svg';
  const [isClicked, setIsClicked] = useState(false);
  // useEffect that triggers when `isClicked` changes.
  useEffect(() => {
    // when isClicked becomes true, the navbar should close
    if (isClicked) {
      const closeButton = document.querySelector(
        '#navbar-toggle'
      ) as HTMLButtonElement;
      closeButton.click();
    }
  }, [isClicked]); // Only re-run the effect if isClicked changes

  return (
    <div>
      <nav
        className={`${styles.nav} bg-white sticky top-0  border-gray-200 dark:bg-gray-900 custom-shadow `}
        aria-label="Main Navigation"
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={'/assets/logo.png'}
              alt="DipoDirect logo"
              className="h-8 rounded-lg "
            />

            <span
              onClick={() => setIsClicked(true)}
              className="self-center text-2xl font-semibold whitespace-nowrap text-myBrand hover:text-blue-400 delay-100 "
            >
              DipoDirect
            </span>
          </NavLink>
          <button
            onClick={() => setIsClicked(false)}
            id="navbar-toggle"
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto absolute md:static top-[56px] left-0"
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100  bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  onClick={() => setIsClicked(true)}
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-myBrand !text-white md:!text-myBrand block py-2 px-3 rounded md:bg-transparent md:p-0 '
                      : 'block py-2 px-3 rounded md:bg-transparent  md:p-0'
                  }
                >
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setIsClicked(true)}
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-myBrand !text-white md:!text-myBrand block py-2 px-3 rounded md:bg-transparent md:p-0 '
                      : 'block py-2 px-3 rounded md:bg-transparent  md:p-0'
                  }
                >
                  À propos
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setIsClicked(true)}
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-myBrand !text-white md:!text-myBrand block py-2 px-3 rounded md:bg-transparent md:p-0 '
                      : 'block py-2 px-3 rounded md:bg-transparent  md:p-0'
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                {user ? (
                  <NavLink
                    onClick={() => {
                      setIsClicked(true);
                      localStorage.removeItem('user');
                      setUser(null);
                    }}
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? 'bg-myBrand !text-white md:!text-myBrand block py-2 px-3 rounded md:bg-transparent md:p-0 '
                        : 'block py-2 px-3 rounded md:bg-transparent  md:p-0'
                    }
                  >
                    Se deconnecter
                  </NavLink>
                ) : (
                  <NavLink
                    onClick={() => setIsClicked(true)}
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? 'bg-myBrand !text-white md:!text-myBrand block py-2 px-3 rounded md:bg-transparent md:p-0 '
                        : 'block py-2 px-3 rounded md:bg-transparent  md:p-0'
                    }
                  >
                    S'identifier
                  </NavLink>
                )}
              </li>
              <li>
                <a
                  onClick={() => setIsClicked(true)}
                  href="https://wa.me/212688698494"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" flex justify-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-label="Contact via WhatsApp"
                >
                  <img src={wtspImage} alt="Wtsp icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
function toggleNabbar() {
  ele = document.querySelector(Button);
  ele.click();
}
