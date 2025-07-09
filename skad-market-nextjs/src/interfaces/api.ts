export interface IBaseResponse {
  errors: string[] | []
  statusCode: 'Success' | 'Error'
  succeeded: boolean
}
