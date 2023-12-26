import { NavLink, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import SelectComponent from '../../components/common/SelectComponent/SelectComponent';
import styles from './Items.module.scss';

// Inside your component

const livresDataArrissala = {
  library: 'Arrissala',
  name: 'livres',
  arrow: 'Livres & Histoires',
  //how many livres are chosen from this library
  cartCount: 0,
  //how many wishlist from livres in this library
  WishlistCount: 0,
  //total price of livres in this library
  totalPrice: 0,
  wishlistBooks: [],
  books: [
    {
      id: 0,
      title: 'Miftah al qirâ’a 1',
      level: '1 Bac',
      langue: 'fr',
      imgSrc: [
        '/assets/ArrissalaPhotos/1.png',
        '/assets/ArrissalaPhotos/0.png',
        '/assets/ArrissalaPhotos/0.png',
        '/assets/ArrissalaPhotos/0.png',
      ],
      price: '100',
      addedToCart: false,
      addedToWishlist: false,
      littleBooksCount: 2,
      maxQuantity: 3,
    },
    {
      id: 1,
      title: 'mousaeid',
      level: 'Moyenne',
      langue: 'en',
      imgSrc: [
        '/assets/ArrissalaPhotos/2.png',
        '/assets/ArrissalaPhotos/2.png',
        '/assets/ArrissalaPhotos/0.png',
        '/assets/ArrissalaPhotos/0.png',
      ],
      price: '100',
      addedToCart: false,
      addedToWishlist: false,
      littleBooksCount: 2,
      maxQuantity: 3,
    },
    {
      id: 2,
      title: 'Prepa',
      level: 'CM2',
      langue: 'ar',
      imgSrc: [
        '/assets/ArrissalaPhotos/0.png',
        '/assets/ArrissalaPhotos/0.png',
      ],

      price: '1028',
      addedToCart: false,
      addedToWishlist: false,
      littleBooksCount: 2,
      maxQuantity: 3,
    },
    {
      id: 3,
      title: 'Prepa',
      level: 'CM2',
      langue: 'ar',
      imgSrc: [
        '/assets/ArrissalaPhotos/0.png',
        '/assets/ArrissalaPhotos/0.png',
      ],

      price: '1028',
      addedToCart: false,
      addedToWishlist: false,
      littleBooksCount: 2,
      maxQuantity: 3,
    },
    {
      id: 4,
      title: 'Prepa',
      level: 'CM2',
      langue: 'ar',
      imgSrc: [
        '/assets/ArrissalaPhotos/0.png',
        '/assets/ArrissalaPhotos/0.png',
      ],

      price: '1028',
      addedToCart: false,
      addedToWishlist: false,
      littleBooksCount: 2,
      maxQuantity: 3,
    },
  ],
  purchasedBooks: [],
};

export default function Items() {
  const navigate = useNavigate();

  const { type, chosenLibrary } = useParams();

  const typeOptions = [
    { label: 'Ecriture', value: 'Ecritures', id: 0 },
    {
      label: 'Organisation',
      value: 'Organisations',
      id: 1,
    },
    {
      label: 'Papeterie',
      value: 'papeterie',
      id: 2,
    },
  ];
  const [selectType, setSelectType] = useState<string | undefined>(type); // Set state with type

  useEffect(() => {
    // Update the selectType when the URL parameter changes
    setSelectType(type);
  }, [type]); // Dependency array to re-run this effect when 'type' changes

  const handleChange = (newValue: string) => {
    // Construct the new path by replacing the last part of the URL
    const newPath = `/library-intro/${chosenLibrary}/${newValue}`;
    navigate(newPath);
  };
  const itemsData = livresDataArrissala.books;
  // filter bye search term
  const [searchBooksInput, setSearchBooksInput] = useState('');
  function filterBySearchTerm() {
    if (!searchBooksInput) {
      return itemsData; // No filter applied
    } else {
      const filtering = new RegExp(searchBooksInput, 'ig');
      return itemsData.filter(item => item.title.match(filtering));
    }
  }

  return (
    <div className={`py-5  bg-myContent`}>
      {/* Header section with navigation and type selection */}
      <div className="flex flex-row items-center justify-end flex-wrap ">
        <div className="w-full lg:w-1/2 py-3 lg:py-0">
          <NavLink
            to={`/library-intro/${chosenLibrary}`}
            className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            aria-label={`Navigate to ${chosenLibrary} library introduction`}
          >
            {chosenLibrary}
          </NavLink>
          {/* Use an aria-hidden arrow for visual users, but it's hidden from screen readers */}
          <span aria-hidden="true" className="mx-2">
            ➡️
          </span>
          <span className="text-gray-500">{type}</span>
        </div>
        <div className="w-full lg:w-1/2 py-3">
          <SelectComponent
            options={typeOptions}
            onChange={handleChange}
            selectedOption={selectType}
            setSelectedOption={setSelectType}
          />
        </div>
        <form
          action=""
          className="w-full lg:w-1/2 flex items-center justify-center my-6 lg:my-0"
        >
          <input
            value={searchBooksInput}
            onChange={e => setSearchBooksInput(e.target.value)}
            className="w-[320px] border-myBrand rounded-md"
            type="text"
            placeholder="Cherchez votre livre ici"
            aria-label="Search books" // Accessible label for the search input
          />
        </form>
      </div>
      {/* Books display section */}
      <div className="flex flex-row flex-wrap items-center gap-3 justify-center mt-4">
        {filterBySearchTerm().map(item => (
          <div
            className={`w-5/12 lg:w-2/12 m-1 bg-white ${styles.itemBox}`}
            key={item.id}
          >
            <div className="px-1">
              {/* icon of heart  */}
              <div className="relative pb-4 pt-2 ">
                {/* wishlist icon  */}
                {/* <div className="absolute">
                  {item.addedToWishlist ? (
                    <i className="fa-solid fa-heart z-50 text-myHeartColor  text-[25px] my-heart"></i>
                  ) : (
                    <i className="fa-regular fa-heart z-50 text-myHeartColor text-[25px]  my-heart"></i>
                  )}
                </div> */}
                <button
                  onClick={() => {
                    /* handle wishlist toggle */
                  }}
                  className="absolute z-50 bg-transparent p-1 left-0 top-0 text-myHeartColor"
                  aria-label={
                    item.addedToWishlist
                      ? 'Remove from wishlist'
                      : 'Add to wishlist'
                  }
                >
                  {item.addedToWishlist ? (
                    <i className="fa-solid fa-heart  text-[25px] my-heart"></i>
                  ) : (
                    <i className="fa-regular fa-heart  text-[25px] my-heart"></i>
                  )}
                </button>
              </div>

              <div className="carousel-container">
                <Swiper
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  loop={true}
                  slidesPerView={1}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                  }}
                  pagination={{ el: '.swiper-pagination', clickable: true }}
                  // navigation={true}
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                  modules={[EffectCoverflow, Pagination, Navigation]}
                  className="mySwiper"
                >
                  {item.imgSrc.map((element, index) => (
                    <SwiperSlide key={`${item.id}-${index}`}>
                      <img
                        src={element}
                        alt={`${item.title} - Slide ${index + 1}`}
                        className="mt-3 overflow-hidden border border-solid !border-black rounded-lg "
                      />
                    </SwiperSlide>
                  ))}

                  <div className="slider-controller flex justify-between items-center">
                    <div className="swiper-button-prev slider-arrow cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full p-2 !h-[44px] !w-[44px]">
                      <i className="fa-solid fa-angles-right rotate-180 text-3xl text-gray-800"></i>
                    </div>
                    <div className="swiper-pagination"></div>{' '}
                    {/* Unstyled, add your classes */}
                    <div className="swiper-button-next slider-arrow cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full p- !h-[44px] !w-[44px]">
                      <i className="fa-solid fa-angles-right text-3xl text-gray-800"></i>
                    </div>
                  </div>
                </Swiper>
              </div>
              <div className="down-actions my-3 flex flex-col items-center justify-center">
                <div className="flex items-center flex-col descriptionPanier">
                  <div className="level text-[#777]">{item.level}</div>
                  <div className="title">{item.title}</div>
                  <div className="nowprice text-myBrand">{item.price} DH</div>
                </div>
                <div className="flex items-center p-2 justify-between actionPanier gap-3 ">
                  <button
                    className="btn btn-primary  bg-myBrand ajouter"
                    // @click.prevent="addToCart(book, 1)"
                    // :class="{
                    //   addedToCartClass: book.addedToCart == true,
                    // }"
                  >
                    <p className="p-0 m-0 text-[14px] text-white">
                      {item.addedToCart == true
                        ? 'Bien ajouté'
                        : '+ Ajouter au panier'}
                    </p>
                  </button>
                  <button className="btn btn-primary apercu hidden lg:flex items-center h-10 justify-center bg-yellow-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 36 36"
                      fill="none"
                    >
                      <path
                        d="M23.5498 21.3L31.0498 28.8L28.7998 31.05L21.2998 23.55V22.365L20.8948 21.945C19.1308 23.4658 16.8788 24.3016 14.5498 24.3C11.9639 24.3 9.48399 23.2728 7.65551 21.4443C5.82703 19.6158 4.7998 17.1358 4.7998 14.55C4.7998 11.9641 5.82703 9.48418 7.65551 7.6557C9.48399 5.82722 11.9639 4.79999 14.5498 4.79999C17.1357 4.79999 19.6156 5.82722 21.4441 7.6557C23.2726 9.48418 24.2998 11.9641 24.2998 14.55C24.2998 16.965 23.4148 19.185 21.9448 20.895L22.3648 21.3H23.5498ZM14.5498 21.3C18.2998 21.3 21.2998 18.3 21.2998 14.55C21.2998 10.8 18.2998 7.79999 14.5498 7.79999C10.7998 7.79999 7.7998 10.8 7.7998 14.55C7.7998 18.3 10.7998 21.3 14.5498 21.3ZM18.2998 15.3H15.2998V18.3H13.7998V15.3H10.7998V13.8H13.7998V10.8H15.2998V13.8H18.2998V15.3Z"
                        fill="green"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
