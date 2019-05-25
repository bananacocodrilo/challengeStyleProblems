const fs = require('fs');

let parser1 = (file)=> {
    let content = fs.readFileSync('./'+file, 'utf8').split('\n');
    content.splice(0,1);

    for (let i = content.length -1; i >= 0; i--) {
        if(content[i].length){
            content[i] = content[i].split(' '); 
        }else{
            content.splice(i,1);
        } 

    }

    return content;
}


let logger1 = (data) => {
    let i = 1;
    let res = '';
    
    for(let i = 0; i < data.length; i++){
        res += `Case #${i+1}: ${data[i]}\n`;
    }

    fs.writeFile("submitOutput", res, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 

}
 


let cases = parser1('submitInput');
let res = []

cases.forEach(groups => {
    let tortillas = Math.ceil(groups[0]/2) + Math.ceil(groups[1]/2);
    res.push(tortillas)
});



logger1(res);
