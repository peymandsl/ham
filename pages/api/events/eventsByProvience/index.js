import { eventsByProvience } from "../../../../server/controller/EventController";
export default async (req, res) => {
  const { selectState, role } = req.body;

  const data = await eventsByProvience({ selectState, role });
  if (data.status === "ERROR") {
    return res.status(200).json(data);
  } else {
    return res.status(200).json(data);
  }
};
