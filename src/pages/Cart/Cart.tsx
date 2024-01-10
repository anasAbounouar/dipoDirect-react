import MyButton from '../../components/common/MyButton/MyButton';
import { addToWishlist, addToCart } from '../../data/CartManager';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { useState } from 'react';
import ProductCard from '../../components/features/ProductCard/ProductCard';
import { useNavigate } from 'react-router-dom';

export default function Cart({ userShoppingSession, setUserShoppingSession }) {
  const findFirstPurchasedSupplier = () => {
    for (const supplier of Object.keys(userShoppingSession)) {
      for (const type of Object.keys(userShoppingSession[supplier])) {
        if (userShoppingSession[supplier][type].purchasedBooks.length > 0) {
          return supplier;
        }
      }
    }
    return null;
  };
  const Navigate = useNavigate();

  const PurchasedBooksInCategory = (supplier, category) => {
    if (supplier && category && userShoppingSession[supplier][category]) {
      return userShoppingSession[supplier][category].purchasedBooks;
    }
    return [];
  };

  // Usage
  const purchasedFromSupplier = findFirstPurchasedSupplier();
  const papeterieItems = PurchasedBooksInCategory(
    purchasedFromSupplier,
    'papeterie'
  );

  const ecrituresItems = PurchasedBooksInCategory(
    purchasedFromSupplier,
    'ecritures'
  );
  const organisationItems = PurchasedBooksInCategory(
    purchasedFromSupplier,
    'organisation'
  );
  const [types, setTypes] = useState([
    {
      name: 'papeterie',
      items: papeterieItems,
      color: 'myBrand',
      displayed: true,
    },
    {
      name: 'ecritures',
      items: ecrituresItems,
      color: 'myIndigo',
      displayed: true,
    },
    { name: 'organisation', items: organisationItems, displayed: true },
  ]);
  const calculatePrice = array => {
    return array.reduce((total, item) => {
      const price = parseFloat(item.book.price);
      const quantity = item.quantity;
      return total + price * quantity;
    }, 0);
  };
  const totalPrice = types
    .map(type => calculatePrice(type.items))
    .reduce((total, item) => total + item, 0);
  const toggleDisplay = typeName => {
    setTypes(
      types.map(type =>
        type.name === typeName ? { ...type, displayed: !type.displayed } : type
      )
    );
  };
  const addedToWishlist = (chosenLibrary, type, item) => {
    const bookIndex = userShoppingSession[chosenLibrary][
      type
    ].wishlistBooks.findIndex(book => book.id === item.id);
    if (bookIndex !== -1) {
      return true;
    }
    return false;
  };

  const [isPapeterieDisplayed, setIsPapeterirDisplayed] = useState(true);
  const [isEcrituresDisplayed, setIsEcrituresDisplayed] = useState(true);
  const [isOrganisationDisplayed, setIsOrganisationDisplayed] = useState(true);

  return (
    <div>
      <div className="my-3 p-3">
        <span className="text-xl    ">Fournisseur</span> :{' '}
        <strong className="mx-1 capitalize text-xl">
          {' '}
          {purchasedFromSupplier || 'Arrissala'}
        </strong>
      </div>
      <div className="flex flex-col lg:flex-row mx-4 lg:mx-11 justify-around  items-baseline lg:items-center">
        <ul className="flex flex-row items-center justify-center py-3">
          <li className="mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clip-path="url(#clip0_1824_17420)">
                <path
                  d="M9.89314 0.0718384C6.70341 0.0718384 4.08936 2.67806 4.08936 5.85899C4.08936 7.09148 4.48302 8.23697 5.14922 9.17841L9.18481 16.1549C9.74995 16.8933 10.1257 16.753 10.5956 16.1159L15.0469 8.5411C15.1367 8.3784 15.2073 8.20517 15.2687 8.02824C15.5512 7.33991 15.6964 6.60302 15.6963 5.85899C15.6965 2.67806 13.0833 0.0718384 9.89314 0.0718384ZM9.89314 2.78341C11.611 2.78341 12.9769 4.14621 12.9769 5.85899C12.9769 7.57176 11.611 8.93398 9.89314 8.93398C8.17547 8.93398 6.80895 7.57196 6.80895 5.85899C6.80895 4.14621 8.17547 2.7836 9.89314 2.7836V2.78341Z"
                  fill="#2196F3"
                />
                <path
                  d="M13.5823 9.61273L13.5718 9.64035C13.5751 9.63202 13.5777 9.62347 13.581 9.61514L13.5823 9.61273Z"
                  fill="#2196F3"
                />
                <path
                  d="M12.5913 14.3815L12.3215 14.7151C12.6863 14.7592 13.0394 14.8109 13.37 14.8735L12.3012 15.1901L13.7278 15.5695L14.7912 15.2342C15.4443 15.4533 16.3487 15.7211 16.6483 16.0256H14.5161L14.728 16.6452H16.9406C16.9339 16.9944 16.3097 17.278 15.7135 17.5078L14.2015 17.1809L12.7768 17.6914L14.2984 18.0386C13.41 18.2805 11.9185 18.4276 10.6836 18.4953L10.6317 17.7852H9.14796L9.09587 18.4953C7.86103 18.4276 6.36965 18.2807 5.48107 18.0388L7.00288 17.6914L5.57822 17.1809L4.06597 17.5078C3.47839 17.3293 2.84575 16.9944 2.83912 16.6452H5.0519L5.26375 16.0256H3.13154C3.43118 15.7211 4.33557 15.4533 4.98869 15.2342L6.05206 15.5695L7.47867 15.1901L6.40984 14.8735C6.75501 14.8097 7.10217 14.7572 7.45078 14.7161L7.18488 14.3819C4.30065 14.6818 1.90352 15.3202 1.27498 16.3286C0.272473 17.9356 3.97077 19.5522 9.76694 19.5774C9.85317 19.5817 9.93822 19.5786 10.0186 19.5774C15.8115 19.5509 19.5064 17.9349 18.5047 16.3286C17.8758 15.3198 15.4773 14.6812 12.5913 14.3815Z"
                  fill="#2196F3"
                />
              </g>
              <defs>
                <clipPath id="clip0_1824_17420">
                  <rect
                    width="19.5079"
                    height="19.5077"
                    fill="white"
                    transform="translate(0.13623 0.0718384)"
                  />
                </clipPath>
              </defs>
            </svg>
          </li>
          <li>153 Bd Moulay Idriss I, Casablanca 20250</li>
        </ul>
        <ul className="flex flex-row items-center justify-center py-3">
          <li className="mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M17.0151 13.3249V16.1242C17.0152 16.3246 16.9393 16.5176 16.8026 16.6643C16.666 16.8109 16.4788 16.9002 16.2789 16.9143C15.9329 16.938 15.6503 16.9507 15.4318 16.9507C8.43584 16.9507 2.76514 11.28 2.76514 4.28402C2.76514 4.06552 2.77701 3.78289 2.80155 3.43693C2.81558 3.23699 2.90493 3.04982 3.05156 2.91317C3.1982 2.77653 3.3912 2.70059 3.59164 2.70068H6.39097C6.48917 2.70058 6.5839 2.73699 6.65675 2.80282C6.72961 2.86866 6.7754 2.95923 6.78522 3.05693C6.80343 3.23902 6.82005 3.38389 6.83589 3.49393C6.99322 4.59191 7.31564 5.6598 7.79222 6.66139C7.86743 6.81973 7.81834 7.00893 7.67584 7.11027L5.96743 8.33102C7.012 10.765 8.95165 12.7046 11.3856 13.7492L12.6048 12.0439C12.6546 11.9743 12.7273 11.9243 12.8102 11.9027C12.8931 11.8812 12.9809 11.8894 13.0584 11.926C14.0598 12.4017 15.1275 12.7233 16.2251 12.8799C16.3351 12.8958 16.48 12.9124 16.6605 12.9306C16.758 12.9406 16.8484 12.9865 16.9141 13.0593C16.9798 13.1321 17.0153 13.2268 17.0151 13.3249Z"
                fill="#2196F3"
              />
            </svg>
          </li>
          <li>(+212) 675058820</li>
        </ul>
        <ul className="flex flex-row items-center justify-center py-3">
          <li className="mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="17"
              viewBox="0 0 21 17"
              fill="none"
            >
              <path
                d="M1.40295 13.441V2.92828H1.65936H1.91577V13.441H1.40295ZM19.8644 13.441V2.92828H20.1208H20.3772V13.441H19.8644ZM19.79 14.4666H20.3195C20.2236 14.8871 20.011 15.2758 19.7013 15.5856C19.3915 15.8954 19.0027 16.108 18.5823 16.2038V15.6743C19.161 15.5019 19.6176 15.0454 19.79 14.4666ZM17.5567 15.7487V16.2615H4.22345V15.7487H17.5567ZM3.19781 15.6743V16.2038C2.7774 16.108 2.38863 15.8954 2.07886 15.5856C1.76909 15.2758 1.55648 14.8871 1.46065 14.4666H1.99017C2.16254 15.0454 2.61909 15.5019 3.19781 15.6743ZM18.8387 1.64624V1.90265H2.9414V1.64624V1.38983H18.8387V1.64624Z"
                fill="#FFAB91"
                stroke="#2196F3"
                stroke-width="1.02563"
              />
              <path
                d="M1.65967 1.64642L10.8904 10.8771L20.1211 1.64642"
                stroke="#2196F3"
                stroke-width="1.53845"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </li>
          <li>arrissala@gmail.com</li>
        </ul>
      </div>
      <div className="flex flex-col  items-center lg:items-start justify-between mx-4 lg:mx-11 my-4">
        <div className="flex flex-row my-3 ">
          <h3 className="font-bold text-xl">Votre Panier</h3>{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
          >
            <path
              d="M26.3527 8.13472C26.2868 8.0555 26.2042 7.99176 26.1108 7.94802C26.0174 7.90427 25.9156 7.8816 25.8125 7.88159H6.71094L6.10508 4.54175C6.03643 4.16352 5.83716 3.8214 5.54202 3.5751C5.24689 3.3288 4.87464 3.19395 4.49023 3.19409H2.375C2.18852 3.19409 2.00968 3.26817 1.87782 3.40003C1.74595 3.53189 1.67188 3.71074 1.67188 3.89722C1.67188 4.0837 1.74595 4.26254 1.87782 4.3944C2.00968 4.52626 2.18852 4.60034 2.375 4.60034H4.48438C4.53987 4.59944 4.59389 4.61826 4.63681 4.65345C4.67973 4.68865 4.70877 4.73793 4.71875 4.79253L7.7082 21.2339C7.80303 21.7584 8.05858 22.2404 8.43945 22.6132C7.97953 22.9811 7.63607 23.4744 7.45066 24.0334C7.26524 24.5924 7.24581 25.1931 7.39471 25.7629C7.54361 26.3328 7.85446 26.8472 8.28965 27.244C8.72484 27.6409 9.26571 27.9031 9.8468 27.9989C10.4279 28.0947 11.0243 28.0201 11.5639 27.784C12.1035 27.5479 12.563 27.1606 12.887 26.6687C13.211 26.1769 13.3855 25.6017 13.3894 25.0128C13.3933 24.4239 13.2264 23.8464 12.909 23.3503H19.0285C18.6641 23.9206 18.5 24.5958 18.5619 25.2697C18.6238 25.9435 18.9082 26.5776 19.3704 27.0719C19.8325 27.5662 20.4461 27.8925 21.1143 27.9995C21.7825 28.1065 22.4672 27.988 23.0606 27.6627C23.654 27.3374 24.1222 26.8239 24.3914 26.203C24.6606 25.5822 24.7154 24.8894 24.5473 24.2339C24.3792 23.5785 23.9976 22.9976 23.4628 22.583C22.928 22.1684 22.2704 21.9436 21.5938 21.9441H10.2465C9.97204 21.9441 9.70628 21.8478 9.49555 21.672C9.28482 21.4962 9.14249 21.252 9.09336 20.982L8.67148 18.6628H22.543C23.1468 18.663 23.7314 18.4512 24.1951 18.0645C24.6588 17.6777 24.9719 17.1405 25.0801 16.5464L26.5039 8.71011C26.5223 8.60898 26.5183 8.50505 26.4922 8.40564C26.4661 8.30622 26.4185 8.21375 26.3527 8.13472ZM11.9844 24.991C11.9844 25.3155 11.8882 25.6327 11.7079 25.9024C11.5276 26.1722 11.2714 26.3825 10.9716 26.5067C10.6718 26.6309 10.3419 26.6634 10.0237 26.6001C9.70543 26.5368 9.4131 26.3805 9.18365 26.1511C8.95421 25.9216 8.79795 25.6293 8.73465 25.311C8.67135 24.9928 8.70384 24.6629 8.82801 24.3631C8.95219 24.0633 9.16247 23.8071 9.43227 23.6268C9.70207 23.4466 10.0193 23.3503 10.3438 23.3503C10.7789 23.3503 11.1962 23.5232 11.5038 23.8309C11.8115 24.1385 11.9844 24.5558 11.9844 24.991ZM23.2344 24.991C23.2344 25.3155 23.1382 25.6327 22.9579 25.9024C22.7776 26.1722 22.5214 26.3825 22.2216 26.5067C21.9218 26.6309 21.5919 26.6634 21.2737 26.6001C20.9554 26.5368 20.6631 26.3805 20.4337 26.1511C20.2042 25.9216 20.048 25.6293 19.9846 25.311C19.9213 24.9928 19.9538 24.6629 20.078 24.3631C20.2022 24.0633 20.4125 23.8071 20.6823 23.6268C20.9521 23.4466 21.2693 23.3503 21.5938 23.3503C22.0289 23.3503 22.4462 23.5232 22.7538 23.8309C23.0615 24.1385 23.2344 24.5558 23.2344 24.991ZM23.6961 16.2945C23.647 16.5645 23.5046 16.8087 23.2939 16.9845C23.0832 17.1603 22.8174 17.2566 22.543 17.2566H8.41602L6.96758 9.28784H24.9699L23.6961 16.2945Z"
              fill="black"
            />
          </svg>
        </div>
        <div>
          Vous n'êtes pas prêt à passer à la caisse ?{' '}
          <button
            className="underline bg-transparent"
            onClick={() => Navigate(-1)}
          >
            Poursuivez vos achats
          </button>
          .
        </div>
      </div>

      <div>
        {types.map(
          type =>
            type.items.length > 0 && (
              <div className="mx-4 lg:mx-11 my-4">
                <MyButton
                  text={
                    type.name.charAt(0).toLocaleUpperCase() + type.name.slice(1)
                  }
                  onClick={() => toggleDisplay(type.name)}
                  ariaLabel="show or hide papeterie"
                  icon={
                    <i
                      className={`fa-solid  ml-1 ${
                        type.displayed ? 'fa-caret-down' : 'fa-caret-right'
                      }`}
                    ></i>
                  }
                  className={` text-white rounded-md bg-${type.color}`}
                />
                {type.displayed && (
                  <>
                    {' '}
                    <div className="flex items-center flex-wrap gap-1 justify-around">
                      {type.items.map(item => (
                        <ProductCard
                          key={item.book.id}
                          item={item}
                          userShoppingSession={userShoppingSession}
                          setUserShoppingSession={setUserShoppingSession}
                          chosenLibrary={purchasedFromSupplier}
                          type={type.name}
                          addedToWishlist={addedToWishlist}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
        )}
      </div>
      <div className="flex flex-col lg:flex-row">
        {' '}
        <div className="w-11/12 lg:w-1/2 flex items-center justify-around m-3 gap-2">
          <div>
            <button
              className="border-1 border-black text-black bg-transparent"
              onClick={() => Navigate(-1)}
            >
              {' '}
              <i
                aria-hidden="true"
                className="fa-solid fa-arrow-left mr-2  "
                onClick={() => Navigate(-1)}
              ></i>
              Poursuivre l'achat{' '}
            </button>
          </div>
          <div>
            <button className="bg-myDanger text-white">
              Vider le panier{' '}
              <i
                aria-hidden="true"
                className="fa-solid fa-trash text-white"
              ></i>
            </button>
          </div>
        </div>
        <div className="w-11/12 lg:w-1/2  flex flex-col mx-5 my-11">
          <div className="w-full">
            <h2 className="font-bold text-xl">Total Panier</h2>
            {types.map(type => (
              <div className="p-3 flex flex-row justify-between">
                <p className="capitalize">{type.name}</p>{' '}
                <span className="font-bold">
                  {calculatePrice(type.items)} DH
                </span>
              </div>
            ))}
            <div className="p-3 flex flex-row justify-between">
              <p className="capitalize font-bold text-xl">total </p>{' '}
              <span className="font-bold">{totalPrice} DH</span>
            </div>
            <MyButton
              text="Continue"
              ariaLabel="continue to payement"
              onClick={() => console.log('continuing')}
              className="w-full my-3 bg-myBrand text-white rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
