import { Production } from "../../models/Production";
import { BaseResponse } from "./BaseResponse";

export class ProductionResponse extends BaseResponse {
    production!: Production;
}