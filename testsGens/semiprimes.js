maxNumber = 500000;
cases = 100;

leapSize = 5000;



let p = [];
let q = [];
let realMax = 0;
for (let i = 0; i<cases; i++){
    p[i] = Math.floor(maxNumber*Math.random());
    q[i] = p[i] + Math.floor(leapSize*Math.random());
    if(q[i]>realMax){
        realMax = q[i];
    }
}


let res = `${realMax}, [${p}], [${q}]`;

console.log(res);

