type RequestConfig = {
  url: string;
  method?: string;
  headers?: any;
  body?: any;
};

type Handler = (data: any) => void;

const useHttp = (requestConfig: RequestConfig, handler: Handler) => {
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
