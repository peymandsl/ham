import { eventHardshipFilter } from "../../../../server/controller/EventController";
export default async (req, res) => {
  const { hard_ship, userID } = req.body;
  const data = await eventHardshipFilter({ hard_ship, userID });
  if (data.status === "ERROR") {
    return res.status(200).json(data);
  } else {
    return res.status(200).json(data);
  }
};
