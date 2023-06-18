// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Fade from "@mui/material/Fade";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import FormControl from "@mui/material/FormControl";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import FormHelperText from "@mui/material/FormHelperText";
// import InputAdornment from "@mui/material/InputAdornment";

// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

// export default function ChangePassword() {
//   const [showFileds, setShowFields] = useState(false);
//   const [passwordErr, setPasswordErr] = useState(false);
//   const [values, setValues] = React.useState({
//     password: "",
//     confirmPassword: "",
//     showPassword: false,
//   });

//   const [errorText, setErrorText] = useState("");

//   const handleChange = (prop) => (event) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleClickShowPassword = () => {
//     setValues({
//       ...values,
//       showPassword: !values.showPassword,
//     });
//   };

//   const handleShowChangePassword = () => {
//     setShowFields((prev) => !prev);
//   };

//   const onSaveBtnPress = () => {
//     if (values.password == null || "") {
//       setPasswordErr(true);
//       setErrorText("لطفا کلمه عبور خود را وارد کنید");
//     } else if (values.password.lenght <= 5) {
//       setPasswordErr(true);
//       setErrorText("کلمه عبور نمی تواند کمتر از 6 رقم باشد ");
//     } else if (values.password !== values.confirmPassword) {
//       setPasswordErr(true);
//       setErrorText("کلمه عبور و تکرار کلمه عبور برابر نمی باشند ");
//     }
//   };
//   return (
//     <Box sx={{ height: 180 }}>
//       <Button
//         // style={{ margin: "20px" }}
//         color="error"
//         onClick={handleShowChangePassword}
//       >
//         تغییر رمز عبور
//       </Button>
//       <Box
//         component="form"
//         noValidate
//         autoComplete="off"
//         sx={{ display: "flex" }}
//       >
//         <Fade in={showFileds}>
//           <Paper sx={{ m: 1 }} elevation={4} style={{ padding: "20px" }}>
//             <Grid container>
//               <Grid
//                 container
//                 style={{ marginBottom: "20px" }}
//                 justifyContent="center"
//                 spacing={4}
//               >
//                 <Grid item>
//                   <FormControl variant="standard">
//                     <OutlinedInput
//                       error={passwordErr}
//                       //   helperText={errorText}
//                       id="password"
//                       type={values.showPassword ? "text" : "password"}
//                       value={values.password}
//                       onChange={handleChange("password")}
//                       endAdornment={
//                         <InputAdornment position="end">
//                           <IconButton
//                             aria-label="toggle password visibility"
//                             onClick={handleClickShowPassword}
//                             onMouseDown={handleMouseDownPassword}
//                           >
//                             {values.showPassword ? (
//                               <VisibilityOff />
//                             ) : (
//                               <Visibility />
//                             )}
//                           </IconButton>
//                         </InputAdornment>
//                       }
//                     />
//                   </FormControl>
//                 </Grid>
//                 <Grid item>
//                   <FormControl variant="standard">
//                     <OutlinedInput
//                       error={passwordErr}
//                       //   helperText={errorText}
//                       id="re-password"
//                       type={values.showPassword ? "text" : "password"}
//                       value={values.confirmPassword}
//                       onChange={handleChange("confirmPassword")}
//                       endAdornment={
//                         <InputAdornment position="end">
//                           <IconButton
//                             aria-label="toggle password visibility"
//                             onClick={handleClickShowPassword}
//                             onMouseDown={handleMouseDownPassword}
//                           >
//                             {values.showPassword ? (
//                               <VisibilityOff />
//                             ) : (
//                               <Visibility />
//                             )}
//                           </IconButton>
//                         </InputAdornment>
//                       }
//                     />
//                   </FormControl>

//                   {passwordErr && (
//                     <FormHelperText id="re-password">
//                       {errorText}
//                     </FormHelperText>
//                   )}
//                 </Grid>
//               </Grid>
//               <Grid container justifyContent="center">
//                 <Grid item>
//                   <Button
//                     onClick={onSaveBtnPress}
//                     style={{ width: "160px" }}
//                     variant="contained"
//                   >
//                     ذخیره
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Fade>
//       </Box>
//     </Box>
//   );
// }
