const fs = require('fs');
let mode = 'custom';

let tik =  new Date().getTime();
let tok;


// Format data
let parser = ()=> {
    let content = fs.readFileSync('./'+mode+'Input', 'utf8').split('\n');
    let casesNumber = content.splice(0,1);
    let cases = [];

    for (let i = 0; i < casesNumber; i++) {
        let dictionary = {};
        dictionary.length = content.splice(0,1)[0];
        dictionary.words = [];

        for (let j = 0; j < dictionary.length; j++) {
            dictionary.words.push(content.splice(0,1)[0]);
        }
        
        cases.push(dictionary);
    }
    return cases;
}



// Format output file
let logger = (data) => {
    let res = ``;
    
    for(let i = 0; i < data.length; i++){
        res += `Case #${i+1}: ${data[i]}\n`;
    }

    fs.writeFile(mode + 'Output', res, function(err) {
        if(err) {
            return console.log(err);
        }
    
        tok =  new Date().getTime()
        console.log(`The file was saved! Milis: ${tok - tik}`);
    }); 

}


const getLetters = (words) => {
    let result = {};
    words.forEach(word =>{
        word.split('').forEach(letter => {
            if(!result.hasOwnProperty(letter)){
                result[letter] = {
                    before: [],
                    after:[],
                    sorted: false
                }
            }
        });
    })
    return result;
}


let cases = parser();
let res = [];






cases.forEach(dictionary => {
    let solutionFound = false;
    dictionary.letters = getLetters(dictionary.words);



    let solution = [];
    console.log(dictionary);
    let searchingPosition = 0;
    
    solution.push(words[0][0])

    
    while(!solutionFound){
        
        words.forEach(word =>{
            let letter = word[searchingPosition];


            if(solution.length == 0){
            }else{
                console.log(solution)
            }








        })



    }


    
    
    
    
    dictionary.words.forEach(word => {
        



    })



    
});



logger(res);
