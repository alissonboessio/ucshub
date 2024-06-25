import { Project } from "../../models/Project";
import { BaseResponse } from "./BaseResponse";

export class ProjectResponse extends BaseResponse {
    project!: Project;
}