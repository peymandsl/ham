import { eventProvienceFilter } from "../../../../server/controller/EventController";
export default async (req, res) => {
  const { selectState, userID } = req.body;
  const data = await eventProvienceFilter({ selectState, userID });
  if (data.status === "ERROR") {
    return res.status(200).json(data);
  } else {
    return res.status(200).json(data);
  }
};
