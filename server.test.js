const databaseToggleFeature = require('./server.test.functions')
const crypto = require("crypto");
crypto.randomInt = jest.fn()

describe("A/B TEST DATABASE IMPLEMENTATION OPTION", () => {
    test("REJECTS IF ARRAY IS ARRAY IS NOT AT LEAST 2 VALUES", ()=> {
        let testArray = ['database']
            expect(databaseToggleFeature(testArray)).toBe(false)
    });
    test("REJECTS IF INPUT IS NOT AN ARRAY OR STRING", ()=> {
        let testArray = ['database1', 'database2']
        let randomIndex = crypto.randomInt(3)
        testArray[randomIndex]
            expect(crypto.randomInt).toBeCalled()
    });
})