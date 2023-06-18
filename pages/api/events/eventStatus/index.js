import { eventStatus } from "../../../../server/controller/EventController";
export default async (req, res) => {
  const { event_status, _id } = req.body;

  const data = await eventStatus({ event_status, _id });
  if (data.status === "ERROR") {
    return res.status(604).json(data);
  } else {
    return res.status(200).json(data);
  }
};
