// a 0 is a number 
// a 1 is a operator
// a 2 is a function like sin or cos

const SYBOL_LIST = ['+','-','*','/','(',')','^'];
const FUNC_LIST = ['sin','cos','tan','sec','csc','cot','abs','sqrt'];

var sybols_And_Indexes = [];
var outputQueue = [];
var operatorStack = [];

function parse(string){
  sybols_And_Indexes = [];
  outputQueue = [];
  operatorStack = [];

  fixStringFormatToTokenize(string);

  if(sybols_And_Indexes.length > 0){
    setPrecedence(sybols_And_Indexes);
    shuntingYard(sybols_And_Indexes);

    return outputQueue;
  }else{
    return undefined;
  }

}

function fixStringFormatToTokenize(string){
  string = string.replace(/ /g, "");
  let sets = [];
  let index = 0;

  while(index < string.length){
    let temp = "";
    
    while(string[index] == "-" || string[index] == "+"){
      temp = temp.concat(string[index]);
      index++;
    }

    if(temp != ""){
      sets.push(temp)
    }
      
    index++;
  }

  for(var i = 0; i < sets.length; i++){
    string = string.replace(sets[i], getSign(sets[i]))
  }

  sets = [];
  index = 0;

  // console.log(string)

  while(index < string.length){
    let startIndex = undefined;

    if(/\d/.test(string[index]) || string[index] == "."){
      startIndex = index;
    }
    
    while(/\d/.test(string[index]) || string[index] == "."){
      index++;
    }

    if(!string[startIndex-1] && startIndex != undefined){
      sets.push([startIndex, index])
    }else if(string[startIndex-1] && startIndex != undefined && string[startIndex-1] != "(" && string[startIndex-2] != "("){
        sets.push([startIndex, index])
    }
      
    index++;
  }

  for(var i = 0; i < sets.length; i++){
    string = insertStringAt(sets[i][0]+i*2, string, "(")
    string = insertStringAt(sets[i][1]+i*2+1, string, ")")
  }

  tokenization(string);
}

function tokenization(string){
  let index = 0;

  // console.log(string)

  while(index < string.length){  
    let sub_String = string.substring(index);
    let num = parseFloat(sub_String, 10);
    // console.log(sub_String,num)

    if(isNaN(num) == false && string[index] != " "){
      sybols_And_Indexes.push({num:num, type:0});
      let num_len = num.toString().length;

      index += num_len;
    }

    for (var i = 0; i < SYBOL_LIST.length; i++) {
      if(string[index] == SYBOL_LIST[i]){
          sybols_And_Indexes.push({num:SYBOL_LIST[i], type:1});
      }
    }

    for(var i = 0; i < FUNC_LIST.length; i++){
      let match = true;

      for(var j = 0; j < FUNC_LIST[i].length; j++){
        if(string[index+j] != FUNC_LIST[i][j]){
          match = false;
        }
      }

      if(match){
          sybols_And_Indexes.push({num:FUNC_LIST[i], type:2});
        }
    }

      index++;
  }

  //adds a mult sign if there is a num then a parenthesis or two parenthesis back to back
  for (var i = 0; i < sybols_And_Indexes.length; i++) {
    if(sybols_And_Indexes[i+1] && sybols_And_Indexes[i].type == 0 && sybols_And_Indexes[i+1].num == "("){
      insertAt(sybols_And_Indexes, i+1, [{num:'*', type:1}]);
    }
    if(sybols_And_Indexes[i+1] && sybols_And_Indexes[i].num == ")" && sybols_And_Indexes[i+1].num == "("){
      insertAt(sybols_And_Indexes, i+1, [{num:'*', type:1}]);
    }
  }

  // console.log(sybols_And_Indexes)

}

function setPrecedence(tokens){
  for (var i = 0; i < tokens.length; i++) {
    if(tokens[i].num == '+' || tokens[i].num == '-'){
      tokens[i].prec = 0;
    }
    if(tokens[i].num == '*' || tokens[i].num == '/'){
      tokens[i].prec = 1;
    }
    if(tokens[i].num == '^' || tokens[i].num == 'sqrt'){
      tokens[i].prec = 2;
    } 
  }
}


