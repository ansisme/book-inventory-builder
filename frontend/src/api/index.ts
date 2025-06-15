// export class APIClient {
//   private apiMethods = {
//     GET: getAPI,
//     POST: postAPI,
//     PUT: putAPI,
//     DELETE: deleteAPI,
//   }
//   async request(method: keyof typeof this.apiMethods, endpoint: string, ...args: any[]) {
//     try {
//       const apiFunction = this.apiMethods[method]
//       if (!apiFunction) throw new Error(`Unsupported HTTP method: ${method}`)
//       return await apiFunction(endpoint, ...(args as [any]))
//     } catch (error) {
//       console.error(`API Error: ${endpoint}`, error)
//       return { success: false, error }
//     }
//   }

//   protected get(endpoint: string, data?: any, headers?: any) {
//     return this.request("GET", endpoint, data, headers)
//   }

//   protected post(endpoint: string, data?: any, headers?: any) {
//     return this.request("POST", endpoint, data, headers)
//   }

//   protected put(endpoint: string, data?: any, headers?: any) {
//     return this.request("PUT", endpoint, data, headers)
//   }

//   protected delete(endpoint: string, data?: any, headers?: any) {
//     return this.request("DELETE", endpoint, data, headers)
//   }
// }
