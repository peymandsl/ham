import { getClubEventsList } from "../../../../server/controller/EventController";

export default async (req, res) => {
  const { _id } = req.body;
  const data = await getClubEventsList({ _id });
  res.status(200).json(data);
};
