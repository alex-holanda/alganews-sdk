import { AxiosError } from "axios";
import { ErrorData } from "../CustomError";
import {
  BusinessError,
  ERRORS,
  ForbiddenError,
  InvalidParameterError,
  ResourceNotFoundError,
  SystemError,
} from "../errors";
import IncomprehensibleMessageError from "../errors/IncomprehensibleMessage.error";
import InvalidDataError from "../errors/InvalidData.error";

export default function handleAxiosResponseError(error: AxiosError<ErrorData>) {
  const { response } = error;

  if (response?.data.type) {
    const { type } = response.data;
    const { data } = response;

    if (type === ERRORS.FORBIDDEN) throw new ForbiddenError(data);
    if (type === ERRORS.BUSINESS_ERROR) throw new BusinessError(data);
    if (type === ERRORS.INVALID_DATA) throw new InvalidDataError(data);
    if (type === ERRORS.SYSTEM_ERROR) throw new SystemError(data);
    if (type === ERRORS.INCOMPREHENSIBLE_MESSAGE)
      throw new IncomprehensibleMessageError(data);
    if (type === ERRORS.INVALID_PARAMETER)
      throw new InvalidParameterError(data);
    if (type === ERRORS.RESOURCE_NOT_FOUND)
      throw new ResourceNotFoundError(data);
  }

  throw error;
}
