import ApiError from "./api-error";

class ResourceDuplicated extends ApiError {
  constructor(resourceType: string, attribute: string) {
    super(400, `${resourceType} with this ${attribute} already exists`);
    Object.setPrototypeOf(this, ResourceDuplicated.prototype);
  }
}

export default ResourceDuplicated;
