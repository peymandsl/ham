import { EditEvent } from "../../../../server/controller/EventController";

export default async (req, res) => {
  const { editedData, eventId } = req.body;
  const data = await EditEvent({ editedData, eventId });
  res.status(200).json(data);
};
