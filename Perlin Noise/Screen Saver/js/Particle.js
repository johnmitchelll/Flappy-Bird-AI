function deepCopy(arr){
  let copy = [];
  arr.forEach(elem => {
    if(Array.isArray(elem)){
      copy.push(deepCopy(elem))
    }else{
      if (typeof elem === 'object') {
        copy.push(deepCopyObject(elem))
    } else {
        copy.push(elem)
      }
    }
  })
  return copy;
}
// Helper function to deal with Objects
function deepCopyObject(obj){
  let tempObj = {};
  for (let [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      tempObj[key] = deepCopy(value);
    } else {
      if (typeof value === 'object') {
        tempObj[key] = deepCopyObject(value);
      } else {
        tempObj[key] = value
      }
    }
  }
  return tempObj;
}




//     var inc = 0.001
//     var r = 0;
//     var rDir = inc;
//     var g = 25;
//     var gDir = inc;
//     var b = 127;
//     var bDir = inc;
    


// function color() {
//     r += rDir;
//     if (r > 255) {
//       rDir *= -1;
//     }else if(r < 0){
//       rDir *= -1;
//     }
//     g += gDir;
//     if (g > 30) {
//       gDir *= -1;
//     }else if(g < 0){
//       gDir *= -1;
//     }
//     b += bDir;
//     if (b > 255) {
//       bDir *= -1;
//     }else if(b < 0){
//       bDir *= -1;
//     }

//     return'rgba('+r+','+g+','+b+')'

//   }


    // let r = 175 
    // let g = 0 
    // let b = 255
    // let rDir = scale/255;
    // let gDir = scale/255;
    // let bDir = scale/255;


    //     r += rDir;
    // if (r > 255) {
    //   rDir *= -1;
    // }else if(r < 0){
    //   rDir *= -1;
    // }
    // g += gDir;
    // if (g > 30) {
    //   gDir *= -1;
    // }else if(g < 0){
    //   gDir *= -1;
    // }
    // b += bDir;
    // if (b > 255) {
    //   bDir *= -1;
    // }else if(b < 0){
    //   bDir *= -1;
    // }
