import { useContext, useState } from "react";
import logo from "../../../assets/logo.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../../providers/AuthProvider";
// import axios from "axios";

const MyRegister = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  const formArray = [1, 2];

  const [formNo, setFormNo] = useState(formArray[0]);
  const [state, setState] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    image: "",
    rank: "",
    cadet_year: "",
    cadet_no: "",
    designation: "",
    institute: "",
    address: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const nextbtn = () => {
    if (
      formNo === 1 &&
      state.name &&
      // state.image &&
      state.mobile &&
      state.email &&
      state.password
    ) {
      setFormNo(formNo + 1);
    } else if (
      formNo === 2 &&
      state.rank &&
      state.cadet_year &&
      state.cadet_no &&
      state.designation &&
      state.institute
    ) {
      setFormNo(formNo + 1);
    } else {
      toast("Please Fillup all Fields");
    }
  };
  const prevbtn = () => {
    setFormNo(formNo - 1);
  };

  //

  const onSub = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        console.log(formData);

        fetch(
          "https://api.imgbb.com/1/upload?key=7715800e8cb8ef26136f61f84ebfcd5d",
          {
            method: "POST",
            body: formData,
          }
        )
          .then((res) => res.json())
          .then((imgData) => {
            if (imgData.success) {
              updateUserProfile(data.name, imgData.data.display_url)
                .then(() => {
                  const user = {
                    name: data.name,
                    image: imgData.data.display_url,
                    email: data.email,
                    mobile: data.mobile,
                    cadetship_year: data.cadet_year,
                    cadet_no: data.cadet_no,
                    rank: data.rank,
                    institute: data.institute,
                    address: data.address,
                    designation: data.designation,
                    isPaid: false,
                  };
                  console.log(user);
                  fetch(`http://localhost:5000/users`, {
                    method: "POST",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(user),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      console.log("save user", data);
                      if (data.acknowledged) {
                        toast("Registration complete!! Login now...");
                        navigate("login");
                        logOut();
                      }
                    });
                })
                .catch((err) => console.log(err));
            }
          });
      })
      .catch((err) => {
        toast("form fill up invalid");
        console.log(err);
      });
  };

  return (
    <>
      {/* header */}
      <div className="">
        <img className="w-24 mx-auto my-12" src={logo} alt="#" />
        <h1 className="text-center text-3xl font-bold">
          DCC ECA EVENT REGISTRATION APPLICATION
        </h1>
      </div>
      <ToastContainer />

      {/* form body */}
      <div className="w-1/3 mx-auto my-12">
        <div className="flex justify-center items-center">
          {formArray.map((value, index) => (
            <>
              <div
                className={`text-white rounded-full w-8 h-8 my-6 ${
                  formNo - 1 === index ||
                  formNo - 1 === index + 1 ||
                  formNo === formArray.length
                    ? "bg-green-600"
                    : "bg-slate-600"
                } flex justify-center items-center`}
              >
                {value}
              </div>
              {index !== formArray.length - 1 && (
                <div
                  className={`w-24 h-[2px] ${
                    formNo === formArray.length || formNo === index + 2
                      ? "bg-green-600"
                      : "bg-slate-600"
                  }`}
                ></div>
              )}
            </>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSub)}>
          {formNo === 1 && (
            <div>
              <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="name"
                  required
                  placeholder="Tabid Khan"
                  {...register("name", { required: true })}
                  type="text"
                  onChange={inputHandle}
                  value={state.name}
                />
                {errors.name && (
                  <span className="text-red-700">Name is required</span>
                )}
              </div>
              <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                  Image <span className="text-red-600">*</span>
                </label>
                <input
                  className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("image", {
                    required: "Please select your photo",
                  })}
                  // value={state.image}
                  required
                  type="file"
                  name="image"
                />
                {errors.image && (
                  <span className="text-red-700">{errors.image.message}</span>
                )}
              </div>
              <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                  Mobile No. <span className="text-red-600">*</span>
                </label>
                <input
                  className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="01********"
                  {...register("mobile", { required: true, maxLength: 11 })}
                  type="number"
                  onChange={inputHandle}
                  value={state.mobile}
                />
                {errors.mobile && (
                  <span className="text-red-700">Number is required</span>
                )}
              </div>
              <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="abc@gmail.com"
                  {...register("email", { required: true })}
                  name="email"
                  type="email"
                  onChange={inputHandle}
                  value={state.email}
                />
                {errors.email && (
                  <span className="text-red-700">Email is required</span>
                )}
                {errors.email && (
                  <span className="text-red-700">{errors.email}</span>
                )}
              </div>
              <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                  Password <span className="text-red-600">*</span>
                </label>
                <input
                  className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="******"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    // pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  name="password"
                  type="password"
                  onChange={inputHandle}
                  value={state.password}
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-700">Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-700">
                    Password must be 6 characters
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-700">
                    Password must be 1 lower case, 1 Uppercase and a special
                    character
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center mx-4">
                <small>
                  Already Have An Account?{" "}
                  <Link to="/login" className="underline text-green-600">
                    Log In
                  </Link>
                </small>
                <button
                  className="bg-green-600 px-4 py-2 rounded-lg text-white font-medium"
                  onClick={nextbtn}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {formNo === 2 && (
            <div>
              <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                  Rank <span className="text-red-600">*</span>
                </label>
                <select
                  // defaultValue="default"
                  {...register("rank", { required: true })}
                  onChange={inputHandle}
                  value={state.rank}
                  required
                  className="border-green-600 border-2 w-full py-3 pl-2 rounded-md"
                >
                  <option value="default">Select a Rank</option>
                  <option value="Cadet Under Officer">
                    Cadet Under Officer
                  </option>
                  <option value="Cadet Sergent">Cadet Sergent</option>
                  <option value="Cadet Corporal">Cadet Corporal</option>
                  <option value="Cadet Lance Corporal">
                    Cadet Lance Corporal
                  </option>
                  <option value="Cadet">Cadet</option>
                </select>
                {errors.rank && (
                  <span className="text-red-700">Rank is required</span>
                )}
              </div>
              <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                  Cadetship Year <span className="text-red-600">*</span>
                </label>
                <input
                  className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="date"
                  {...register("cadet_year", { required: true })}
                  type="date"
                  onChange={inputHandle}
                  value={state.cadet_year}
                />
                {errors.cadetship && (
                  <span className="text-red-700">
                    Cadetship date is required
                  </span>
                )}
              </div>
              <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                  Cadet Number
                </label>
                <input
                  className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Cadet Number"
                  {...register("cadet_no", { required: true })}
                  type="Number"
                  onChange={inputHandle}
                  value={state.cadet_no}
                />
                {errors.cadetNo && (
                  <span className="text-red-700">Cadet Number is required</span>
                )}
              </div>
              <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                  Current Organization / Institute{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Institute"
                  {...register("institute", { required: true })}
                  type="text"
                  onChange={inputHandle}
                  value={state.institute}
                />
                {errors.institute && (
                  <span className="text-red-700">Institute is required</span>
                )}
              </div>
              <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide  text-xs font-bold mb-2">
                  Designation <span className="text-red-600">*</span>
                </label>
                <input
                  className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Designation"
                  {...register("designation", { required: true })}
                  type="text"
                  onChange={inputHandle}
                  value={state.designation}
                />
                {errors.designation && (
                  <span className="text-red-700">Designation is required</span>
                )}
              </div>
              <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                  Address <span className="text-red-600">*</span>
                </label>
                <input
                  className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your Address"
                  {...register("address", { required: true })}
                  type="text"
                  onChange={inputHandle}
                  value={state.address}
                />
                {errors.address && (
                  <span className="text-red-700">Address is required</span>
                )}
              </div>
              <div className="flex justify-between items-center mx-4">
                <button
                  className="bg-green-600 px-4 py-2 rounded-lg text-white font-medium"
                  onClick={prevbtn}
                >
                  Previous
                </button>
                <button className="bg-green-600 px-4 py-2 rounded-lg text-white font-medium">
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
      {/* form body */}
    </>
  );
};

export default MyRegister;
