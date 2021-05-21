import JsonApiResponse from '../models/jsonApi/JsonApiResponse';
import JsonApiError from "../models/jsonApi/JsonApiError";
import JsonApiErrorSource from '../models/jsonApi/JsonApiErrorSource';

export const buildSuccessResponse = (dto:any) => {
    return new JsonApiResponse(dto, undefined);
}

export const buildErrorResponse = (status: string, title: string, detail: string, pointer: string, parameter: string) => {
    let errors = new Array<JsonApiError>();

    let apiError = new JsonApiError(status, title, detail, pointer, parameter);
    errors.push(apiError);

    console.log(errors);

    return new JsonApiResponse(undefined, errors);
}

export const buildErrorResponseFromExternal = (statusCode:string, title: string, response:JsonApiResponse) => {

    if(response.errors != undefined) {
        const initialError = response.errors[0];
        const errorSource = initialError.source != undefined ? initialError.source : new JsonApiErrorSource('', '');

        return buildErrorResponse(statusCode, title, initialError.detail, errorSource.pointer, errorSource.parameter);
    }
}
