import { getEventsList } from "../../../server/controller/EventController";

export default async (req, res) => {
  const { userID, eventSort, role } = req.body;

  const data = await getEventsList({ userID, eventSort, role });
  res.status(200).json(data);
};
