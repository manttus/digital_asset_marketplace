type RequestConfig = {
  url: string;
  method?: string;
  headers?: any;
  body?: any;
};

const useHttp = <T>(
  requestConfig: RequestConfig,
  handler: (data: T) => void
) => {
  const sendRequest = async () => {
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: requestConfig.body,
      });
      const data = await response.json();
      handler(data);
    } catch (err) {
      console.log(err);
    }
  };
  return {
    sendRequest,
  };
};

export default useHttp;
