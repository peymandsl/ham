import { getClubInfo } from "../../../../server/controller/UsersController";

export default async (req, res) => {
  if (req.method === "GET") {
    const { clubId } = req.query;
    const data = await getClubInfo({ clubId });
    if (data.status === "SUCCESS") {
      res.status(200).json(data.data);
    } else {
      res.status(404).json(data.message);
    }
  }
};
