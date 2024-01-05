import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

const MobileNavigationBar = ({ wishlistCount, cartCount }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Replace with actual logic
  const [user, setUser] = React.useState(null); // Replace with actual logic

  return (
    <div className="fixed bottom-0 w-full bg-gray-200 flex justify-around z-50 p-4">
      <ul className="flex justify-around w-full">
        {/* Wishlist Link */}
        <li className="nav-item">
          <Link
            to="#"
            className="nav-link p-relative flex items-center justify-center"
          >
            <div className="wishlist-counter absolute top-1 right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm">
              {wishlistCount}
            </div>
            <i
              className={`fa${
                wishlistCount === 0 ? 'r' : 's'
              } fa-heart text-xl text-gray-600`}
              aria-label="Wishlist"
            ></i>
          </Link>
        </li>

        {/* User Account/Login */}
        {isLoggedIn ? (
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
                className="far fa-user text-xl text-gray-600"
                aria-label="User Login"
              ></i>
            </Link>
          </li>
        )}

        {/* Cart Link */}
        <li className="nav-item">
          <Link
            to="/Cart"
            className="nav-link p-relative flex items-center justify-center"
          >
            <div className="shop-counter absolute top-1 right-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-sm">
              {cartCount}
            </div>
            <i
              className="fas fa-cart-shopping text-xl text-blue-600"
              aria-label="Shopping Cart"
            ></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

MobileNavigationBar.propTypes = {
  wishlistCount: PropTypes.number.isRequired,
  cartCount: PropTypes.number.isRequired,
};

export default MobileNavigationBar;
