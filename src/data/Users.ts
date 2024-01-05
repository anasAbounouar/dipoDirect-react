export const AccountsData = [
  {
    id: 1,
    email: 'anas@gmail.com',
    password: '123',
    isLoggedIn: false,
    imgSrc: '/assets/avatar.png',
    name: 'Anas',
    lastName: 'Abounouar',
    city: 'Casablanca',
  },
  {
    id: 2,
    email: 'john.doe@example.com',
    password: 'securepass',
    isLoggedIn: false,
    imgSrc: '/assets/avatar.png',
    name: 'John',
    lastName: 'Doe',
    city: 'New York',
  },
  {
    id: 3,
    email: 'alice.smith@example.com',
    password: 'p@ssw0rd',
    isLoggedIn: false,
    imgSrc: '/assets/avatar.png',
    name: 'Alice',
    lastName: 'Smith',
    city: 'London',
  },
  // Add more user objects as needed
];
let isLoggedIn = false;
export const toggleLogin = () => {
  isLoggedIn = !isLoggedIn;
};
