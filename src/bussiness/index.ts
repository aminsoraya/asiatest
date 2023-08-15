export interface IApiResponse {
  status: number;
  message: string;
  data: any;
}

export interface IResponseMessage {
  message: string;
  type: EnumResponseStatus;
}
export enum EnumResponseStatus {
  invalid = 0,
  valid = 1,
}

export interface IVehicle {
  id: number;
  name: string;
}
export const ConvertEnNumToPe = (num: any) => {
  return num
    ?.toString()
    .replace(/0/g, "۰")
    .replace(/1/g, "۱")
    .replace(/2/g, "۲")
    .replace(/3/g, "۳")
    .replace(/4/g, "۴")
    .replace(/5/g, "۵")
    .replace(/6/g, "۶")
    .replace(/7/g, "۷")
    .replace(/8/g, "۸")
    .replace(/9/g, "۹");
};
