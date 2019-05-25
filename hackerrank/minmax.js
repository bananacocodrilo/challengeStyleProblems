
let elements = [];
let result = [];
function maxMin(operations, x) {

    for (let i = 0; i < operations.length; i++){
        if (operations[i] == 'push') {
            
            if(elements.length == 0){
                elements[0] = x[i];
            }else{
                found = false;
                for (let j = 0; j < elements.length; j++){
                    
                    if (elements[j] > x[i]) {
                        found = true;
                        elements.splice(j, 0, x[i]);
                        break;
                    }
                }
                if(!found){
                    elements.push(x[i]);
                }
                        
            }
            result.push(elements[0] * elements[elements.length - 1]);
        } else {
            result.push(elements[0] * elements[elements.length - 1]);
            elements.splice(elements.indexOf(x[i]), 1);

        }
        
        // if(elements.length == 0){
        //     result.push(0);
        // }else{
        // }
        // console.log(elements)
    }
    return result;
}



let operations = ['push', 'pop']
// ['push',
// 'push',
// 'push',
// 'push',
// 'push',
// 'push',
// 'pop',
// 'push',
// 'push',
// 'push',
// 'push',
// 'push',
// 'pop']

let x = [4, 4]
// [1,
// 1,
// 2,
// 3,
// 3,
// 3,
// 3,
// 3,
// 3,
// 3,
// 3,
// 1,
// 1,
// 3,
// 1]


let res = maxMin(operations,x)

console.log(res);