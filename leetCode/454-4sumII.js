/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */


var fourSumCount = function(A, B, C, D) {
    let result = 0;
    let ABcombinations = twoSum(A, B);
    let CDcombinations = twoSum(C, D);

    ABcombinations.forEach(function(abValue, abKey){
        if (CDcombinations.get(-abKey)) {
            result += abValue * CDcombinations.get(-abKey);
        }
    });
    return result;
};


var twoSum =function(A ,B){
    let result = new Map()
    A.forEach(function(a){
        B.forEach(function(b) {
            result.get(a+b)? result.set(a+b, result.get(a+b)+1) : result.set(a+b, 1);

        });
    }); 
    console.log(result);
    return result;
}
