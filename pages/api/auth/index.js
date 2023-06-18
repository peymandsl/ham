import { CheckUserExist } from "../../../server/controller/UsersController";

export default async (req, res) => {
  const { mobile } = req.body;

  const data = await CheckUserExist({ mobile });
  res.status(200).json(data);
};
