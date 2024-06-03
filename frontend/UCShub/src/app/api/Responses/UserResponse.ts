import { User } from "../../models/User";
import { BaseResponse } from "./BaseResponse";

export class UserResponse extends BaseResponse {
    user!: User;
}