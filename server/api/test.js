const materials = [
    {type: 'straw', strength: 1},
    {type: 'wood', strength: 1},
    {type: 'brick', strength: 1}
]

function printMaterials (materialsArray) {
    let i = 0;
    materialsArray.forEach(material => {
        console.log(`${material.type} - ${material.strength}`);
        i++
    });
}

function getStrengthOfMaterial (materialArray, type) {
    let returnedType;
    for (let index = 0; index < materialArray.length; index++) {
        if (materialArray[i].type === type ) {return returnedType = materialArray[i].strength}
        else {return 0}
    }
    return returnedType
}