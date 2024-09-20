import { UserType } from "@/db";
import { BaseResponse } from "@/helpers";
import { ProfileSchema, profileSchema } from "@/validations";

const getProfile = (jsonData: UserType | undefined) => {
  const result = profileSchema.parse(jsonData);

  return new BaseResponse<ProfileSchema>(200, result);
};

export { getProfile };
