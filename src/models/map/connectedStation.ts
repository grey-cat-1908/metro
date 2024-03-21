import {ExtraBranch} from "./extraBranch.ts";

interface ConnectedStationInterface {
    name: string;
    branch: ExtraBranch;
}

export class ConnectedStation implements  ConnectedStationInterface {
    name: string;
    branch: ExtraBranch;

    constructor(name: string, branch: ExtraBranch) {
        this.name = name;
        this.branch = branch;
    }
}