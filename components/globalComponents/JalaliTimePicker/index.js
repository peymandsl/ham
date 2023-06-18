import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

function JalaliTimePicker({ travelStartTime, setTravelStartTime }) {
  return (
    <div>
      <DatePicker
        disableDayPicker
        format="HH:mm:ss"
        calendar={persian}
        locale={persian_fa}
        value={travelStartTime}
        plugins={[<TimePicker />]}
        onChange={setTravelStartTime}
        calendarPosition="bottom-right"
      />
    </div>
  );
}

export default JalaliTimePicker;
