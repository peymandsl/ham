import { updateUserData } from "../../../../server/controller/UsersController";
export default async (req, res) => {
  const { _id, updatedItem } = req.body;
  const data = await updateUserData({ _id, updatedItem });
  if (data.status === "ERROR") {
    return res.status(604).send(data.message);
  } else {
    return res.status(200).json(data.message);
  }
};
