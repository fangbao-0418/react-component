
declare module 'ali-oss' {
  interface OSSConfig {
    accessKeyId: string
    accessKeySecret: string
    stsToken?: string
    bucket?: string
    endpoint?: string
    region?: string
    internal?: boolean
    secure?: boolean
    timeout?: boolean
  }
  export interface CheckPoint {
    file: File
    name: string
    fileSize: number
    partSize: number
    uploadId: string
    doneParts: Array<{number: number, etag: string}>
  }
  export interface Client {
    multipartUpload: <T, S>(name: string, file: string | File, options?: T) => S
    cancel: <T>() => T
    abortMultipartUpload: <T>(name: string, uploadId: string) => T
    delete: <T>(name: string) => T
    deleteMulti: (names: string[]) => void
  }
  export function Wrapper (config: OSSConfig): Client
  export default function client (config: OSSConfig): Client
}
