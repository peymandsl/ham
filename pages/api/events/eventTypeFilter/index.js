import { eventTypeFilter } from "../../../../server/controller/EventController";
export default async (req, res) => {
  const { event_type, userID } = req.body;

  const data = await eventTypeFilter({ event_type, userID });
  if (data.status === "ERROR") {
    return res.status(200).json(data);
  } else {
    return res.status(200).json(data);
  }
};
