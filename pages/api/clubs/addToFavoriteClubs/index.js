import { addToFavoriteClubs } from "../../../../server/controller/UsersController";
export default async (req, res) => {
  const { mobile, club_id } = req.body;

  const data = await addToFavoriteClubs({ mobile, club_id });
  if (data.status === "ERROR") {
    return res.status(200).json(data.message);
  } else {
    return res.status(200).json(data);
  }
};
