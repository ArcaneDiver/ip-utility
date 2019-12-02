#!/usr/bin/env node

import chalk from "chalk";
import meow from "meow";

import { getPrivate, getPublic } from "./ip-utility";

( async () => {
        const cli = meow(
        `
        Options
                --public display your public IP
                --private display your private IP
        `,
                {
                        flags: {
                                public: {
                                        type: "boolean",
                                },
                                // tslint:disable-next-line: object-literal-sort-keys
                                private: {
                                        type: "boolean",
                                },
                        },
                },
        );

        if (cli.flags.public && cli.flags.private) {
                console.log(cli.help);
                console.log(chalk.bold(chalk.red("Insert just one property")));
        } else if (cli.flags.public) {
                console.log(chalk.yellow("Public IP:"), chalk.bold(await getPublic()));
        } else if (cli.flags.private) {
                // tslint:disable-next-line: max-line-length
                console.log(chalk.green("Private IP:"), chalk.bold(getPrivate().actual.ip.v4));
        } else {
                console.log(cli.help);
        }
})();
