const fs = require('fs');
let mode = 'submit';

let tik =  new Date().getTime();
let tok;

// Repeated to avoid checking if the offset goes offlimits
let typeWritter = [
    ['1','2','3','4','5','6','7','8','9','0'],
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L',';'],
    ['Z','X','C','V','B','N','M',',','.','-']
]
                   

let bPos = {
    x:4,
    y:3
}

let gPos = {
    x:4,
    y:2
}



// Format data
let parser = ()=> {
    let content = fs.readFileSync('./'+mode+'Input', 'utf8').split('\n');
    let casesNumber = content.splice(0,1);
    let cases = [];

    for (let i = 0; i < casesNumber; i++) {
        let message = {};
        message.sender = content.splice(0,1)[0];
        message.encrypted = content.splice(0,1)[0];
        
        cases.push(message);
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


const getPosition = (letter) => {
    for(let i = 0; i< typeWritter.length; i++){
        let j = typeWritter[i].indexOf(letter)
        if(j!= -1){
            return {x:j, y:i};
        }
    }
}



let cases = parser();
let res = [];

cases.forEach(message => {
    
    // First calculate the offset
    // Going a row up or down is simply going 10 left or right
    
    let lastLetter = message.encrypted.slice(-1);
    let letterPosition = getPosition(lastLetter);
    
    if(message.sender === 'G'){
        message.offset = {
            x: ((gPos.x - letterPosition.x) >= 0)? (gPos.x - letterPosition.x): (gPos.x - letterPosition.x) + 10,  
            y: ((gPos.y - letterPosition.y) >= 0)? (gPos.y - letterPosition.y): (gPos.y - letterPosition.y) + 4  
        }
    }else{
        message.offset = {
            x: ((bPos.x - letterPosition.x) >= 0)? (bPos.x - letterPosition.x): (bPos.x - letterPosition.x) + 10,
            y: ((bPos.y - letterPosition.y) >= 0)? (bPos.y - letterPosition.y): (bPos.y - letterPosition.y) + 4
        }
    }


    message.decypher = {};
    
    for(let i = 0; i< typeWritter.length; i++){
        for(let j = 0; j< typeWritter[i].length; j++){
            let letter = typeWritter[i][j]
            let letterPos = getPosition(letter);
            let newPos = {
                x: ((letterPos.x + message.offset.x) >= 10)? (letterPos.x + message.offset.x) - 10 : (letterPos.x + message.offset.x),
                y: ((letterPos.y + message.offset.y) >= 4)? (letterPos.y + message.offset.y) - 4: (letterPos.y + message.offset.y)
            }
            
            message.decypher[letter] = typeWritter[newPos.y][newPos.x];
        }
    }
    

    let str = message.encrypted;
    message.decrypted = str.replace(/[^\s]/g, function (x) {
        return message.decypher[x]; 
    }); 

    
    res.push(message.decrypted);
});



logger(res);
