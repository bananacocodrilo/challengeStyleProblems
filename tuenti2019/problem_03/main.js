const fs = require('fs');
let mode = 'test';

let tik =  new Date().getTime();
let tok;



// Format data
let parser = ()=> {
    let content = fs.readFileSync('./'+mode+'Input', 'utf8').split('\n');
    let casesNumber = content.splice(0,1);
    let cases = [];

    for (let i = 0; i < casesNumber; i++) {
        let firstLine = content.splice(0,1)[0];
        firstLine = firstLine.split(' ');
        // Paper atributes
        cases[i] = {
            width: parseInt(firstLine[0]),
            heigth: parseInt(firstLine[1]),
            foldsNumber: parseInt(firstLine[2]),
            punchesNumber: parseInt(firstLine[3]),
            folds: [],
            punches: []
        };
        

        for (let j = 0; j < cases[i].foldsNumber; j++) {
            cases[i].folds.push(content.splice(0,1)[0]);
        }

        
        for (let j = 0; j < cases[i].punchesNumber; j++) {
            let punch = content.splice(0,1)[0];
            punch = punch.split(' ');
            cases[i].punches.push({x: parseInt(punch[0]), y:parseInt(punch[1]) });
        }
    }

    return cases;
}

// Format output file
let logger = (data) => {
    // console.log(data);

    let res = ``;
    
    for(let i = 0; i < data.length; i++){
        res += `Case #${i+1}:\n`;
        
        for(let j = 0; j< data[i].length; j++){
            res += `${data[i][j].x} ${data[i][j].y}\n`
        }
    }

    fs.writeFile(mode + 'Output', res, function(err) {
        if(err) {
            return console.log(err);
        }
    
        tok =  new Date().getTime()
        console.log(`The file was saved! Milis: ${tok - tik}`);
    }); 

}





let cases = parser();
// logger(cases[0])
let res = [];

cases.forEach(paper => {
    
    paper.folds.forEach(fold =>{
        let unfoldedPunches = [];
        // console.log(`####################fold: ${fold}`);
        
        paper.punches.forEach(punch =>{
            let newPunch = {}; 
            let oldPunch = {}; 
        
            
            // console.log(`-----------------Punch: `);
            // console.log(punch);
            // First unfold punches
            // Vertical unfold keeps the same x
            if(fold === 'T' || fold === 'B'){
                oldPunch.x = punch.x;
                newPunch.x = punch.x;
                
                if(fold === 'T'){
                    // newPunch is at the old heigth counting from the new middle (minus one because zero index)
                    newPunch.y = paper.heigth - (punch.y + 1);                    
                    
                    // oldPunch moves a whole height down
                    oldPunch.y = punch.y + paper.heigth;

                }else{
                    // newPunch is at the old heigth counting from the bottom
                    newPunch.y = 2*paper.heigth - (punch.y + 1);
                    // oldPunch doesnt move
                    oldPunch.y = punch.y;
                }


                // Horizontal unfold keeps the same y
            }else{
                oldPunch.y = punch.y;
                newPunch.y = punch.y;


                // same logic as for vertical unfold
                if(fold === 'L'){
                    newPunch.x = paper.width - (punch.x + 1);
                    oldPunch.x = punch.x + paper.width;
                }else{
                    newPunch.x = 2*paper.width - (punch.x + 1);
                    oldPunch.x = punch.x;
                }
            }

            unfoldedPunches.push(oldPunch);
            unfoldedPunches.push(newPunch);
            
        });

        paper.punches = unfoldedPunches;
        //Update paper dimensions
        if(fold === 'T' || fold === 'B'){
            paper.heigth *= 2;
        }else{
            paper.width *= 2;
        }
   
    });
    
    paper.punches.sort((a,b)=>{
        if(a.x != b.x){
            return a.x - b.x;
        }else{
            return a.y - b.y;
        }
    })

    res.push(paper.punches);

});



logger(res);
