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
        let plantesNumber = content.splice(0,1);
        cases[i] = {};
        
        for (let j = 0; j < plantesNumber; j++) {
            let planet = content.splice(0,1);
            planet = planet[0].split(':');
            cases[i][planet[0]+''] = {};
            cases[i][planet[0]].destinations = planet[1].split(','); 
        }
        cases[i]['New Earth'] = {destinations:[]};


        // Add origin planets to do the reversed travel faster
        for (const planet in cases[i]) {
            if (cases[i].hasOwnProperty(planet)) {
                cases[i][planet].origins = [];
            
                for (const origin in cases[i]) {
                    if (cases[i].hasOwnProperty(origin)){
                        if(cases[i][origin].destinations.findIndex((a)=>a==planet) != -1){
                            cases[i][planet].origins.push(origin);
                        }
                    }
                
                }
            }
        }

    }

    return cases;
}

// Format output file
let logger = (data) => {
    console.log(JSON.stringify(data,'',2));
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


// Recursive search backwards
let calcPosibilities = (universe, planet) => {
    let totalPaths = 0; 
    if(planet == 'Galactica'){
        totalPaths = 1;
    }else{

        universe[planet].origins.forEach(origin => {
            totalPaths += calcPosibilities(universe, origin);
        });

    }

    return totalPaths;
}




let cases = parser();
let res = [];

cases.forEach(universe => {
    res.push(calcPosibilities(universe, 'New Earth'))
});


logger(res);
