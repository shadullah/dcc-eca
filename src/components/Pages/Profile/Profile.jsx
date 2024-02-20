import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
// import axios from "axios";
const Profile = () => {
  const ref = useRef();
  const datum = useLoaderData();

  const { user, logOut, loading } = useContext(AuthContext);

  const navigate = useNavigate();
  console.log(user);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
    navigate("/login");
  };

  const [info, setInfo] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/userDetails?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setInfo(data));
  }, [user]);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          <div>
            {user ? (
              <>
                <div>
                  <p className="mx-6">
                    <button
                      className="px-3 py-2 bg-red-600 text-white font-bold rounded-lg"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
            <div ref={ref} className="mx-auto w-1/3 my-6">
              <div className=" outline outline-2  text-center p-6 mx-3">
                <h1 className="uppercase text-2xl font-bold text-green-600 outline outline-2 py-2 px-3 rounded-md w-24 mx-auto">
                  Paid
                </h1>
                {/* ----------To do------------ */}
                <p className="my-5">TKT - 2024#0{datum?.length}</p>
              </div>

              <div className="w-60 h-60 flex items-center mx-auto">
                <img className="mx-auto" src={info?.image} alt="#" />
              </div>

              {console.log(user)}
              <div className="bg-green-50 p-12">
                <h1 className="border=0 border-l-4 border-green-600 text-green-600 text-xl pl-3">
                  Attendee Details
                </h1>
                <div>
                  <h3 className="my-2">
                    <span className="font-extrabold">Name: </span> {info?.name}{" "}
                  </h3>
                  <h3 className="my-2">
                    <span className="font-extrabold">Rank: </span>
                    {info?.rank}
                  </h3>
                  <h3 className="my-2">
                    <span className="font-extrabold">Cadetship Year: </span>{" "}
                    {info?.cadetship_year}
                  </h3>
                  <h3 className="my-2">
                    <span className="font-extrabold">Phone: </span>{" "}
                    {info?.mobile}
                  </h3>
                </div>
                <div>
                  <h1 className="border=0 border-l-4 border-green-600 text-green-600 text-xl pl-3 mt-6">
                    Event Details
                  </h1>
                  <div>
                    <h3 className="my-2">
                      <span className="font-extrabold">Event Name:</span> Iftar
                      Mahfil 2024{" "}
                    </h3>
                    <h3 className="my-2">
                      <span className="font-extrabold">Time & Date:</span>{" "}
                      3:00PM, 12th March 2024{" "}
                    </h3>
                    <h3 className="my-2">
                      <span className="font-extrabold">Vanue:</span> DCC
                      Auditorium{" "}
                    </h3>
                    <h3 className="my-2">
                      <span className="font-extrabold">Phone: </span>{" "}
                      8801811001171{" "}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center my-6">
              <ReactToPrint
                trigger={() => (
                  <button className="text-white bg-green-600 px-3 py-2 rounded-lg">
                    Save As PDF
                  </button>
                )}
                content={() => ref.current}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
