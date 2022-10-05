const asyncHandler = require("express-async-handler");
const {resetEasyHintNumbersEvent} = require('../../functions/event-emitters')

const resetEasyHintNumbers = asyncHandler(async (req) => {
    console.log('inside reset easy hint event');
    console.log(req.body);
    let resetLowestNumberBackTo0000 =       await req.body.resetLowestNumberBackTo0000;
    let resetHighestNumberBackTo7777 =      await req.body.resetHighestNumberBackTo7777;
   
    let convertLowNumberToNumber =          Number(resetLowestNumberBackTo0000);
    let convertHighNumberToNumber =         Number(resetHighestNumberBackTo7777);
    
    lowestNumberAfterReset =                convertLowNumberToNumber;
    highestNumberAfterReset =               convertHighNumberToNumber;
    
    resetEasyHintNumbersEvent.emit("resetHighAndLowNumbersToOriginalValue", lowestNumberAfterReset, highestNumberAfterReset);
});

module.exports = resetEasyHintNumbers