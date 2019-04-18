/**
 * @param {number[]} A
 * @return {number}
 */
var longestMountain = function(A) {
    let result = 0;
    let currentLength = 0;
    
    const mountain = { flat:0, rising:1, falling:2 };
    
    let prevValue = undefined;
    let status = undefined;
    let newStatus = undefined;
    
    prevValue = A[0]
    A.forEach(function(value, index){
        if(status != undefined &&  prevValue != undefined){ //not first pass

        }

        if(value == prevValue){
            newStatus = mountain.flat;
        }else if(value > prevValue){
            newStatus = mountain.rising;
        }else{
            newStatus = mountain.falling;
        }

        

        if(status != mountain.rising && newStatus == mountain.rising){ //Starting a new mountain
            currentLength = 2;
        }else if (newStatus == mountain.rising){ //climbing
            currentLength++;
        }else if(newStatus == mountain.falling && currentLength != 0){ //descending. Exception for the only descend case
            currentLength++
            if(result < currentLength){ //if there is a descend, this is a proper mountain and we can update the result
                result = currentLength;
            }

        }else if(newStatus == mountain.flat){ //Aparently there has to be a peak value
            currentLength = 0;
        }
        
        //console.log('value: ',value, 'prevValue: ', prevValue, 'status:', status, 'newStatus:', newStatus);
        prevValue = value;
        status = newStatus;

    });
    return result
}


// let a = [0,1,2,3,4,5,4,3,2,1,0]
// let b = [2,1,4,7,3,2,5]
// let c = [3, 2]
// let d = [2,3,3,2,0,2];

// res = longestMountain(a)
// console.log(res)