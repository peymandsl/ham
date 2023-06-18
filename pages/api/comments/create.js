import { CreateComment } from "../../../server/controller/EventController";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const comment = await CreateComment(req.body);

    res.status(200).json(comment);
  }
}
