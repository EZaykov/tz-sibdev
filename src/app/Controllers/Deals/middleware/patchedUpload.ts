import * as multer from "multer";
import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";

const CSV_FIELD_NAME = "csv";
const upload = multer().single(CSV_FIELD_NAME);

function patchedUpload() {
  const original = upload;
  return function (this: any, req: Request, res: Response, next: NextFunction) {
    next = patchedNext(next, req);
    return original.apply(this, [req, res, next]);
  };

  function patchedNext(originalNext: NextFunction, req: Request): NextFunction {
    return function (this: any) {
      let err: null | Error = arguments[0];
      if (err instanceof MulterError && err.message === "Unexpected field")
        err.message = `"${CSV_FIELD_NAME}" field is missing!`;
      const patchedReq: PatchedRequest = req as any;
      patchedReq.uploadError = err;
      return originalNext.apply(this);
    };
  }
}

export type PatchedRequest = Request & { uploadError: Error | null };

export default patchedUpload();
