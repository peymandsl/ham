import { coursHardshipFilter } from "../../../../server/controller/CoursController";
export default async (req, res) => {
  const { hard_ship, userID } = req.body;
  const data = await coursHardshipFilter({ hard_ship, userID });
  if (data.status === "ERROR") {
    return res.status(200).json(data);
  } else {
    return res.status(200).json(data);
  }
};
