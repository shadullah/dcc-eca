import MyRegister from "../Pages/Registration/MyRegister";
// import Reg from "../Pages/Registration/Reg";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  return (
    <div>
      {/* <Reg></Reg> */}
      <MyRegister></MyRegister>
      <footer className="my-6 text-center">
        All &copy; Copyright Reserved by{" "}
        <a
          href="https://shad-portfolio.web.app/"
          className="underline"
          target="_blank"
        >
          Shadullah
        </a>
      </footer>
    </div>
  );
};

export default Home;
