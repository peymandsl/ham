import { getCoursesList } from "../../../server/controller/CoursController";

export default async (req, res) => {
  const { userID, eventSort, role } = req.body;

  const data = await getCoursesList({ userID, eventSort, role });
  res.status(200).json(data);
};
