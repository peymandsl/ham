import { eventPriceFilter } from "../../../../server/controller/EventController";
export default async (req, res) => {
  const { priceRange, userID } = req.body;
  const data = await eventPriceFilter({ priceRange, userID });
  if (data.status === "ERROR") {
    return res.status(200).json(data);
  } else {
    return res.status(200).json(data);
  }
};
