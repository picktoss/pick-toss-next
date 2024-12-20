import { GlobalWorkerOptions } from 'pdfjs-dist'

// Web Worker 경로 설정
GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
