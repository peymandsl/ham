// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CreateUser } from "../../../server/controller/UsersController";

export default async (req, res) => {
  const { Mobile, IdCode, BirthDate } = req.body;

  const data = await CreateUser({ Mobile, IdCode, BirthDate });
  res.status(200).json(data);
};
