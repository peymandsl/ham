import { updateUserLogo } from "../../../../server/controller/UsersController";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const data = await updateUserLogo(req.body);
    if (data.status === 200) {
      res.status(200).json(data.newUser);
    } else if (data.status === 400) {
      res.status(400).json(data.error);
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    const deleteProccess = await deleteFilm(id);
    if (deleteProccess.status === 200) {
      res.status(200).json(deleteProccess);
    } else if (deleteProccess.status === 400) {
      res.status(400).json(deleteProccess.error);
    }
  } else {
    res.status(404).send("مسیر مورد نظر یافت نشد!");
  }
}
