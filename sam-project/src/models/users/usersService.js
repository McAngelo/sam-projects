"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const uuid_1 = require("uuid");
class UsersService {
    getAll() {
        return [{
                id: uuid_1.v4(),
                email: "jane@doe.com",
                name: "Jane Doe",
                status: "Happy",
                phoneNumbers: [],
            }];
    }
    get(id, name) {
        return {
            id,
            email: "jane@doe.com",
            name: name !== null && name !== void 0 ? name : "Jane Doe",
            status: "Happy",
            phoneNumbers: [],
        };
    }
    create(userCreationParams) {
        return Object.assign({ id: uuid_1.v4(), status: "Happy" }, userCreationParams);
    }
}
exports.UsersService = UsersService;
