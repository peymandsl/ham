import { getMessages } from "../../../../server/controller/UsersController";

export default async (req, res) => {
  const data = await getMessages(req.body);
  if (data.status === "ERROR") {
    return res.status(604).send(data.message);
  } else {
    return res.status(200).json(data.data);
  }
};
