import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
// import ReactToPrint from "react-to-print";

const Dashboard = () => {
  const { user: loggedUser, info, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(info);
  //   const datum = useLoaderData();
  //   console.log(datum);
  //

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
    navigate("/login");
  };

  const handleOrder = async () => {
    try {
      await axios
        .post("https://dcc-server.vercel.app/bkash-checkout", {
          amount: 1,
          callbackURL: "https://dcc-server.vercel.app/bkash-callback",
          orderID: "01",
          reference: "01",
        })
        .then((res) => {
          toast(res);
          console.log(res);
          window.location.href = res?.data;
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center mt-12">Pay Now</h1>
      <div className="w-24 h-2 bg-green-600 mb-12 mx-auto"></div>
      {info?.isPaid ? (
        <>
          <p className="m-5">
            <Link to={"/profile"}>
              <button className="px-3 py-2 bg-green-600 text-white font-bold rounded-lg">
                Profile
              </button>
            </Link>
          </p>
        </>
      ) : (
        <></>
      )}
      <div>
        <div>
          <div className="text-center">
            <svg
              className="mx-auto"
              width="71"
              height="69"
              viewBox="0 0 71 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M66.9262 68.755H4.07066C2.18945 68.755 0.652832 67.2405 0.652832 65.3901V3.88446C0.652832 2.02948 2.18945 0.516525 4.07066 0.516525H66.9262C68.8106 0.516525 70.3472 2.02948 70.3472 3.88446V65.3901C70.3472 67.2405 68.8106 68.755 66.9262 68.755Z"
                fill="#DF146E"
              />
              <path
                d="M50.611 37.8797L28.5141 34.4193L31.5043 47.2517L50.611 37.8797ZM51.5069 36.8289L34.1327 13.0885L28.4577 33.2807L51.5069 36.8289ZM27.3816 33.0049L9.17563 10.1289L33.0174 12.9314L27.3816 33.0049ZM18.5488 23.5236L8.44727 14.1562H11.1023L18.5488 23.5236ZM56.9313 25.2954L52.6567 36.701L45.7239 27.2751L56.9313 25.2954ZM34.2001 47.0945L50.9759 40.4696L51.6871 38.3665L34.2001 47.0945ZM20.2076 59.1442L27.3957 34.3361L31.0391 50.4809L20.2076 59.1442ZM57.9557 25.3816L56.1888 30.09L62.5468 29.9821L57.9557 25.3816Z"
                fill="white"
              />
            </svg>
            <p className="my-6 italic">
              Pay event fee via Bkash Payment Gateway
            </p>
            <div>
              <span className="text-green-600 outline outline-2 py-2 px-4 rounded-md">
                BDT 200/-
              </span>
            </div>
          </div>
          <div className="text-center my-6">
            <input
              onClick={handleOrder}
              className="bg-green-600 px-4 py-2 rounded-lg text-white font-medium cursor-pointer"
              type="submit"
              value="Proceed to Pay"
            />
          </div>
          {loggedUser ? (
            <>
              <p className="text-center">
                <button
                  className="px-3 py-2 bg-red-600 text-white font-bold rounded-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
