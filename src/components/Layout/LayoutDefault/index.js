import { useSelector } from "react-redux";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "./LayoutDefault.scss";

function LayoutDefault() {
  const authen = useSelector((state) => state.authenReducer);

  return (
    <>
      <div className="layout-default">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  )
}

export default LayoutDefault;