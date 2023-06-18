import React from "react";
import ListViewItem from "./ListViewItem";

function ListView({ eventsList }) {
  return (
    <div>
      {eventsList &&
        eventsList.map((event) => {
          <ListViewItem event={event} />;
        })}
      <ListViewItem />;
    </div>
  );
}

export default ListView;
