import axios from "axios";
import AppConstants from "../utils/AppConstants";

axios.defaults.headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const DEFAULT_TIMEOUT = 120000;

export const axiosClient = axios.create({
  timeout: 1000 * 120,
});

export const GetClient = async (
  url,
  params = null,
  errorMessage = true,
  baseURL = AppConstants.BASE_URL,
  extraParams = {}
) => {
  let source = axios.CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, DEFAULT_TIMEOUT);
  axiosClient.defaults.cancelToken = source.token;

  return new Promise((resolve) => {
    axiosClient
      .get(baseURL + url, params)
      .then((response) => {
        let {
          status = false,
          message = "",
          data,
          error,
          index = 1,
          requested_at = 1,
          recordsTotal = 0,
        } = resHandle(response);
        let returnObj = {
          data: null,
          error: null,
        };
        if (status && !error) {
          returnObj.data = data;
          returnObj.index = index;
          returnObj.requested_at = requested_at;
          returnObj.recordsTotal = recordsTotal;
        } else if (status && error) {
          // do nothing skin error toast from backend case
          returnObj.error = message;
        } else {
          returnObj.error = message;
        }
        //resolve promise
        resolve(returnObj);
      })
      .catch((error) => {
        console.log("Api error : " + baseURL + url, error);
        resolve({ error: error.message, status: error?.response?.status });
      });
  });
};

export const PostClient = async (
  url,
  params = null,
  baseURL = AppConstants.BASE_URL,
  extraParams = {}
) => {
  let source = axios.CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, DEFAULT_TIMEOUT);
  axiosClient.defaults.cancelToken = source.token;

  return new Promise((resolve) => {
    axiosClient
      .post(baseURL + url, JSON.stringify(params))
      .then((response) => {
        let {
          status,
          message,
          data,
          code,
          requestId,
          ts_trans_id,
          service_used,
        } = resHandle(response);
        let returnObj = {
          data: null,
          message: message,
          error: null,
          code: code,
          status: status,
        };
        if (status) {
          returnObj.data = data;
          returnObj.ts_trans_id = ts_trans_id;
          returnObj.requestId = requestId;
          returnObj.service_used = service_used;
        } else {
          returnObj.error = message;
        }
        //resolve promise
        resolve(returnObj);
      })
      .catch((error) => {
        console.log("Api error : " + baseURL + url, error);
        resolve({ error: error.message });
      });
  });
};

export const PatchClient = async (
  url,
  params = null,
  baseURL = AppConstants.BASE_URL
) => {
  let source = axios.CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, DEFAULT_TIMEOUT);
  axiosClient.defaults.cancelToken = source.token;

  return new Promise((resolve) => {
    axiosClient
      .patch(baseURL + url, JSON.stringify(params))
      .then((response) => {
        let { status, message, data, code } = resHandle(response);
        let returnObj = {
          data: null,
          error: null,
          code,
        };
        if (status) {
          returnObj.data = data;
        } else {
          returnObj.error = message;
        }
        //resolve promise
        resolve(returnObj);
      })
      .catch((error) => {
        console.log("Api error : " + url, error);
        resolve({ error: error.message });
      });
  });
};

export const PutClient = async (
  url,
  params = null,
  baseURL = AppConstants.BASE_URL
) => {
  let source = axios.CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, DEFAULT_TIMEOUT);
  axiosClient.defaults.cancelToken = source.token;

  return new Promise((resolve) => {
    axiosClient
      .put(baseURL + url, JSON.stringify(params))
      .then((response) => {
        let { status, message, data } = resHandle(response);
        let returnObj = {
          data: null,
          error: null,
        };
        if (status) {
          returnObj.data = data;
        } else {
          returnObj.error = message;
        }
        //resolve promise
        resolve(returnObj);
      })
      .catch((error) => {
        console.log("Api error : ", baseURL + url, error);
        resolve({ error: error.message });
      });
  });
};
const resHandle = (res) => {
  let status = res?.status === 200;
  let message = res?.data.message || res?.message || "";
  let recordsTotal = res?.data?.recordsTotal || "";
  let error = res?.data?.error || false;
  let data;

  if (status && !error) {
    data = res?.data.data || res?.data;
  } else {
    data = res?.data.data || res?.data.message;
  }
  console.log(res, message);
  return { status, message, data, error, recordsTotal };
};
