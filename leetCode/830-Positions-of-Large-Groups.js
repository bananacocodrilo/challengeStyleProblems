/**
 * @param {string} S
 * @return {number[][]}
 */
var largeGroupPositions = function(S) {
    let goingGroup = ''
    let currentGroupStart = -1;
    let result = []
    
    for(let i = 0; i < S.length; i++){
        
        if(S[i]!= goingGroup){
            if(i-currentGroupStart >= 3){
                result.push([currentGroupStart, i-1]);    
            }
            goingGroup = S[i];
            currentGroupStart = i;
        }
        
    }
    console.log('result', result)

    // Extreme case if the group ends in the end of the string
    if(S[S.length-1] == goingGroup && (S.length-1)-currentGroupStart >= 2){
        result.push([currentGroupStart, S.length-1]);    
    }

    return result;
};

let test = "aabcdddeeeeaabbbcdd"
let test2 = "aaa"
let res = largeGroupPositions(test2);
console.log(res)