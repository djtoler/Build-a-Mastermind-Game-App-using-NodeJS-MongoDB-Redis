const number_default = {type: Number, default: 0}
const boolean_default = {type: Boolean, default: false}
const string_default = {type: String, unique: false, lowercase: true}
const string_required = {type: String, unique: false, lowercase: true, required: true}

module.exports = {
    number_default,
    boolean_default,
    string_default,
    string_required
}
