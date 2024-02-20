import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        if (user) {
          navigate("/dashboard", { replace: true });
        }
      })
      .catch((err) => {
        if (err) {
          toast("Login information is Incorrect");
        }
        console.log(err);
      });
  };

  return (
    <div>
      <div className="">
        <img className="w-24 mx-auto my-12" src={logo} alt="#" />
        <h1 className="text-center text-3xl font-bold">DCC ECA EVENT LOGIN</h1>
      </div>

      <div className="mx-auto w-1/3">
        <form onSubmit={handleLogin} className=" my-12">
          <div>
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                Email
              </label>
              <input
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                type="email"
              />
            </div>
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-xs font-bold mb-2">
                password
              </label>
              <input
                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="password"
                type="password"
              />
            </div>
          </div>
          <div className="flex justify-between items-center mx-3 mt-6">
            <small>
              New here?{" "}
              <Link to="/" className="underline text-green-600">
                Register Now
              </Link>
            </small>
            <input
              className="bg-green-600 px-5 p-2 rounded-lg text-white font-bold cursor-pointer"
              type="submit"
              value="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
