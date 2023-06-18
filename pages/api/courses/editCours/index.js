import { EditCours } from "../../../../server/controller/CoursController";

export default async (req, res) => {
  const { editedData, coursId } = req.body;
  const data = await EditCours({ editedData, coursId });
  res.status(200).json(data);
};
