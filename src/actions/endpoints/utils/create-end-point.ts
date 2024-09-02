import { Endpoint } from '../types'

export const createEndPoint = ({ url, method, auth = false }: Endpoint) => ({
  url,
  method,
  auth,
})
