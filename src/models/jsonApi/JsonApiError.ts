import JsonApiErrorSource from './JsonApiErrorSource';

export default class JsonApiError {
    status: string;
    title: string;
    detail: string;
    source: JsonApiErrorSource;

    constructor(status: string, title: string, detail: string, pointer: string, parameter: string) {
        this.status = status;
        this.title = title;
        this.detail = detail;

        this.source = new JsonApiErrorSource(pointer, parameter);
    }
}