// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetUserInfo } from "../../../../server/controller/UsersController";

export default async (req, res) => {
  const { _id } = req.body;
  const data = await GetUserInfo({ _id });
  if (data.status === "ERROR") {
    return res.status(604).send(data.message);
  } else {
    return res.status(200).json(data.data);
  }
};
