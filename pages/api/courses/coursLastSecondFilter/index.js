import { coursLastSecondFilter } from "../../../../server/controller/CoursController";
export default async (req, res) => {
  const { last_second, userID } = req.body;
  const data = await coursLastSecondFilter({ last_second, userID });
  if (data.status === "ERROR") {
    return res.status(200).json(data);
  } else {
    return res.status(200).json(data);
  }
};
