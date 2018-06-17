import { Depict } from "./depict";
import { EntityLog } from "./entity-log";

export class Entity {
    id: number;
    qwd: number;
    image: string;
    labels: string[];
    keywords: string[];
    status: string;
    createDate: string;
    depicts: Depict[];
    logs: EntityLog[];
}