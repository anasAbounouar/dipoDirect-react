import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AccountsData, toggleLogin } from '../../../data/Users.ts';
import styles from './Login.module.scss';
const ways = [
  {
    text: 'Continue with Google',
    img: '/assets/login/google-logo.svg',
    alt: 'Google logo',
  },
  {
    text: 'Continue with Microsoft',
    img: '/assets/login/microsoft.svg',
    alt: 'Microsoft logo',
  },
  {
    text: 'Continue with Apple',
    img: '/assets/login/apple-logo.svg',
    alt: 'Apple logo',
  },
];

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    const user = AccountsData.find(user => {
      return user.email === email && user.password === password;
    });
    if (user) {
      toggleLogin();
      navigate('/');
      setUser(user);
    } else {
      console.log('user not correct');
    }
  };
  const navigate = useNavigate();
  return (
    <div
      id="login-page"
      className="relative flex items-center bg-myLogin min-h-screen"
    >
      {/* Background images */}
      <img
        src="/assets/login/leftDown.png"
        alt="Decorative"
        className="hidden lg:block absolute left-0 bottom-0 max-h-50"
      />
      <img
        src="/assets/login/leftUp.png"
        alt="Decorative"
        className="hidden lg:block absolute left-0 top-0 max-h-50"
      />
      <img
        src="/assets/login/rightUp.png"
        alt="Decorative"
        className="hidden lg:block absolute right-0 top-0 max-h-50"
      />
      <img
        src="/assets/login/rightDown.png"
        alt="Decorative"
        className="hidden lg:block absolute right-0 bottom-0 max-h-50"
      />

      <div className="container mx-auto z-50">
        <div className="flex p-4 items-center justify-center">
          <div className="w-full lg:w-5/12 bg-white p-5 rounded shadow  ">
            <div className="flex items-center justify-center logo my-10">
              <Link to="/">
                <img
                  className="img-fluid max-h-[60px] rounded-[4px]"
                  src="/assets/logo.png"
                  alt="Company logo"
                />
              </Link>
            </div>
            <form id="form-login">
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                placeholder="Enter your email"
                className="block w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="block w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-black"
              />
              <button
                onClick={e => {
                  e.preventDefault();
                  loginUser();
                }}
                id="login-submit"
                type="submit"
                className="bg-blue-600 text-white rounded p-3 w-full transition-colors hover:bg-blue-700"
              >
                Continue
              </button>
            </form>
            <p className="text-gray-500 my-3"> Ou </p>
            <div className="boxes">
              {ways.map((way, index) => (
                <div className={` ${styles.authenticationBox}`} key={index}>
                  <img src={way.img} alt="" className="h-5 w-5" />
                  <span className="way-text ml-2">{way.text}</span>
                </div>
              ))}
            </div>
            <div className="my-3 flex justify-center">
              <ul className="flex justify-center">
                <li className="p-1">
                  <a
                    id="resetPassword"
                    href="/login/resetpassword"
                    className="text-blue-600"
                  >
                    Can't log in?
                  </a>
                </li>
                <li>
                  <p className="font-bold">.</p>
                </li>
                <li className="p-1">
                  <a
                    id="signup"
                    className="primary-action text-blue-600"
                    href="/signup"
                  >
                    Create an account
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
