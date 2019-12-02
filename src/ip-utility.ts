import axios from "axios";
import { v4, v6 } from "default-gateway";
import { NetworkInterfaceInfo, networkInterfaces } from "os";

import { subStringInArrOfStr } from "./utility";

function parseInterface(arg: ReadonlyArray<NetworkInterfaceInfo>): IWebInterface {
        const interfaceData: IWebInterface = { ip: {} };

        arg.map((i: NetworkInterfaceInfo): void => {
                if (i.internal) {
                        return;
                }

                interfaceData.mac = i.mac;

                interfaceData.ip = new Object();
                interfaceData.ip[i.family === "IPv4" ? "v4" : "v6"] = i.address;

        });

        return interfaceData;
}

/**
 * @returns a string that rappresent your actually public ip
 */
export async function getPublic(): Promise<string> {
        return (await axios.get(`https://api.myip.com`)).data.ip;
}

export interface IWebInterface extends Object {
        ip: {
                v4?: string | undefined;
                v6?: string | undefined;
        };
        mac?: string;
}

export interface ILocalWebInterfaces extends Object {
        wifi?: IWebInterface[] | IWebInterface;
        ethernet?: IWebInterface[] | IWebInterface;
        actual: IWebInterface;

}

export interface IPrivateOptions extends Object {
        wifi?: boolean;
        ethernet?: boolean;
}

/**
 * @param {IPrivateOptions} options which interface types you desider to recive
 */
export function getPrivate(options: IPrivateOptions = {}): ILocalWebInterfaces {
        const interfaces: { [index: string]: NetworkInterfaceInfo[] } = networkInterfaces();
        const iKeys: string[] = Object.keys(interfaces);

        try {
                const defaultInterface: any = v4.sync().interface;

                const res: ILocalWebInterfaces = {
                        actual: parseInterface(interfaces[defaultInterface]),
                };

                if (options.wifi) {
                        const wifiInterfacesName: string[] = subStringInArrOfStr(iKeys, "Wi-Fi");
                        if (wifiInterfacesName.length > 0) {

                                // tslint:disable-next-line: max-line-length
                                const result: IWebInterface[] = wifiInterfacesName.map<IWebInterface>((interfaceName: string): IWebInterface => parseInterface(interfaces[interfaceName]));

                                res.wifi = result.length === 1 ? result[0] : result;
                        } else {
                                throw new Error("There isn`t any wifi interface used");
                        }
                }

                if (options.ethernet) {
                        const ethernetInterfacesName: string[] = subStringInArrOfStr(iKeys, "Ethernet");

                        if (ethernetInterfacesName.length > 0) {
                                const result: IWebInterface[] = ethernetInterfacesName.map((interfaceName: string) => {
                                        const interfaceData: IWebInterface = { ip: {} };

                                        interfaces[interfaceName].map<void>((i: NetworkInterfaceInfo): void => {
                                                if (i.internal) {
                                                        return;
                                                }

                                                interfaceData.mac = i.mac;

                                                interfaceData.ip = new Object();
                                                interfaceData.ip[i.family === "IPv4" ? "v4" : "v6"] = i.address;

                                        });

                                        return interfaceData;
                                });
                                res.ethernet = result.length === 1 ? result[0] : result;
                        } else {
                                throw new Error("There isn`t any ethernet interface used");
                        }
                }

                return res;
        } catch (err) {
                throw new Error(err);
        }
}
