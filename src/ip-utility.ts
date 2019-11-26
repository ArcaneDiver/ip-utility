import axios from "axios";
import { NetworkInterfaceInfo, networkInterfaces } from "os";

import { subStringInArrOfStr } from "./utility";

export async function getPublic(): Promise<string> {
        return (await axios.get(`https://api.myip.com`)).data.ip;
}

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

export function getPrivate(options: IPrivateOptions): ILocalWebInterfaces {
        const interfaces: { [index: string]: NetworkInterfaceInfo[] } = networkInterfaces();
        const iKeys: string[] = Object.keys(interfaces);

        const res: ILocalWebInterfaces = {};

        if (options.wifi) {
                const wifiInterfacesName: string[] = subStringInArrOfStr(iKeys, "Wi-Fi");

                if (wifiInterfacesName.length > 0) {
                        res.wifi = wifiInterfacesName.map<IWebInterface>((interfaceName: string): IWebInterface => {
                                const interfaceData: IWebInterface = {};

                                interfaces[interfaceName].map((i: NetworkInterfaceInfo): void => {
                                        if (i.internal) {
                                                return;
                                        }

                                        interfaceData.mac = i.mac;

                                        interfaceData.ip = new Object();
                                        interfaceData.ip[i.family === "IPv4" ? "v4" : "v6"] = i.address;

                                });

                                return interfaceData;
                        });
                } else {
                        throw new Error("There isn`t any wifi interface used");
                }
        }

        if (options.ethernet) {
                const ethernetInterfacesName: string[] = subStringInArrOfStr(iKeys, "Ethernet");

                if (ethernetInterfacesName.length > 0) {
                        res.ethernet = ethernetInterfacesName.map((interfaceName: string) => {
                                const interfaceData: IWebInterface = {};

                                interfaces[interfaceName].map((i: NetworkInterfaceInfo): void => {
                                        if (i.internal) {
                                                return;
                                        }

                                        interfaceData.mac = i.mac;

                                        interfaceData.ip = new Object();
                                        interfaceData.ip[i.family === "IPv4" ? "v4" : "v6"] = i.address;

                                });

                                return interfaceData;
                        });
                } else {
                        throw new Error("There isn`t any ethernet interface used");
                }
        }

        return res;
}
