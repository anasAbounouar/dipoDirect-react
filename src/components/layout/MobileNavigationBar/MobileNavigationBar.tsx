import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

const MobileNavigationBar = ({
  userShoppingSession,
  wishlistTotalCount,
  cartTotalCount,
  user,
}) => {
  
  return (
    <div className="fixed bottom-0 w-full bg-gray-200 flex justify-around z-50 p-4">
      <ul className="flex justify-around w-full items-center">
        {/* Wishlist Link */}
        <li className="nav-item">
          <Link
            to="#"
            className="nav-link relative flex items-center justify-center"
          >
            <div className="wishlist-counter absolute bottom-5 left-5  w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-sm">
              {wishlistTotalCount}
            </div>
            <i
              className={`text-myHeartColor text-[32px] fa${
                wishlistTotalCount === 0 ? 'r' : 's'
              } fa-heart  text-gray-600`}
              aria-label="Wishlist"
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
              className="nav-link flex items-center justify-center"
            >
              <i
                className="far fa-user text-[32px] text-gray-600"
                aria-label="User Login"
              ></i>
            </Link>
          </li>
        )}

        {/* Cart Link */}
        <li className="nav-item">
          <Link
            to="/Cart"
            className="nav-link relative flex items-center justify-center"
          >
            <div className="shop-counter absolute bottom-5 left-5  w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
              {cartTotalCount}
            </div>
            <i
              className="fas fa-cart-shopping text-[32px] text-blue-600"
              aria-label="Shopping Cart"
            ></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNavigationBar;
