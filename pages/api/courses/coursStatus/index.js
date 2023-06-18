import { coursStatus } from "../../../../server/controller/CoursController";
export default async (req, res) => {
  const { cours_status, _id } = req.body;

  const data = await coursStatus({ cours_status, _id });
  if (data.status === "ERROR") {
    return res.status(604).json(data);
  } else {
    return res.status(200).json(data);
  }
};
