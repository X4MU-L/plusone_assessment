import { getTags, ServerError } from "../../utils";
import { Request, Response } from "express";
async function handleFetchTags(req: Request, res: Response) {
  try {
    const tags = await getTags();
    res.status(200).send({
      tags,
      success: true,
      message: "tags fetched successfully",
    });
  } catch (error) {
    if (error instanceof ServerError) {
      const serverError = error as ServerError;
      res.status(serverError.statusCode).send({
        success: false,
        message: serverError.message,
        status: "error",
        statusCode: serverError.statusCode,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "internal server error",
        status: "error",
        statusCode: 500,
      });
    }
  }
}

export { handleFetchTags };
