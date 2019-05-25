const fs = require('fs');
let mode = 'submit';

let tik =  new Date().getTime();
let tok;


// Format data
let parser = ()=> {
    let content = fs.readFileSync('./'+mode+'Input', 'utf8').split('\n');
    let casesNumber = content.splice(0,1);
    let cases = [];

    for (let i = 0; i < casesNumber; i++) {
        let party = {};

        party.listLength = content.splice(0,1)[0];
        party.partialList = content.splice(0,1)[0].split(' ');
        party.repetitions = {};
        party.complete = false;

        party.partialList.forEach(candy =>{
            party.repetitions[candy]? party.repetitions[candy]++ : party.repetitions[candy]=1;
        })


        cases.push(party);
    }
    return cases;
}



// Format output file
let logger = (data) => {
    let res = ``;
    
    for(let i = 0; i < data.length; i++){
        res += `Case #${i+1}: ${data[i][0]}/${data[i][1]}\n`;
    }

    fs.writeFile(mode + 'Output', res, function(err) {
        if(err) {
            return console.log(err);
        }
    
        tok =  new Date().getTime()
        console.log(`The file was saved! Milis: ${tok - tik}`);
    }); 

}


let gcd = (a,b) => {
    return b ? gcd(b, a%b) : a;
};

let reduceFraction = (num,den) => {
    div = gcd(num,den);
    return [num/div, den/div];
}

let lcm = (a, b) => {
    // Least common multiple of 2 integers
    return a*b / gcd(a, b);
}

let lcmArray = (array) => {
    // Least common multiple of a list of integers
    let n = 1;
    for(var i=0; i<array.length; ++i){
        n = lcm(array[i], n);
    }
    return n;
}




let cases = parser();
let res = [];

cases.forEach(party => {
    let times;
    let people = 0; 
    let candies = 0;
    let repetitions = [];
    let reducedResult = [];

    // Calculate how many times we need to repeat the list
    
    //First search the minimum valid repetitions for each value in the list
    for (const amount in party.repetitions) {
        if (party.repetitions.hasOwnProperty(amount)) {
            let found = false;
            let i = 1;
            // console.log(`Searching ${amount}...`)
            while(!found){
                // If the times that the value appear in the original list times i
                // is a multiple of the value, then i is valid.
                if((party.repetitions[amount] * i) % amount == 0){
                    found = true;
                    // console.log(`Found ${i}`)
                    
                    // If the repetitions value isn't already in the array is inserted
                    if(repetitions.indexOf(i) == -1){
                        repetitions.push(i);
                    }
                }
                i++;
            }
        }

    }

    // console.log(repetitions)
    times = lcmArray(repetitions);
    // console.log(times)
    for (const amount in party.repetitions) {
        if (party.repetitions.hasOwnProperty(amount)) {
            party.repetitions[amount] *= times;
            candies += party.repetitions[amount];
            people += party.repetitions[amount] / amount;
        }
    }




    reducedResult = reduceFraction(candies, people); 
    res.push(reducedResult)
});



logger(res);
