import { KycResult } from "../../../server/controller/UsersController";

export default async (req, res) => {
  const { OTP, ID } = req.body;

  const data = await KycResult({ OTP, ID });
  res.status(200).json(data);
};
