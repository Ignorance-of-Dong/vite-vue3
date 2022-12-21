import { errorMsgEnum } from "./enum";
import { ElMessage } from "element-plus";

// 请求发生错误
export const failedRequest = (err: any, reject: (reason?: any) => void) => {
  if (err.response) {
    if (err.response.status) {
      if (errorMsgEnum[err.response.status]) {
        ElMessage.error(errorMsgEnum[err.response.status]);
        reject(err);
      } else {
        ElMessage.error(err.message);
        reject(err);
      }
    }
  } else {
    if (err.code === "ECONNABORTED") {
      ElMessage.error(errorMsgEnum["timeout"]);
    }
    reject(err);
  }
};

export const errorResponse = (res, reject) => {
  // ...
};
