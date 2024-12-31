const BaseResource = require('@r/resources/BaseResource');

class UserResource extends BaseResource {
  toJSON() {
    return {
      id: this.data.id,
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      name: `${this.data.firstName} ${this.data.lastName}`,
      email: this.data.email,
      createdAt: this.data.createdAt.toISOString(),
      updatedAt: this.data.updatedAt.toISOString(),
    };
  }
}

module.exports = UserResource;
