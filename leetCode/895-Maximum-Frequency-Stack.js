
var FreqStack = function() {
  this.index = {};
  this.reverseIndex = {0:[]};
  this.stack = [];

  this.currentMax = 0;


  this.updateReverseIndex = (x, current, previous) => {
    let freq = this.index[x];

    if (!this.reverseIndex[current]){
      this.reverseIndex[current] = [];
    }

    this.reverseIndex[current].push(x);
    this.reverseIndex[previous].splice( this.reverseIndex[previous].indexOf(x), 1);

  }

};

/**
 * @param {number} x
 * @return {void}
 */
FreqStack.prototype.push = function(x) {
  let myFreq;
  this.stack.push(x);

  //Update indexed occurrences
  if(!this.index[x]){
    this.index[x] = 1;
  }else{
    this.index[x]++;
  }

  //Update current max occurrences
  if(this.index[x] > this.currentMax){
    this.currentMax = this.index[x];
  }

  this.updateReverseIndex(x, this.index[x], this.index[x] - 1);

  return null;
};




/**
 * @return {number}
 */
FreqStack.prototype.pop = function() {
  let ret;
  let mostCommonArray = this.reverseIndex[this.currentMax];

  //Search the latest added from the most common numbers
  for(let i = this.stack.length - 1; i >= 0; i--){
    if(mostCommonArray.includes(this.stack[i])){
      ret = this.stack[i];
      this.stack.splice(i, 1);
      break;
    }
  }


  this.index[ret]--;
  this.updateReverseIndex(ret, this.index[ret], this.index[ret] + 1);

  //Update current max occurrences
  if(!this.reverseIndex[this.currentMax].length){
    this.currentMax--;
  }


  return ret;
};



let test =  [[4],[0],[9],[3],[4],[2],[],[6],[],[1],[],[1],[],[4],[],[],[],[],[],[]]

let result = []
let obj = new FreqStack()

for(let i = 0; i < test.length; i++){
  if(typeof test[i][0] == 'number'){
    obj.push(test[i][0])
  }else{
    result.push(obj.pop())
  }
}

console.log(`result: ${result}`)
