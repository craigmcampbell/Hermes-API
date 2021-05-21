import JsonApiError from './JsonApiError';

export default class JsonApiResponse {
    data?: any;
    errors?: Array<JsonApiError>;

    constructor(dto?: any, errors?: Array<JsonApiError>) {
        this.data = dto;
        this.errors = errors;
    }
}