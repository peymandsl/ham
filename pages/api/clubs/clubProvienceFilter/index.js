import { clubProvienceFilter } from "../../../../server/controller/UsersController";
export default async (req, res) => {
  const { selectState } = req.body;
  const data = await clubProvienceFilter({ selectState });
  if (data.status === "ERROR") {
    return res.status(200).json(data);
  } else {
    return res.status(200).json(data);
  }
};
