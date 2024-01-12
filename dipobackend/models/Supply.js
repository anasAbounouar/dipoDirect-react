import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  id: Number,
  title: String,
  level: String,
  langue: String,
  imgSrc: [String],
  price: String,
  addedToCart: Boolean,
  addedToWishlist: Boolean,
  littleBooksCount: Number,
  maxQuantity: Number,
});

const supplySchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  library: String,
  name: String,
  arrow: String,
  cartCount: Number,
  WishlistCount: Number,
  totalPrice: Number,
  wishlistBooks: [Number],
  books: [bookSchema],
  purchasedBooks: [Number],
});

const ArrissalaSupply = model('ArrissalaSupply', supplySchema);
const AladnaneSupply = model('AladnaneSupply', supplySchema);

export { ArrissalaSupply, AladnaneSupply };
