const data = [
  {
    title: "Terminator",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    month: "January",
    publishDate: "2018-01-03T19:04:28.809Z",
  },
  {
    title: "Die Hard",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 5,
    month: "February",
    dailyRentalRate: 2.5,
  },
  {
    title: "Get Out",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 8,
    month: "March",
    dailyRentalRate: 3.5,
  },
  {
    title: "Trip to Italy",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    month: "April",
    dailyRentalRate: 3.5,
  },
  {
    title: "Airplane",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    month: "May",
    dailyRentalRate: 3.5,
  },
  {
    title: "Wedding Crashers",
    genre: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    numberInStock: 7,
    month: "June",
    dailyRentalRate: 3.5,
  },
  {
    title: "Gone Girl",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 7,
    month: "July",
    dailyRentalRate: 4.5,
  },
  {
    title: "The Sixth Sense",
    genre: { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    numberInStock: 4,
    month: "August",
    dailyRentalRate: 3.5,
  },
];

export function getData() {
  return data;
}
