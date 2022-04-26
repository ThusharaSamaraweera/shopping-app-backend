import { ForbiddenError } from 'apollo-server-express';
import {AppConstants} from '../constants/app.constants';
import {ErrorConstants} from '../constants/errors.constants';

export function VerifyAuthorization(
  _target: any,
  _propertyKey: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>
) {
  const fn = descriptor.value!;
  descriptor.value = async function DescriptorValue(...args: any[]) {
    try {
      if (!args[0][AppConstants.IS_USER_LOGIN]) {
        throw new ForbiddenError(ErrorConstants.USER_NOT_AUTHORIZED);
      }
      return await fn.apply(this, args);
    } catch (error) {
      throw new Error(error);
    }
  };
  return descriptor;
}

export function VerifyAdminAuthorization(
  _target: any,
  _propertyKey: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>
) {
  const fn = descriptor.value!;
  descriptor.value = async function DescriptorValue(...args: any[]) {
    try {
      if (args[0][AppConstants.IS_USER_LOGIN] || args[0][AppConstants.TYPE] !== 'admin') {
        throw new ForbiddenError(ErrorConstants.USER_NOT_AUTHORIZED);
      }
      return await fn.apply(this, args);
    } catch (error) {
      throw new Error(error);
    }
  };
  return descriptor;
}