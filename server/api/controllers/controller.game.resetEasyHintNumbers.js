const asyncHandler = require("express-async-handler");
const {resetEasyHintNumbersEvent} = require('../../functions/event-emitters')

const resetEasyHintNumbers = asyncHandler(async (req) => {
    let resetLowestNumberBackTo0000 =   await req.body.resetLowestNumberBackTo0000;
    let resetHighestNumberBackTo9999 =  await req.body.resetHighestNumberBackTo9999;
   
    let convertLowNumberToNumber =       Number(resetLowestNumberBackTo0000);
    let convertHighNumberToNumber =      Number(resetHighestNumberBackTo9999);
    
    lowestNumberAfterReset =       convertLowNumberToNumber;
    highestNumberAfterReset =      convertHighNumberToNumber;
    
    resetEasyHintNumbersEvent.emit("resetHighAndLowNumbersToOriginalValue", lowestNumberAfterReset, highestNumberAfterReset);
});

module.exports = resetEasyHintNumbers