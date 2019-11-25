import { Done } from "mocha"
import { expect } from "chai";

import { getPublic, getPrivate } from "../ip-utility";

describe("Test public ip", function (): void {
        
        it("AJAX work correctly", async function (done: Done): Promise<void> {
                try {
                        expect(await getPublic()).is.a.instanceof(String);
                } catch (err) {
                        done(err);
                }
        });

})

describe("Test private ip", function (): void {

})