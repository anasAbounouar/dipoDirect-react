import './App.css';
import '../tailwind.css';
import '../src/components/features/SideFilter/SideFilter.module.scss';
import '../src/styles/normalize.scss';
import '../src/styles/main.scss';
import '../src/styles/variables.scss';
import '../src/styles/all.min.css';
import Footer from './components/layout/Footer/Footer';
import Navbar from './components/layout/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import 'flowbite';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';
import LibraryIntro from './pages/LibraryIntro/LibraryIntro';
import Items from './pages/Items/Items';
import NotFound from './pages/NotFound/NotFound';
import LoginPage from './pages/Accounts/Login/Login';
import About from './pages/About/About';
import { useEffect, useState } from 'react';
import MobileNavigationBar from './components/layout/MobileNavigationBar/MobileNavigationBar';
import { useMediaQuery } from 'react-responsive';
import Item from './pages/Item/Item';

type Book = {
  id: number;
  title: string;
  level: string;
  imgSrc: string[];
  price: string; // or number if you want to store it as a numerical value
  addedToCart: boolean;
  addedToWishlist: boolean;
  littleBooksCount: number;
  maxQuantity: number;
};
// Define the structure of a category like 'ecritures', 'papeterie', or 'organisation'
type Category = {
  totalPrice: number;
  wishlistBooks: Book[]; // assuming wishlistBooks is an array of Books
  purchasedBooks: Book[]; // assuming purchasedBooks is an array of Books
};

// Define the structure of a library like 'arrissala' or 'aladnane'
type Library = {
  ecritures: Category;
  papeterie: Category;
  organisation: Category;
};

// Define the structure of the entire userShoppingSession
type UserShoppingSession = {
  arrissala: Library;
  aladnane: Library;
  // ... add more libraries if necessary
};
function App() {
  const isSmallScreen = useMediaQuery({ maxWidth: 1024 });
  const [userShoppingSession, setUserShoppingSession] =
    useState<UserShoppingSession>({
      arrissala: {
        ecritures: {
          totalPrice: 0,
          wishlistBooks: [],
          purchasedBooks: [],
        },
        papeterie: {
          totalPrice: 0,
          wishlistBooks: [],
          purchasedBooks: [],
        },
        organisation: {
          totalPrice: 0,
          wishlistBooks: [],
          purchasedBooks: [],
        },
      },
      aladnane: {
        ecritures: {
          totalPrice: 0,
          wishlistBooks: [],
          purchasedBooks: [],
        },
        papeterie: {
          totalPrice: 0,
          wishlistBooks: [],
          purchasedBooks: [],
        },
        organisation: {
          totalPrice: 0,
          wishlistBooks: [],
          purchasedBooks: [],
        },
      },
    });

  const categories = ['papeterie', 'ecritures', 'organisation'];

  const wishlistTotalCount = Object.keys(userShoppingSession).reduce(
    (totalLibraryCount, library) => {
      const libraryCount = categories.reduce((totalCategoryCount, category) => {
        const categoryWishlist =
          userShoppingSession[library][category]?.wishlistBooks;
        return (
          totalCategoryCount + (categoryWishlist ? categoryWishlist.length : 0)
        );
      }, 0);

      return totalLibraryCount + libraryCount;
    },
    0
  );
  // Calculating total count of items in the cart across all libraries and categories
  const cartTotalCount = Object.keys(userShoppingSession).reduce(
    (totalLibraryCount, library) => {
      const libraryCount = categories.reduce((totalCategoryCount, category) => {
        const categoryCart =
          userShoppingSession[library][category]?.purchasedBooks;
        return totalCategoryCount + (categoryCart ? categoryCart.length : 0);
      }, 0);

      return totalLibraryCount + libraryCount;
    },
    0
  );
  const [user, setUser] = useState(null);
  //sidebar configurations
  const [isSideBarActive, setIsSideBarActive] = useState(false);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route index path="/about" element={<About />} />
        <Route path="library-intro/:chosenLibrary" element={<LibraryIntro />} />
        <Route
          path="library-intro/:chosenLibrary/:type"
          element={
            <Items
              userShoppingSession={userShoppingSession}
              setUserShoppingSession={setUserShoppingSession}
              isSideBarActive={isSideBarActive}
              setIsSideBarActive={setIsSideBarActive}
            />
          }
        />
        <Route
          path="library-intro/:chosenLibrary/:type/:bookId"
          element={
            <Item
              userShoppingSession={userShoppingSession}
              setUserShoppingSession={setUserShoppingSession}
            />
          }
        />
        <Route path="login" element={<LoginPage setUser={setUser} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isSmallScreen && (
        <MobileNavigationBar
          user={user}
          userShoppingSession={userShoppingSession}
          wishlistTotalCount={wishlistTotalCount}
          cartTotalCount={cartTotalCount}
          isSideBarActive={isSideBarActive}
          setIsSideBarActive={setIsSideBarActive}
        />
      )}
      <Footer />
    </Router>
  );
}
export default App;
