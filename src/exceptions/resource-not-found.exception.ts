import ApiError from "./api-error";

class ResourceNotFound extends ApiError {
  constructor(resourceType: string, id: string) {
    super(404, `${resourceType} not found for id = ${id}`);
    Object.setPrototypeOf(this, ResourceNotFound.prototype);
  }
}

export default ResourceNotFound;
