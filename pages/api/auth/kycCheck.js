import { CheckKYC } from "../../../server/controller/UsersController";

export default async (req, res) => {
  const { Mobile, IdCode, BirthDate } = req.body;

  const data = await CheckKYC({ Mobile, IdCode, BirthDate });
  res.status(200).json(data);
};
