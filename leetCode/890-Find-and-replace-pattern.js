/**
 * @param {string[]} words
 * @param {string} pattern
 * @return {string[]}
 */
var findAndReplacePattern = function(words, pattern) {
  let result = [];

  words.forEach((word)=>{
    let test = [];
    let usedChars = [];
    // console.log(`word: ${word}`)

    for(let i = 0; i < word.length; i++){
      let char = word[i];
      let patternChar = pattern[i];

      // console.log('--------------------------------------------')
      // console.log(`char: ${char}`)
      // console.log(`patternChar: ${patternChar}`)
      // console.log(`usedChars: ${usedChars}`)
      // console.log(`test: ${test}`)

      if(usedChars.includes(char)){
        continue;
      }else{
        usedChars.push(char);
      }

      for(let j = 0; j < pattern.length; j++){
        if(typeof (test[j]) == 'undefined' && pattern[j] === patternChar){
          test[j] = char;
        }
      }

    }

    if(word == test.join('')){
        result.push(word)
    }


  })
  return result;
};


words = ["abc","deq","mee","aqq","dkd","ccc"];
pattern = "abb";

words2 = ["yzmyr","fhufq","lghlq","oahot","ueiuq"]
pattern2 = "iusiq"


console.log(findAndReplacePattern(words, pattern))
console.log('**********************************************')
console.log('**********************************************')
console.log('**********************************************')
console.log(findAndReplacePattern(words2, pattern2))

// Output: ["mee","aqq"]
