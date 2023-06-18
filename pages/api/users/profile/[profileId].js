// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetUserInfo } from "../../../../server/controller/UsersController";

export default async (req, res) => {
  const { profileId } = req.query;
  const data = await GetUserInfo({ _id: profileId });
  if (data.status === "ERROR") {
    return res.status(604).send(data.message);
  } else {
    return res.status(200).json(data.data);
  }
};
