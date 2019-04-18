/**
 * @param {string} digits
 * @return {string[]}
 */

var letterCombinations = function(digits) {

    const phone = [[],
        [],                ['a','b','c'],  ['d','e','f'],
        ['g','h','i'],     ['j','k','l'],  ['m','n','o'],
        ['p','q','r','s'], ['t','u','v'],  ['w','x','y','z']
    ]
    let resultArray = []
    let generatedArray;
    let newArray;

    if(digits.length){

        resultArray = [...phone[digits[0]]];
        
        for(let i = 1; i< digits.length; i++){
            generatedArray = [];
            newArray = phone[digits[i]]
            
            resultArray.forEach(firstStr => {
                newArray.forEach(secondStr => {
                    generatedArray.push(firstStr+secondStr);
                });
            })
            resultArray = [...generatedArray];
        }
    }
    
        return resultArray;
};
    
    // console.log(letterCombinations('23'))