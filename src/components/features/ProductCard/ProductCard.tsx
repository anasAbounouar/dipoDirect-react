import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { useCallback, useEffect, useState } from 'react';
import { addToCart, addToWishlist } from '../../../data/CartManager';
export default function ProductCard({
  item,
  userShoppingSession,
  setUserShoppingSession,
  chosenLibrary,
  type,
  addedToWishlist,
}) {
  //   const initialQuantity = item.quantity;
  const [quantity, setQuantity] = useState<number>(0);
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);
  // In ProductCard component
  const handleQuantityChange = newQuantity => {
    if (newQuantity !== quantity) {
      // Only update if quantity actually changes
      setQuantity(newQuantity);
    }
  };
  const deleteElement = () => {
    const bookIndex = userShoppingSession[chosenLibrary][
      type
    ].purchasedBooks?.findIndex(book => {
      return book.book.id === item.book.id;
    });

    if (bookIndex !== -1) {
      const session = { ...userShoppingSession };
      session[chosenLibrary][type].purchasedBooks.splice(bookIndex, 1);
      setUserShoppingSession(session);
    }
  };

  const saveChanges = useCallback(() => {
    addToCart(
      userShoppingSession,
      setUserShoppingSession,
      chosenLibrary,
      type,
      item,
      quantity,
      false
    );
  }, [
    userShoppingSession,
    setUserShoppingSession,
    chosenLibrary,
    type,
    item,
    quantity,
  ]);

  return (
    <div
      className={`lg:w-1/2 flex-col lg:flex-row flex items-center justify-between py-2 my-2 border-b-2 border-black `}
    >
      {/* Left Column with image and likes */}
      <div className="lg:w-1/2 relative">
        {/* Heart icon for adding to wishlist */}
        <div className="relative pb-4 pt-2 flex items-center justify-between">
          <div>
            {' '}
            <button
              onClick={() =>
                addToWishlist(
                  userShoppingSession,
                  setUserShoppingSession,
                  chosenLibrary,
                  type,
                  item.book
                )
              }
              className="absolute bg-transparent  p-1 left-0 top-0 text-myHeartColor z-10 outline-none hover:border-color-none"
              aria-label={
                addedToWishlist(chosenLibrary, 'papeterie', item)
                  ? 'Remove from wishlist'
                  : 'Add to wishlist'
              }
            >
              <i
                className={`fa-regular ${
                  addedToWishlist(chosenLibrary, 'papeterie', item.book)
                    ? 'fa-solid'
                    : ''
                }
                     fa-heart text-[25px] my-heart hover:text-[28px] duration-200 `}
              ></i>
            </button>
          </div>
          <div>
            <button
              className="bg-myDanger"
              aria-aria-label="delete item"
              onClick={() => deleteElement()}
            >
              <i className="fa-solid fa-trash text-white"></i>
            </button>
          </div>
        </div>

        <div
          className="carousel-container"
          aria-roledescription="carousel"
          aria-label="Book images"
        >
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: -10,
              stretch: 10,
              depth: 250,
              modifier: 2.5,
            }}
            pagination={{
              el: '.swiper-pagination',
              clickable: true,
            }}
            // navigation={true}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper"
          >
            {item &&
              item.book &&
              item.book.imgSrc &&
              item.book?.imgSrc.map((src, index) => (
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

        {/* Carousel container with Swiper */}
      </div>
      <div className="w-7/12 lg:w-1/2  flex items-start justify-center  flex-col  lg:mx-7">
        {/* Right Column with item details */}

        <div className="title text-black  my-1 text-xl">
          {' '}
          Titre : <span className="font-bold">{item.book.title}</span>
        </div>
        <div className="level text-[#333] my-1 text-lg">
          Niveau : {item.book.level}
        </div>
        <div className="nowprice   bg-white my-1 text-lg">
          Prix :{' '}
          <span className="text-blue-600 font-bold"> {item.book.price} DH</span>
        </div>
        <span onClick={() => saveChanges()}>SKU: {item.book.id}</span>
        <span>Quantité-Max : {item.book.maxQuantity}</span>
        <span>Quantité :</span>
        <div className="flex flex-row mt-4 ">
          <button
            className={`text-lg px-3 mr-3 py-1 border rounded border-black ${
              quantity > 0 ? 'bg-white' : 'bg-gray-200 border-none'
            }`}
            onClick={() =>
              handleQuantityChange(quantity > 0 ? quantity - 1 : quantity)
            }
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          <input
            type="number"
            className="w-[55px] text-center mx-3 border-b-2 outline-none"
            value={quantity}
            onChange={e => {
              const newQuantity = parseInt(e.target.value, 10); // Parse the input value to an integer

              if (!isNaN(newQuantity)) {
                // Check if the parsed value is a number
                if (newQuantity > item.book.maxQuantity) {
                  // If entered quantity is more than max, set it to max
                  handleQuantityChange(item.book.maxQuantity);
                } else if (newQuantity < 0) {
                  // If entered quantity is less than 0, set it to 0
                  handleQuantityChange(0);
                } else {
                  // Otherwise, set it to the entered value
                  handleQuantityChange(newQuantity);
                }
              } else {
                // If entered value is not a number, set quantity to 0
                handleQuantityChange(0);
              }
            }}
            min={0}
          />

          <button
            className="text-lg px-3 ml-3 py-1 border rounded bg-white border-black flex items-center justify-center"
            onClick={() => {
              if (quantity < item.book.maxQuantity) {
                handleQuantityChange(quantity + 1);
              }
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="font-bold text-xl mt-3 w-full capitalize">
          sous-total:{' '}
          <strong className="text-myHeartColor">
            {quantity * item.book.price} DH
          </strong>
        </div>
      </div>
    </div>
  );
}
