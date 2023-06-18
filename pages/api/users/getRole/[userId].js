// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetUserRole } from "../../../../server/controller/UsersController";

export default async (req, res) => {
  const { userId } = req.query;
  const data = await GetUserRole({ userId });
  if (data.status === "ERROR") {
    return res.status(604).send(data.message);
  } else {
    return res.status(200).json(data.role);
  }
};
