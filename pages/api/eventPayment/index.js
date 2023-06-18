// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AddParticipant } from "../../../server/controller/EventParticipantController";

export default async (req, res) => {
  const { participant, event_id, payment_price } = req.body;

  const data = await AddParticipant({
    participant,
    event_id,
    payment_price,
  });
  if (data.status === "ERROR") {
    return res.status(604).send(data.message);
  } else {
    return res.status(200).json(data.message);
  }
};
