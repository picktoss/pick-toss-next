interface DirectoryItem {
  id: number
  name: string
  tag: string
  emoji: string
}

interface CreateDirectoryPayload {
  name: string
  emoji: string
}

interface UpdateDirectoryInfoPayload {
  name: string
  emoji: string
}

interface GetDirectoriesResponse {
  directories: DirectoryItem[]
}

interface GetDirectoryResponse {
  directories: DirectoryItem
}

declare namespace Directory {
  type Item = DirectoryItem
  type List = DirectoryItem[]

  declare namespace Request {
    /** POST /api/v2/directories
     * 디렉토리 생성
     */
    type CreateDirectory = CreateDirectoryPayload

    /** PATCH /api/v2/directories/{directory_id}/update-info
     * 디렉토리 정보 변경
     */
    type UpdateDirectoryInfo = UpdateDirectoryInfoPayload
  }

  declare namespace Response {
    /** GET /api/v2/directories
     * 모든 디렉토리 가져오기
     */
    type GetDirectories = GetDirectoriesResponse

    /** GET /api/v2/directories/{directory_id}
     * directory_id로 디렉토리 가져오기
     */
    type GetDirectory = GetDirectoryResponse

    /** POST /api/v2/directories
     * 디렉토리 생성
     */
    type CreateDirectory = DirectoryItem['id']
  }
}
