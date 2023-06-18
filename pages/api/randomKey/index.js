import { CreateRandomKey } from "../../../server/controller/UsersController";
export default async (req, res) => {
  const { mobile } = req.body;

  const data = await CreateRandomKey({ mobile });
  if (data.status === "ERROR") {
    return res.status(604).send(data.message);
  } else {
    return res.status(200).json(data);
  }
};
