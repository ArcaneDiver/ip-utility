import { expect } from "chai";
import { Done } from "mocha";
import os from "os";

import axios from "axios";

import { isString } from "../../src/utility";

import { getPrivate, getPublic } from "../../src/ip-utility";

describe("Test public ip", (): void => {
        it("AJAX work correctly", (done: Done): void => {
                console.log(os.networkInterfaces());
                getPublic()
                        .then((ip: string) => {
                                expect(ip).to.be.a("string");
                                done();
                        })
                        .catch(done);
        });

});

describe("Test private ip", (): void => {
        it("Get interfaces info", (): void => {
                const res = getPrivate({
                        ethernet: true,
                        wifi: true,
                });
        });
});
