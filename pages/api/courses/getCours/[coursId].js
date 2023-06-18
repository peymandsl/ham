import { getCours } from "../../../../server/controller/CoursController";

export default async (req, res) => {
  const { coursId } = req.query;

  const data = await getCours({ coursId });
  if (data.status === "SUCCESS") {
    res.status(200).json(data.data);
  } else {
    res.status(404).json(data.message);
  }
};
