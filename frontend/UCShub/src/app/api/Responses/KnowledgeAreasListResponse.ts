import { KnowledgeArea } from "../../models/KnowledgeArea";
import { User } from "../../models/User";
import { BaseResponse } from "./BaseResponse";

export class KnowledgeAreasListResponse extends BaseResponse {
    knowledgeAreas!: Array<KnowledgeArea>;
}