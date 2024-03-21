export interface BaseSettings {
    height: number;
    width: number;
}

export class Settings implements BaseSettings {
    height: number;
    width: number;

    constructor(width?: number, height?: number) {
        this.width = width || window.innerWidth;
        this.height = (height || (window.innerHeight / 2)) * 2;
    }

    public setValues(width?: number, height?: number) {
        this.width = width || this.width;
        this.height = height || this.height;
    }
}