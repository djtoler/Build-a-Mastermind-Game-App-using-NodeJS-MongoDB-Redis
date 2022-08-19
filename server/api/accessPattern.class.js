class accessPattern {
    constructor(AccessPattern, AccessPatternPriority, AccessPatternDetails, AccessDataQueryConfigs ) {
        this.AccessPattern = AccessPattern;
        this.AccessPatternPriority = AccessPatternPriority;
        this.AccessPatternDetails = AccessPatternDetails;
        this.AccessDataQueryConfigs = AccessDataQueryConfigs;
    }
}

class accessPatternBuilder {
    discoverAccessPattern (verb, adjective = null, noun, condition = null) {
        this.verb = verb;
        this.adjective = adjective;
        this.noun = noun;
        this.condition = condition;
        return this
    }
    setAccessPatternPriority(Priority) {
        this.Priority = Priority
        return this
    }
    setAccessPatternDetails(ReadOrWrite, Description, ItemCatagory) {
        this.ReadOrWrite = ReadOrWrite;
        this.Description = Description;
        this.ItemCatagory = ItemCatagory
        return this
    }
    setAccessDataQueryConfigs(Filters = undefined, ResultOrdering = undefined) {
        this.Filters = Filters
        this.ResultOrdering = ResultOrdering
        return this
    }
    buildNewAccessPattern() {
        return new accessPattern(
            `${this.verb} ${this.adjective} ${this.noun} ${this.condition}`,
            this.Priority,
            {ReadOrWrite: this.ReadOrWrite, Description: this.Description, ItemCatagory:  this.ItemCatagory},
            {Filters: this.Filters, OrderOfResults:this.ResultOrdering }
        );
    }
}

module.exports = accessPatternBuilder
































// function discoverAccessPatterns(verb, adjective = null, noun, condition = null) {
//     if (!adjective && !condition) {
//         const newAccessPatternConstructor = `${verb} ${noun}`
//         return newAccessPatternConstructor
//     }
//     if (!adjective) {
//         const newAccessPatternConstructor = `${verb} ${noun} ${condition}`
//         return newAccessPatternConstructor
//     }
//     if (!condition) {
//         const newAccessPatternConstructor = `${verb} ${adjective} ${noun}`
//         return newAccessPatternConstructor
//     }
//     const newAccessPatternConstructor = `${verb} ${adjective} ${noun} ${condition}`
//     return newAccessPatternConstructor
// }