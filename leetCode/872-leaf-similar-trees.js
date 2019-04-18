/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function(root1, root2) {
    let finished = false;
    let leafSimilar = true;
    
    let firstLeaf, secondLeaf;

    firstLeaf = getLeafs(root1);
    secondLeaf = getLeafs(root2);

    if(firstLeaf != secondLeaf){
        leafSimilar = false;
    }
    console.log('firstLeaf')
    console.log(firstLeaf)
    console.log('secondLeaf')
    console.log(secondLeaf)
    
    
    return leafSimilar
};

// Simple recursive solution. Iteratively check leaf by leaf would be way faster tho 
let getLeafs = function (node){
    let leafs = '';

    
    if(node.right){
        leafs += getLeafs(node.right);
    }
    if(node.left){
        leafs += getLeafs(node.left);
    }

    if(!node.left && !node.right){
        return node.val+'-'; //added "-" to avoid confusing "1", "7" with "17"
    }
    
    return leafs;
}

// Simple test
let ROOT1 = {
    "val":3,
    "right":{
        "val":1,
        "right":{
            "val":8,
            "right":null,
            "left":null
        },
        "left":{
            "val":9,
            "right":null,
            "left":null
        }
    },
    "left":{
        "val":5,
        "right":{
            "val":2,
            "right":{
                "val":4,
                "right":null,
                "left":null
            },
            "left":{
                "val":7,
                "right":null,
                "left":null
            }
        },
        "left":{
            "val":6,
            "right":null,
            "left":null
        }
    }
}
let ROOT2 = {"val":3,"right":{"val":1,"right":{"val":2,"right":{"val":8,"right":null,"left":null},"left":{"val":9,"right":null,"left":null}},"left":{"val":4,"right":null,"left":null}},"left":{"val":5,"right":{"val":7,"right":null,"left":null},"left":{"val":6,"right":null,"left":null}}}



leafSimilar(ROOT1, ROOT2);
