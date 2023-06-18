import { getAllClubs } from "../../../../server/controller/UsersController";

export default async (req, res) => {
  if (req.method === "GET") {
    const data = await getAllClubs(req.query);
    if (data.status === "ERROR") {
      return res.status(604).send(data.message);
    } else {
      return res.status(200).json(data.data);
    }
  }
};
