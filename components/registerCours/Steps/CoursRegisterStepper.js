import React, { useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import Card from "@mui/material/Card";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import StepButton from "@mui/material/StepButton";
import { useSelector, useDispatch } from "react-redux";
import ResultPage from "../../globalComponents/ResultPage";

const steps = [
  "عنوان دوره",
  "معرفی دوره",
  "سرفصل های دوره",
  "لوازم مورد نیاز",
  // "لوازم پیشنهادی",
  "اطلاعات حرکت",
  "اطلاعات اقامت",
  // "گشت ها",
  "بارگزاری نصویر",
  "نکات ضروری",
  "قوانین لغو",
];

export default function CoursRegisterStepper({
  children,
  editCours,
  disableBtn,
  completedData,
  submitEventData,
  setActiveComponent,
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setActiveComponent(activeStep + 1);
  }, [activeStep]);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    // dispatch(eventSubmitValue(submitEventData));
    !editCours
      ? completedSteps() === totalSteps() - 1 &&
        axios.post("/api/courses/registerCours", completedData).then((res) => {
          if (res.status == 200) {
            toast.success(` ${completedData.cours_title} با موفقیت ایجاد شد `);
            router.push("/courses");
          } else {
            toast.error("متاسفانه خطایی رخ داده است");
          }
        })
      : completedSteps() === totalSteps() - 1 &&
        axios
          .post("/api/courses/editCours", {
            editedData: completedData,
            coursId: editCours._id,
          })
          .then((res) => {
            if (res.status == 200) {
              toast.success(
                ` ${completedData.cours_title} با موفقیت ویرایش شد `
              );
              router.push(`/courses/${editCours._id}`);
            } else {
              toast.error("متاسفانه خطایی رخ داده است");
            }
          });
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  return (
    <div>
      <Card
        style={{
          border: "none",
          margin: "15px",
          borderRadius: "8px",
        }}
        variant="outlined"
      >
        <Box sx={{ width: "100%" }}>
          <Stepper
            style={{
              direction: "ltr",
              marginBottom: "8px",
              borderRadius: "10px",
              background: "#D2001A",
              padding: "10px 0 5px 0",
              boxShadow: "rgb(0 0 0 / 15%) 0px 0px 16px -4px",
            }}
            nonLinear
            alternativeLabel
            activeStep={activeStep}
          >
            {steps.map((label, index) => (
              <Step key={index} completed={completed[index]}>
                {/* <StepLabel icon={index }>{label}</StepLabel> */}
                <StepButton
                  icon={(index + 1).toLocaleString("fa-IR")}
                  onClick={handleStep(index)}
                >
                  <Typography variant="body2" color="#fff">
                    {label}
                  </Typography>
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <ResultPage
                width="500"
                height="400"
                title="دوره شما با موفقیت ثبت شد!"
                src="/assets/Checklist 2.jpg"
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#FFCA03",
                }}
                linkHref="/courses"
                // subTitle="شما می توانید در "
                ButtonText="دوره ها"
              />
            ) : (
              // <React.Fragment>
              //   <Typography sx={{ mt: 2, mb: 1 }}>
              //     All steps completed - you&apos;re finished
              //   </Typography>
              //   <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              //     <Box sx={{ flex: "1 1 auto" }} />
              //     <Button onClick={handleReset}>Reset</Button>
              //   </Box>
              // </React.Fragment>
              <React.Fragment>
                <div>{children}</div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,
                    justifyContent: "center",
                  }}
                >
                  {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography
                        variant="caption"
                        sx={{ display: "inline-block" }}
                      >
                        این مرحله قبلا تکمیل شده است
                      </Typography>
                    ) : (
                      <Button
                        size="large"
                        disabled={disableBtn}
                        style={{
                          backgroundColor: disableBtn ? "silver" : "#FFCA03",
                          color: "black",
                          cursor: disableBtn ? "not-allowed" : "pointer",
                        }}
                        onClick={handleComplete}
                      >
                        {completedSteps() === totalSteps() - 1
                          ? "پایان"
                          : "ذخیره اطلاعات"}
                      </Button>
                    ))}
                </Box>
              </React.Fragment>
            )}
          </div>
        </Box>
      </Card>
    </div>
  );
}
