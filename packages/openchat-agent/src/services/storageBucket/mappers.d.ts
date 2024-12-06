import type { CandidDeleteFileResponse, CandidFileInfoResponse, CandidForwardFileResponse, CandidUploadChunkResponse } from "./candid/idl";
import type { DeleteFileResponse, FileInfoResponse, ForwardFileResponse, UploadChunkResponse } from "openchat-shared";
export declare function uploadChunkResponse(candid: CandidUploadChunkResponse): UploadChunkResponse;
export declare function forwardFileResponse(candid: CandidForwardFileResponse): ForwardFileResponse;
export declare function deleteFileResponse(candid: CandidDeleteFileResponse): DeleteFileResponse;
export declare function fileInfoResponse(candid: CandidFileInfoResponse): FileInfoResponse;
