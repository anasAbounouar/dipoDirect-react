import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { memo } from 'react';
import styles from './ItemCard.module.scss';
const card = {
  borderRadius: '10px',
  background: 'white',
  boxShadow: '0px 2.423px 2.423px 0px rgba(0, 0, 0, 0.25)',
};
const ItemCard = memo(
  ({
    item,
    heartIconClass,
    onWishlistToggle,
    onAddToCart,
    addedToCart,
    addedToWishlist,
  }) => {
    return (
      <div
        className={`w-5/12 lg:w-2/12 m-1 bg-white ${styles.itemCard}`}
        style={card}
      >
        <div className="px-1">
          {/* Heart icon for adding to wishlist */}
          <div className="relative pb-4 pt-2">
            <button
              onClick={onWishlistToggle}
              className="absolute z-50 bg-transparent  p-1 left-0 top-0 text-myHeartColor outline-none hover:border-color-none"
              aria-label={
                addedToWishlist ? 'Remove from wishlist' : 'Add to wishlist'
              }
            >
              <i
                className={`${heartIconClass} fa-heart text-[25px] my-heart hover:text-[28px] duration-200`}
              ></i>
            </button>
          </div>

          {/* Carousel container with Swiper */}
          <div className="carousel-container">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 0,
                stretch: 10,
                depth: 200,
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
              {item.imgSrc.map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={src}
                    alt={`${item.title} image - Slide ${index + 1}`}
                    className="mt-3 overflow-hidden border lg:border-solid !border-black rounded-lg px-1 lg:p-0"
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
            {/* Description Panel */}
            <div className="flex items-center flex-col descriptionPanier">
              <div className="level text-[#333]">{item.level}</div>
              <div className="title text-black font-[600]">{item.title}</div>
              <div className="nowprice text-blue-600 font-bold bg-white">
                {item.price} DH
              </div>
            </div>

            {/* Action Panel */}
            <div className="flex items-center p-2 justify-between actionPanier gap-3">
              <button
                onClick={onAddToCart}
                className={`btn addToCartBtn    bg-[#004494]    text-white  ajouter ${
                  addedToCart ? 'addedToCartClass' : ''
                }  ${addedToCart ? 'bg-myBrand' : ''}`}
                aria-pressed={addedToCart} // Indicates the state of the button
              >
                <span className="sr-only">
                  {addedToCart
                    ? 'Item has been added to the cart'
                    : 'Add item to the cart'}
                </span>
                <span aria-hidden="true" className={`text-white `}>
                  {/* Visually hidden text for screen readers */}
                  {addedToCart ? (
                    'Bien ajouté ✓'
                  ) : (
                    <span>
                      + Ajouter au panier{' '}
                      <i className="fa fa-shopping-cart"></i>
                    </span>
                  )}
                </span>
              </button>

              {/* Replace with your actual preview functionality */}
              {/* <button
                tabIndex={-1}
                className="btn btn-primary apercu hidden lg:flex items-center h-10 justify-center bg-yellow-200"
                aria-hidden="true"
              >
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
              </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
export default ItemCard;
