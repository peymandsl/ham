import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "../navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Slide } from "react-toastify";
import { getUserInfo } from "../../components/redux/features/userSlice";
import NavbarSkeleton from "../../components/globalComponents/skeleton/NavbarSkeleton";

function Layout({ children }) {
  const { data, status } = useSession();

  const dispatch = useDispatch();
  useEffect(() => {
    status === "authenticated" &&
      axios
        .post("/api/users/getUser", { _id: data?.token.restOfUser._id })
        .then((res) => {
          dispatch(getUserInfo(res.data));
        });
  }, [status]);

  const userData = useSelector((state) => state.userInfo.userData);
  return (
    <div>
      <ToastContainer
        hideProgressBar={false}
        position="top-right"
        transition={Slide}
        pauseOnFocusLoss
        autoClose={5000}
        theme="light"
        closeOnClick
        pauseOnHover
        newestOnTop
        draggable
        rtl
      />
      {status !== "loading" ? <Navbar /> : <NavbarSkeleton />}
      {children}
    </div>
  );
}

export default Layout;
