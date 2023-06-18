import { CreateCours } from "../../../../server/controller/CoursController";

export default async (req, res) => {
  const coursData = { ...req.body };

  const {
    certificate,
    coursSubjects,
    cours_capacity,
    cours_instructor,
    cours_owner,
    cours_price,
    cours_summery,
    cours_summery_continue,
    cours_title,
    cours_type,
    discount_code,
    discount_percent,
    endEventDate,
    enterance_rules,
    essentialEq,
    coursBanner,
    hard_ship,
    last_second,
    register_deadline,
    selectCity,
    selectState,
    startEventDate,
    stayingLocation,
    tavel_start_description,
    travel_days,
  } = req.body;
  const data = await CreateCours({
    certificate,
    coursSubjects,
    cours_capacity,
    cours_instructor,
    cours_owner,
    cours_price,
    cours_summery,
    cours_summery_continue,
    cours_title,
    cours_type,
    discount_code,
    discount_percent,
    endEventDate,
    enterance_rules,
    essentialEq,
    coursBanner,
    hard_ship,
    last_second,
    register_deadline,
    selectCity,
    selectState,
    startEventDate,
    stayingLocation,
    tavel_start_description,
    travel_days,
  });
  res.status(200).json(data);
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};
