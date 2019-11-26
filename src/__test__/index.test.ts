import { expect } from "chai";
import { Done } from "mocha";

import { getPrivate, getPublic, ILocalWebInterfaces } from "../ip-utility";

describe("Test public ip", (): void => {
        it("AJAX work correctly", async (done: Done): Promise<void> => {
                try {
                        expect(await getPublic()).is.a.instanceof(String);
                } catch (err) {
                        done(err);
                }
        });

});

describe("Test private ip", (): void => {
        it("Get interfaces info", () => {
                const res: ILocalWebInterfaces = getPrivate({
                        ethernet: true,
                        wifi: true,
                });
        });
});
