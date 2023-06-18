import { learningCourses } from "../../../../server/controller/CoursController";

export default async (req, res) => {
  const data = await learningCourses();
  res.status(200).json(data.data);
};
