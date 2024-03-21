interface ExtraBranchInterface {
    color: string;
    number: number;
}

export class ExtraBranch implements ExtraBranchInterface {
    color: string;
    number: number;

    constructor(color: string, number: number) {
        this.color = color;
        this.number = number;
    }
}