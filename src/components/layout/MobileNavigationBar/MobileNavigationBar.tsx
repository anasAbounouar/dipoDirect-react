import { Link, useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';

const routesWithEqualizeAllowed = [
  '/library-intro/arrissala/papeterie',
  '/library-intro/aladnane/papeterie',
];

const MobileNavigationBar = ({
  userShoppingSession,
  wishlistTotalCount,
  cartTotalCount,
  user,
  isSideBarActive,
  setIsSideBarActive,
}) => {
  const location = useLocation();

  const shouldShowEqualize = () => {
    return routesWithEqualizeAllowed.includes(location.pathname);
  };
  return (
    <nav
      className="fixed bottom-0 w-full bg-gray-200 flex justify-around z-50 p-4"
      aria-label="Mobile navigation"
    >
      <ul className="flex justify-between mx-2 w-full items-center">
        {/* Wishlist Link */}
        <li className="nav-item">
          <Link
            to="/wishlist" // Assuming you have a wishlist route
            className="nav-link relative flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label={`Wishlist. ${wishlistTotalCount} items`}
          >
            <div className="wishlist-counter absolute bottom-5 left-5  w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-sm">
              {wishlistTotalCount}
            </div>
            <i
              className={`text-myHeartColor text-[32px] fa${
                wishlistTotalCount === 0 ? 'r' : 's'
              } fa-heart  text-gray-600`}
            ></i>
          </Link>
        </li>

        {/* User Account/Login */}
        {user ? (
          <li className="nav-item avatar flex items-center justify-center mt-1.5">
            <img
              src={user?.imgSrc}
              alt="User avatar"
              className="rounded-full max-w-10"
            />
          </li>
        ) : (
          <li className="nav-item">
            <Link
              to="/login"
              className="nav-link flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="User Login"
            >
              <i className="far fa-user text-[32px] text-gray-600"></i>
            </Link>
          </li>
        )}
        {/* sidefilter toggle  */}
        {shouldShowEqualize() && (
          <li
            className="nav-item"
            onClick={() => setIsSideBarActive(!isSideBarActive)}
          >
            <button
              onClick={() => setIsSideBarActive(!isSideBarActive)}
              className={`nav-link ${
                isSideBarActive ? 'bg-white' : 'bg-transparent'
              }`}
              aria-label={`Toggle sidebar  to ${
                !isSideBarActive ? 'open' : 'close'
              }`}
              aria-expanded={isSideBarActive}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M13.125 3.75V3.28125C13.124 2.90859 12.9755 2.55148 12.712 2.28797C12.4485 2.02447 12.0914 1.87599 11.7188 1.875H7.03125C6.65859 1.87599 6.30148 2.02447 6.03797 2.28797C5.77447 2.55148 5.62599 2.90859 5.625 3.28125V3.75H0V7.5H5.625V7.96875C5.625 8.74125 6.25688 9.375 7.03125 9.375H11.7188C12.4913 9.375 13.125 8.74125 13.125 7.96875V7.5H30V3.75H13.125ZM7.5 7.5V3.75H11.25V7.5H7.5ZM24.375 12.6562C24.3735 12.2837 24.2249 11.9269 23.9615 11.6635C23.6981 11.4001 23.3413 11.2515 22.9688 11.25H18.2812C17.9087 11.2515 17.5519 11.4001 17.2885 11.6635C17.0251 11.9269 16.8765 12.2837 16.875 12.6562V13.125H0V16.875H16.875V17.3438C16.875 18.1162 17.5088 18.75 18.2812 18.75H22.9688C23.7412 18.75 24.375 18.1162 24.375 17.3438V16.875H30V13.125H24.375V12.6562ZM18.75 16.875V13.125H22.5V16.875H18.75ZM13.125 22.0312C13.1235 21.6587 12.9749 21.3019 12.7115 21.0385C12.4481 20.7751 12.0913 20.6265 11.7188 20.625H7.03125C6.65859 20.626 6.30148 20.7745 6.03797 21.038C5.77447 21.3015 5.62599 21.6586 5.625 22.0312V22.5H0V26.25H5.625V26.7188C5.625 27.4912 6.25688 28.125 7.03125 28.125H11.7188C12.4913 28.125 13.125 27.4912 13.125 26.7188V26.25H30V22.5H13.125V22.0312ZM7.5 26.25V22.5H11.25V26.25H7.5Z"
                  fill="black"
                />
              </svg>
            </button>
          </li>
        )}

        {/* Cart Link */}
        <li className="nav-item">
          <Link
            to="/cart"
            className="nav-link relative flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label={`Shopping Cart. ${cartTotalCount} items`}
          >
            <div className="shop-counter absolute bottom-5 left-5  w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
              {cartTotalCount}
            </div>
            <i className="fas fa-cart-shopping text-[32px] text-blue-600"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigationBar;
