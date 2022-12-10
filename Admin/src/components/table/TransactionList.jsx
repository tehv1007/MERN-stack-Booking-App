import "./TransactionList.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "../../useFetch";

const TransactionList = ({ limit }) => {
  const { data } = useFetch(
    `http://localhost:5000/api/transactions?limit=${limit}`
  );
  const dateFormat = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  };

  console.log(dateFormat(new Date()));
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">User</TableCell>
            <TableCell className="tableCell">Hotel</TableCell>
            <TableCell className="tableCell">Room</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="tableCell">{item._id}</TableCell>
              <TableCell className="tableCell">{item.username}</TableCell>
              <TableCell className="tableCell">{item.hotelName}</TableCell>
              <TableCell className="tableCell">{item.room}</TableCell>
              <TableCell className="tableCell">
                {dateFormat(item.dateStart)} - {dateFormat(item.dateEnd)}
              </TableCell>
              <TableCell className="tableCell">{item.price}</TableCell>
              <TableCell className="tableCell">{item.payment}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${item.status}`}>{item.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionList;
