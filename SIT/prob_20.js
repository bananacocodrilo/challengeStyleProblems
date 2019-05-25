const c = 300000000;

console.log("================ PROBLEMA 20 ================");
if(true){

    let n1 = 1.48;
    let n2 = 1.47;


    let angAcep = Math.asin(Math.sqrt(n1*n1 - n2*n2));
    let angLimit = Math.asin(n2/n1);
    let apNum = Math.sin(angAcep); 

    console.log(`angAcep: ${angAcep}`);
    console.log(`angLimit: ${angLimit}`);
    console.log(`apNum: ${apNum}`);

}

console.log("================ Case 21 ================");
if(true){

    let a = (80 * 0.000001)/2;
    let n1 = 1.48;
    let inc = 0.015;
    let lambda  =  (0.85 * 0.000001);
    let V = (2 * Math.PI * a / lambda) * n1 * Math.sqrt(2*inc);
    let Ms = V*V/2;

    console.log(`V: ${V}`);
    console.log(`Ms: ${Ms}`);
}


console.log("================ Case 22 ================");
if(true){

    let a = (4.5 * 0.000001);
    let n1 = 1.46;
    let inc = 0.0025;

    // M = 1 --> 
    let V = 2.405;
    let lambda = (2 * Math.PI * a / V) * n1 * Math.sqrt(2*inc);
    console.log(`lambda: ${lambda}`);
}

console.log("================ Case 23 ================");
if(true){

    let n1 = 1.5;
    let inc = 0.01;
    let apNum = n1 * Math.sqrt(2*inc);

    let dispMod = (apNum*apNum)/((4*Math.sqrt(3))*n1*c);


    console.log(`apNum: ${apNum}`);
    console.log(`dispMod: ${dispMod}`);

}

console.log("================ Case 24 ================");
if(true){
    let lambda = 0.85;
    let inc_lambda = 47;
    
    
    let M = 0.025 *1000000000000 / (c*lambda);
    let disp = M*inc_lambda*0.001/2.35;
    
    
    let inc_laser = lambda * 0.00282 * 1000;
    let dispLaser = M*inc_laser*0.001/2.35;

    console.log(`M: ${M}`);
    console.log(`disp: ${disp}`);
    console.log(`incLaser: ${inc_laser}`);
    console.log(`dispLaser: ${dispLaser}`);
}