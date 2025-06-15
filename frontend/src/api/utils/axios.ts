import axios from "axios";
export const node_api = axios.create({
  baseURL: import.meta.env.NODE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

class Server {
  get(route: string, headers?: any) {
    return node_api.get(route, { headers });
  }
  put(route: string, data: any, headers?: any) {
    return node_api.put(route, data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...headers,
      },
    });
  }
  delete(route: string, data: any, headers?: any) {
    return node_api.delete(route, {
      data: data,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...headers,
      },
    });
  }
  post(route: string, data: any, headers?: any) {
    return node_api.post(route, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...headers,
      },
    });
  }
  postFile(route: string, data: any, headers?: any) {
    return node_api.post(route, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...headers,
      },
    });
  }
}

export { Server };
