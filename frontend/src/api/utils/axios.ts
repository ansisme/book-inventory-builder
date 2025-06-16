import axios from "axios"
export const node_api = axios.create({
  baseURL: import.meta.env.VITE_NODE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
})

class Server {
  get(route: string, headers?: any) {
    return node_api.get(route, { headers })
  }
  put(route: string, data: any, headers?: any) {
    return node_api.put(route, data, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...headers,
      },
    })
  }
  delete(route: string, data: any, headers?: any) {
    return node_api.delete(route, {
      data: data,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...headers,
      },
    })
  }
  post(route: string, data: any, headers?: any) {
    const isFormData = data instanceof FormData

    return node_api.post(route, isFormData ? data : JSON.stringify(data), {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
        "Access-Control-Allow-Origin": "*",
        ...headers,
      },
    })
  }

  postFile(route: string, data: any) {
    return node_api.post(route, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    })
  }
}

export { Server }
