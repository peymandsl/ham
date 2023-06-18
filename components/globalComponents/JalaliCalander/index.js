import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";

function JalaliCalander({
  onOpen,
  disabled,
  className,
  travelStartDate,
  setTravelStartDate,
}) {
  return (
    // <div style={{ direction: "rtl", width: "100%" }}>
    <DatePicker
      onOpen={onOpen}
      calendar={persian}
      disabled={disabled}
      locale={persian_fa}
      className={className}
      value={travelStartDate}
      onChange={setTravelStartDate}
      calendarPosition="bottom-right"
      plugins={[weekends()]}
      containerStyle={{
        width: "100%",
      }}
      style={{
        width: "100%",
        height: "45px",
        fontSize: "14px",
        borderRadius: "4px",
        padding: "15px 10px",
        boxSizing: "border-box",
      }}
    />
    // </div>
  );
}

export default JalaliCalander;
