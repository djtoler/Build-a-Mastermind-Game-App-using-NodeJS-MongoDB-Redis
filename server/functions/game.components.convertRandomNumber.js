const convertRandomNumber = async (apiResponse) => {
    apiResponse = apiResponse.data
    let randomNumber =  Number(apiResponse.replace(/[\n]/gm, ""));

    let i = randomNumber.toString().length
    if (i === 0) {randomNumber = 1000} 
    while (i < 4) {randomNumber  = randomNumber * 10; i++}
    
    const randomNumberConvertedString = randomNumber.toString()
    const randomNumberConvertedToArray = Array.from(String(randomNumber))
    return {randomNumber, randomNumberConvertedToArray, randomNumberConvertedString}
};

module.exports = convertRandomNumber