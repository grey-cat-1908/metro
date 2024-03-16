interface ExtraBranchInterface {
    name: string;
    color: string;
    number: number;
}

export class ExtraBranch implements ExtraBranchInterface {
    name: string;
    color: string;
    number: number;

    constructor(name: string, color: string, number: number) {
        this.name = name;
        this.color = color;
        this.number = number;
    }
}