function shuntingYard(tokens){
  tokens = deepCopy(tokens)
  for (var i = 0; i < tokens.length; i++) {
    if(tokens[i].type == 0){
      outputQueue.push(tokens[i]);
    }  
    if(tokens[i].type == 2){
      operatorStack.push(tokens[i]);
    } 
    if(tokens[i].type == 1 && tokens[i].num != ')' && tokens[i].num != '('){
      while(operatorStack.length > 0 && 
           (operatorStack[operatorStack.length-1].prec > tokens[i].prec || 
           operatorStack[operatorStack.length-1].prec == tokens[i].prec)){

        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(tokens[i]);
    }
    if(tokens[i].num == '('){
        operatorStack.push(tokens[i]);
    }
    if(tokens[i].num == ')'){
      while(operatorStack.length > 0 && operatorStack[operatorStack.length-1].num != '(' 
            && operatorStack[operatorStack.length-2].num != "("){
        outputQueue.push(operatorStack.pop());
      }

      if(operatorStack[operatorStack.length-1].num == "("){
        operatorStack.pop();
      }
      
      if(operatorStack.length > 0 && operatorStack[operatorStack.length-1].type == 2){
        outputQueue.push(operatorStack.pop());
      }
    }
  }

  while(operatorStack.length > 0){
    if(operatorStack[operatorStack.length-1].num == '(' || operatorStack[operatorStack.length-1].num == ')'){
      operatorStack.pop();
    }else{
      outputQueue.push(operatorStack.pop());
    }
  }

}

function eval(rpn){
  let stack = [];

  for (var i = 0; i < rpn.length; i++) {
    if(rpn[i+1] && rpn[i].num == '-' &&  /\+|-|\*|\/|\^/.test(rpn[i+1].num)){
      rpn.splice(i, 1);
      rpn[i-1].num *= -1;
    }
  }

  // console.log(rpn)

  for (var i = 0; i < rpn.length; i++) {
    if(rpn[i].type == 0){
      stack.push(rpn[i]);
    }
    if(rpn[i].type == 1){
      let right = stack.pop();
      let left = stack.pop();


      if(rpn[i].num == '+'){
        if(left == undefined){
          stack.push({num:right.num, type:0});
        }else{
          stack.push({num:left.num + right.num, type:0});
        }
      }
      if(rpn[i].num == '-'){
        if(left == undefined){
          stack.push({num:-1 * right.num, type:0});
        }else{
          stack.push({num:left.num - right.num, type:0});
        }
      }
      if(rpn[i].num == '*'){
        stack.push({num:left.num * right.num, type:0});
      }
      if(rpn[i].num == '/'){
        stack.push({num:left.num / right.num, type:0});
      }
      if(rpn[i].num == '^'){
        let output = {num:Math.pow(left.num, right.num), type:0};
        stack.push(output);
      }
    }
    if(rpn[i].type == 2){
      let right = stack.pop();

      if(rpn[i].num == 'sqrt'){
        stack.push({num:Math.sqrt(right.num), type:0});
      }
      if(rpn[i].num == 'cos'){
        stack.push({num:Math.cos(right.num), type:0});
      }
      if(rpn[i].num == 'sin'){
        stack.push({num:Math.sin(right.num), type:0});
      }
      if(rpn[i].num == 'tan'){
        stack.push({num:Math.tan(right.num), type:0});
      }
      if(rpn[i].num == 'sec'){
        stack.push({num:1/Math.cos(right.num), type:0});
      }
      if(rpn[i].num == 'csc'){
        stack.push({num:1/Math.sin(right.num), type:0});
      }
      if(rpn[i].num == 'cot'){
        stack.push({num:1/Math.tan(right.num), type:0});
      }
      if(rpn[i].num == 'abs'){
        stack.push({num:Math.abs(right.num), type:0});
      }
    }
  }

  // console.log(stack)
  if(stack[0]){
    return stack[0].num;
  }else{
    return undefined;
  }
  
}

function getSign(string){
  let numNegs = 0;

  for (var i = 0; i < string.length; i++) {
    if(string[i] == "-"){
      numNegs++;
    }
  }

  if(numNegs % 2 == 0){
    return "+"
  }else{
    return "-"
  }
}



  
