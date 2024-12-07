import { DeepRequired } from 'react-hook-form'
import { components, paths } from './schema'

declare namespace Directory {
  type Item = DeepRequired<components['schemas']['GetAllDirectoriesDirectoryDto']>

  declare namespace Request {
    /** POST /api/v2/directories
     * 디렉토리 생성
     */
    type CreateDirectory = DeepRequired<
      paths['/api/v2/directories']['post']['requestBody']['content']['application/json;charset=UTF-8']
    >

    /** PATCH /api/v2/directories/{directory_id}/update-info
     * 디렉토리 정보 변경
     */
    type UpdateDirectoryInfo = DeepRequired<
      paths['/api/v2/directories/{directory_id}/update-info']['patch']['requestBody']['content']['application/json;charset=UTF-8']
    >
  }

  declare namespace Response {
    /** GET /api/v2/directories
     * 모든 디렉토리 가져오기
     */
    type GetDirectories = DeepRequired<
      paths['/api/v2/directories']['get']['responses']['200']['content']['application/json;charset=UTF-8']
    >

    /** GET /api/v2/directories/{directory_id}
     * directory_id로 디렉토리 가져오기
     */
    type GetDirectory = DeepRequired<
      paths['/api/v2/directories/{directory_id}']['get']['responses']['200']['content']['application/json;charset=UTF-8']
    >

    /** POST /api/v2/directories
     * 디렉토리 생성
     */
    type CreateDirectory = DeepRequired<
      paths['/api/v2/directories']['post']['responses']['201']['content']['application/json;charset=UTF-8']
    >
  }
}
