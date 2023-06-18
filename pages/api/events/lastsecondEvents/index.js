import { lastsecondEvents } from "../../../../server/controller/EventController";
export default async (req, res) => {
  const data = await lastsecondEvents();
  if (data.status === "ERROR") {
    return res.status(604).json(data);
  } else {
    return res.status(200).json(data);
  }
};
