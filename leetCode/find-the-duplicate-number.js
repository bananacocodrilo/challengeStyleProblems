/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    let founds = new Array(nums.length);
    let res = -1;
    
    nums.some(num =>{
        if(!founds[num]){
            founds[num] = true;
            return false;
        }else{
            res = num;
            return true;
        }
    });
    
    return res;
};