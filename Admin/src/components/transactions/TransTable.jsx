import Sidebar from "../../components/sidebar/Sidebar";
import "../../pages/home/home.scss";
import TransactionList from "../table/TransactionList";
import Navbar from "../navbar/Navbar";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
          <div className="listTitle">Transactions List</div>
          <TransactionList limit={1000} />
        </div>
      </div>
    </div>
  );
};

export default Home;
