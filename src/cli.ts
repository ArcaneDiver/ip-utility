#!/usr/bin/env node

import chalk from "chalk";
import meow from "meow";

import { getPublic, getPrivate } from "./ip-utility";

( async function () {
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
                                private: {
                                        type: "boolean",
                                }
                        }
                }
        );

        if (cli.flags.public && cli.flags.private) {
                console.log(cli.help);
                console.log(chalk.bold(chalk.red("Insert just one property")));
        } else if (cli.flags.public) {
                console.log(chalk.yellow("Public IP:"), chalk.bold(await getPublic()));
        } else if (cli.flags.private) {
                console.log(chalk.green("Private IP:"), chalk.bold(getPrivate()));
        } else {
                console.log(cli.help);
        }
})()