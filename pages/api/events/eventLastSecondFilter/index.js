import { eventLastSecondFilter } from "../../../../server/controller/EventController";
export default async (req, res) => {
  const { last_second, userID } = req.body;
  const data = await eventLastSecondFilter({ last_second, userID });
  if (data.status === "ERROR") {
    return res.status(200).json(data);
  } else {
    return res.status(200).json(data);
  }
  return res.status(200).json(data);
};
