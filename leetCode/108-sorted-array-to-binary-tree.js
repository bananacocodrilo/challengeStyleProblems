/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    if (!nums.length){
        return null;
    } 

    const mid = Math.floor(nums.length / 2);
    let root = new TreeNode(nums[mid]);

    
    // subtrees are BSTs as well
    root.left = sortedArrayToBST(nums.slice(0, mid));
    root.right = sortedArrayToBST(nums.slice(mid + 1));
    
    return root;
};


function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}


let test = [-10,-3,0,5,9]
let test2 = [3,1]

let t = sortedArrayToBST(test);

console.log(JSON.stringify(t, null, 2))