import { eventsByEventType } from "../../../../server/controller/EventController";
export default async (req, res) => {
  const { event_type } = req.body;

  const data = await eventsByEventType({ event_type });
  if (data.status === "ERROR") {
    return res.status(200).json(data);
  } else {
    return res.status(200).json(data);
  }
};
