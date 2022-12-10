import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading } = useFetch(
    "http://localhost:5000/api/hotels/countByCity?cities=Ha Noi,Sai Gon,Da Nang"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/square250/688853.webp?k=f6427c8fccdf777e4bbc75fcd245e7c66204280181bea23350388c76c57348d1&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Ha Noi</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/square250/688893.webp?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Ho Chi Minh</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/square250/688844.webp?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Da Nang</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
