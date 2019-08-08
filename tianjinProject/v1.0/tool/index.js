export function compare(propetyName) {
    return function(object1, object2) {
        let val1 = object1[propetyName]
        let val2 = object2[propetyName]
        if (val2 > val1) {
            return 1
        } else if (val2 < val1) {
            return -1
        } else {
            return 0
        }
    }
}