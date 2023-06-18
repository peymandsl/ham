// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getEventsByType } from "../../../../server/controller/EventController";

export default async (req, res) => {
  const { type } = req.query;
  const data = await getEventsByType({ type });
  if (data.status === "SUCCESS") {
    res.status(200).json(data.data);
  } else {
    res.status(404).json(data.message);
  }
};
