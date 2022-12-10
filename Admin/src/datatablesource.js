export const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "username",
    headerName: "Username",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 150,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 150,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];

export const transactionsColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "username",
    headerName: "User",
    width: 100,
  },
  {
    field: "hotelName",
    headerName: "Hotel",
    width: 200,
  },
  {
    field: "room",
    headerName: "Room",
    width: 150,
  },
  {
    field: `dateStart`,
    headerName: "Date",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "payment",
    headerName: "Payment Method",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
  },
];
