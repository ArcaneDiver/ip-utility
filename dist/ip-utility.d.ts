export declare function getPublic(): Promise<string>;
export interface IWebInterface extends Object {
    ip?: {
        v4?: string | undefined;
        v6?: string | undefined;
    };
    mac?: string;
}
export interface ILocalWebInterfaces extends Object {
    wifi?: IWebInterface[] | IWebInterface;
    ethernet?: IWebInterface[] | IWebInterface;
}
export interface IPrivateOptions extends Object {
    wifi?: boolean;
    ethernet?: boolean;
}
export declare function getPrivate(options: IPrivateOptions): ILocalWebInterfaces;
