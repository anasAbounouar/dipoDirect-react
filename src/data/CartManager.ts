// // Sample onlineUser object
// let userShoppingSession = {
//   arrissala: {
//     ecritures: {
//
//
//       totalPrice: 0,
//       wishlistBooks: [],
//       purchasedBooks: [],
//     },
//     papeterie: {
//
//
//       totalPrice: 0,
//       wishlistBooks: [],
//       purchasedBooks: [],
//     },
//     organisation: {
//
//
//       totalPrice: 0,
//       wishlistBooks: [],
//       purchasedBooks: [],
//     },
//   },
//   aladnane: {
//     ecritures: {
//
//
//       totalPrice: 0,
//       wishlistBooks: [],
//       purchasedBooks: [],
//     },
//     papeterie: {
//
//
//       totalPrice: 0,
//       wishlistBooks: [],
//       purchasedBooks: [],
//     },
//     organisation: {
//
//
//       totalPrice: 0,
//       wishlistBooks: [],
//       purchasedBooks: [],
//     },
//   },
// };
export function addToCart(
  userShoppingSession,
  setUserShoppingSession,
  libraryName,
  type,
  book,
  quantity = 1
) {
  const sessionCopy = { ...userShoppingSession };
  let addedToCart = null;
  const existingBookIndex = sessionCopy[libraryName][
    type
  ].purchasedBooks.findIndex(el => el.book.id === book.id);

  if (existingBookIndex === -1) {
    addedToCart = false;
    console.log('this item was not added to cart');
  } else {
    addedToCart = true;
    console.log('this item is already added to cart');
  }

  const totalPriceChange = parseFloat(book.price) * parseFloat(quantity);
  sessionCopy[libraryName][type].totalPrice += addedToCart
    ? -totalPriceChange
    : totalPriceChange;

  if (!addedToCart) {
    sessionCopy[libraryName][type].purchasedBooks.push({
      book: book,
      quantity: quantity,
    });
  } else {
    sessionCopy[libraryName][type].purchasedBooks.splice(existingBookIndex, 1);
  }

  // Update the state with the new session data using the updater function
  setUserShoppingSession(sessionCopy);
}

export function addToWishlist(
  userShoppingSession,
  setUserShoppingSession,
  libraryName,
  type,
  book // Expecting the whole book object
) {
  const sessionCopy = { ...userShoppingSession };
  const selectedCategory = sessionCopy[libraryName][type];

  // Find the index of the book in the wishlist
  const bookIndex = selectedCategory.wishlistBooks.findIndex(
    wishlistBook => wishlistBook.id === book.id
  );

  if (bookIndex === -1) {
    // If the book isn't in the wishlist, add it and increase the count
    selectedCategory.wishlistBooks.push(book);
    console.log('Book added to wishlist.');
  } else {
    // If the book is already in the wishlist, remove it and decrease the count
    selectedCategory.wishlistBooks.splice(bookIndex, 1);
    console.log('Book removed from wishlist.');
  }

  // Update the state with the new session data using the updater function
  setUserShoppingSession(sessionCopy);
}
