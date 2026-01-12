import { InternalServerErrorException } from "@nestjs/common";

export class StorageFailureError extends InternalServerErrorException {
    constructor() {
        super("An error occurred while saving the file to the storage provider");
    }
}