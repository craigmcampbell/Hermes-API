export default class JsonApiErrorSource {
    pointer: string;
    parameter: string;

    constructor(pointer: string, parameter: string) {
        this.pointer = pointer;
        this.parameter = parameter;
    }
}