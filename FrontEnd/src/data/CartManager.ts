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
  quantity = 1,
  toggle = false // New parameter to control toggling behavior
) {
  const sessionCopy = { ...userShoppingSession };

  const existingBookIndex = sessionCopy[libraryName][
    type
  ].purchasedBooks.findIndex(el => el.book.id === book.id);

  if (toggle) {
    // Classic toggle functionality
    if (existingBookIndex !== -1) {
      // Remove the item if it's already in the cart
      
      sessionCopy[libraryName][type].purchasedBooks.splice(
        existingBookIndex,
        1
      );
    } else {
      // Add the item if it's not in the cart
      sessionCopy[libraryName][type].purchasedBooks.push({ book, quantity });
    }
  } else {
    // New functionality to add/update quantities
    if (existingBookIndex === -1) {
      sessionCopy[libraryName][type].purchasedBooks.push({ book, quantity });
    } else {
      sessionCopy[libraryName][type].purchasedBooks[
        existingBookIndex
      ].quantity = quantity;
    }
  }

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
   
  } else {
    // If the book is already in the wishlist, remove it and decrease the count
    selectedCategory.wishlistBooks.splice(bookIndex, 1);
   
  }

  // Update the state with the new session data using the updater function
  setUserShoppingSession(sessionCopy);
}
