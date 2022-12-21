// 请求映射
enum methodsEnum {
  json = "post",
  post = "post",
  get = "get",
  upload = "post",
  download = "post",
}

// 错误码映射
enum errorMsgEnum {
  "用户尚未登录，即将跳转到登录页面" = 401,
  "当前用户权限无法执行操作" = 403,
  "未找到" = 404,
  "服务器发生错误" = 500,
  "服务器网关错误" = 502,
  "服务不可用" = 503,
  "服务器超时" = 504,
  "程序内部错误" = 10500,
  "参数错误" = 10400,
  timeout = "网络超时",
}

export { errorMsgEnum, methodsEnum };
