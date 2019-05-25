('CAGCCTA', [2, 5, 0], [4, 5, 6])

let res = '('
let string = ""
let p = []
let q = [];

sLen  = 100;
tests = 200;
const nucl = ['A', 'C', 'G', 'T'];


for(var i = 0; i < sLen; i++){
    string += nucl[(Math.floor(4*Math.random()))]
}


for(var i = 0; i < tests; i++){
    p[i] = (Math.floor(sLen*Math.random()));
    q[i] = p[i] + (Math.floor((4)*Math.random()));
    if(q[i] > sLen){
        q[i] = sLen;
    }
}


res = `'${string}',[${p}],[${q}]`;

console.log(res);

