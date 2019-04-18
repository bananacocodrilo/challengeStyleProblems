/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */


var numJewelsInStones = function(J, S) {
    let jewels = 0;
    for(let i = 0; i < S.length; i++){
        if(J.indexOf(S[i]) != -1){
            jewels++;
        }
    }
    return jewels;
};



console.log(numJewelsInStones('AaB', 'AaAbibbbbbb')); //res 3