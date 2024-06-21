export type AnyObject = { [key: string]: any }
export type KeyToRename = [string, string]
export type Field = [string, any]
export type FieldToConvertValue = [string, (value: any) => any]

function restructureObject(
    rawObject: AnyObject,
    keysToRename: KeyToRename[] = [],
    keysToRemove: string[] = [],
    fieldsToAdd: Field[] = [],
    fieldsToConvertValue: FieldToConvertValue[] = []
): AnyObject {
    const restructuredObject: AnyObject = {}

    keysToRename.forEach(([oldKey, newKey]) => {
        if (oldKey in rawObject) {
            restructuredObject[newKey] = rawObject[oldKey]
        }
    })

    Object.entries(rawObject).forEach(([key, value]) => {
        if (!keysToRemove.includes(key)) {
            const renamedKey = keysToRename.find(([oldKey]) => oldKey === key)?.[1]

            if (renamedKey) {
                restructuredObject[renamedKey] = value
            } else {
                restructuredObject[key] = value
            }
        }
    })

    fieldsToConvertValue.forEach(([fieldKey, conversionFunc]) => {
        if (fieldKey in restructuredObject) {
            restructuredObject[fieldKey] = conversionFunc(restructuredObject[fieldKey])
        }
    })

    fieldsToAdd.forEach(([fieldKey, fieldValue]) => {
        restructuredObject[fieldKey] = fieldValue
    })

    return restructuredObject
}

export default restructureObject