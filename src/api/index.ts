import * as apiConfig from "./api";
import requestControl from "@/utils/request";

const { post, get } = apiConfig;
type AllApi<T> = {
  [K in keyof T]: (data?: any, cb?: Function) => Promise<any>;
};
type Request = AllApi<typeof post> & AllApi<typeof get>;

export const handleRequestControl: () => Partial<Request> = () => {
  const result: Partial<Request> = {};
  for (const method in apiConfig) {
    for (const key in apiConfig[method]) {
      result[key] = (data, cb?) =>
        requestControl(
          {
            url: apiConfig[method][key],
            method: method,
          },
          data,
          cb
        );
    }
  }
  return result;
};

export default handleRequestControl();
