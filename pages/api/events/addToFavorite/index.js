import { addToFavoriteEvents } from "../../../../server/controller/UsersController";
export default async (req, res) => {
  const { mobile, event_id } = req.body;

  const data = await addToFavoriteEvents({ mobile, event_id });
  if (data.status === "ERROR") {
    return res.status(200).json(data.message);
  } else {
    return res.status(200).json(data);
  }
};
