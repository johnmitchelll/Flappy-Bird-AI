function Vector(x,y){
    this.x = x;
    this.y = y;
}

function distanceOfTwoPoints(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.random() * (max - min + 1) + min;
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorRectNoFill(topLeftX, topLeftY, boxWidth, boxHeight, fillColor, lineWidth) {
    canvasContext.lineWidth = lineWidth;
    canvasContext.strokeStyle = fillColor;
    canvasContext.strokeRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function drawText(color, font, words, X, Y){
    let tempFont = deepCopyObject(canvasContext.font);
    canvasContext.fillStyle = color;
    canvasContext.font = font;
    canvasContext.fillText(words, X, Y);
    canvasContext.font = tempFont;
  }

function drawLine(x1,y1,x2,y2,width,color){
    canvasContext.lineWidth = width;
    canvasContext.strokeStyle = color;
    canvasContext.beginPath()
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.stroke();
}

function circlePointColision(x1,y1,r, x2,y2){
  let dist = distanceOfTwoPoints(x1, y1, x2, y2);

  return dist < r;
}


function removeFromArray(array,index){
    for(i = array.length - 1; i >= 0; i--){
        if(i == index){
            array.splice(index, 1);
        }
    }
}

function insertAt(array, index, elementsArray) {
    for(i = elementsArray.length - 1; i >= 0; i--){
        array.splice(index, 0, elementsArray[i]);
    }
}

function insertStringAt(index, string, newString) {
  if (index > 0) {
    return string.substring(0, index) + newString + string.substring(index);
  }

  return newString + string;
};


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

    // Function to compare two strings
    // ignoring their cases
    function equalIgnoreCase(str1, str2)
    {
        let i = 0;

        // length of first string
        let len1 = str1.length;

        // length of second string
        let len2 = str2.length;

        // if length is not same
        // simply return false since both string
        // can not be same if length is not equal
        if (len1 != len2)
            return false;

        // loop to match one by one
        // all characters of both string
        while (i < len1)
        {

            // if current characters of both string are same,
            // increase value of i to compare next character
            if (str1[i] == str2[i])
            {
                i++;
            }

            // if any character of first string
            // is some special character
            // or numeric character and
            // not same as corresponding character
            // of second string then return false
            else if (!((str1[i].charCodeAt() >= 'a'.charCodeAt() && str1[i].charCodeAt() <= 'z'.charCodeAt())
                    || (str1[i].charCodeAt() >= 'A'.charCodeAt() && str1[i].charCodeAt() <= 'Z'.charCodeAt())))
            {
                return false;
            }

            // do the same for second string
            else if (!((str2[i].charCodeAt() >= 'a'.charCodeAt() && str2[i].charCodeAt() <= 'z'.charCodeAt())
                    || (str2[i].charCodeAt() >= 'A'.charCodeAt() && str2[i].charCodeAt() <= 'Z'.charCodeAt())))
            {
                return false;
            }

            // this block of code will be executed
            // if characters of both strings
            // are of different cases
            else
            {
                // compare characters by ASCII value
                if (str1[i].charCodeAt() >= 'a'.charCodeAt() && str1[i].charCodeAt() <= 'z'.charCodeAt())
                {
                    if (str1[i].charCodeAt() - 32 != str2[i].charCodeAt())
                        return false;
                }

                else if (str1[i].charCodeAt() >= 'A'.charCodeAt() && str1[i].charCodeAt() <= 'Z'.charCodeAt())
                {
                    if (str1[i].charCodeAt() + 32 != str2[i].charCodeAt())
                        return false;
                }

                // if characters matched,
                // increase the value of i to compare next char
                i++;

            } // end of outer else block

        } // end of while loop

        // if all characters of the first string
        // are matched with corresponding
        // characters of the second string,
        // then return true
        return true;

    } // end of equalIgnoreCase function

    // Function to print the same or not same
    // if strings are equal or not equal
    function equalIgnoreCaseUtil(str1, str2)
    {
        let res = equalIgnoreCase(str1, str2);

        if (res == true)
            document.write( "Same" + "</br>");

        else
            document.write( "Not Same" + "</br>");
    }

function getIndexFromLetter(letter){
    for (var i = 0; i < 26; i++) {
        if(equalIgnoreCase(String.fromCharCode(i + 65), letter) ){
            return i;
        }
    }
}


function measureText(pText, pFontSize, pStyle) {
    var lDiv = document.createElement('div');

    document.body.appendChild(lDiv);

    if (pStyle != null) {
        lDiv.style = pStyle;
    }
    lDiv.style.fontSize = "" + pFontSize + "px";
    lDiv.style.position = "absolute";
    lDiv.style.left = -1000;
    lDiv.style.top = -1000;

    lDiv.textContent = pText;

    var lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    };

    document.body.removeChild(lDiv);
    lDiv = null;

    return lResult;
}
    




