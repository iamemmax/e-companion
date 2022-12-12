// import { Typography } from "@mui/material";
// import Cookies from "js-cookie";
// import Head from "next/head";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import { reset } from "../../features/slice/users/LoginSlice";
// import Loading from "../config/Loader";
// import Authlayout from "../layouts/Authlayout";
// import ComfirmPage from "./ComfirmPage";
// import UserAddress from "./UserAddress";
// import UserBio from "./UserBio";
// import UserInfo from "./UserInfo";
// import UserPassword from "./UserPassword";

// const RegisterUsers = () => {
//   const { isLoading, isError, user, isSuccess, message } = useSelector(
//     (state) => state?.auth
//   );
//   if (isLoading) {
//     <Loading />;
//   }
//   const dispatch = useDispatch();
//   const router = useRouter();
//   useEffect(() => {
//     setTimeout(() => {
//       dispatch(reset());
//     }, 3000);
//   }, [message, isError]);

//   if (isSuccess && user?.data?.saveUser?.verified === false) {
//     Swal.fire({
//       title: user.msg,
//       text: user.activationMsg,
//       icon: "success",
//       // button: close,
//     });
//     Cookies.set("token", user?.data.userToken);
//     router.push(`/auth/verification`);
//   }

//   if (isError && message) {
//     toast.error(message, {
//       toastId: "error1",
//       position: "top-left",
//     });
//   }
//   if (isError) {
//     router.push("/auth/verification");
//   }

//   const [step, setStep] = useState(1);
//   const next = () => {
//     setStep((prev) => prev + 1);
//   };
//   const prev = () => {
//     setStep((prev) => prev - 1);
//   };

//   const SlideForm = () => {
//     switch (step) {
//       case 1:
//         return <UserInfo next={next} prev={prev} />;

//       case 2:
//         return <UserBio next={next} prev={prev} />;

//       case 3:
//         return <UserAddress next={next} prev={prev} />;

//       case 4:
//         return <UserPassword next={next} prev={prev} />;

//       case 5:
//         return <ComfirmPage next={next} prev={prev} />;

//       default:
//         break;
//     }
//   };
//   return (
//     <Authlayout>
//       <Head>
//         <title>Join E-companion</title>
//       </Head>
//       <Typography
//         variant="h5"
//         align="center"
//         p={2}
//         component="h2"
//         alignItems="center"
//         sx={{ width: "100%" }}
//       >
//         CREATE AN ACCOUNT
//       </Typography>

//       <SlideForm />
//       <Typography variant="subtitle">
//         Already a member? <Link href="/auth/login">Click here</Link>
//       </Typography>
//     </Authlayout>
//   );
// };

// export default RegisterUsers;
