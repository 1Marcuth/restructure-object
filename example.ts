import resctructureObject, { AnyObject } from "./src"

let obj = {
    name: "John Doe",
    age: "30",
    country: "USA",
    email: "john.doe@example.com",
    isActive: true
}

const obj2 = resctructureObject({
    rawObject: obj,
    fieldsToAdd: [
        ["Oi", true]
    ],
    fieldsToConvertValue: [
        ["age", Number]
    ],
    keysToRemove: [
        "isActive"
    ],
    keysToRename: [
        ["country", "countryCode"]
    ]
})

console.log(obj2)