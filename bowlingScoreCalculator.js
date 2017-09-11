/*
In javascript, count and sum the scores of a bowling game of one player

Spec

A bowling game consists of 10 frames in which the player tries to knock down the 10 pins.

Frames:

In every frame the player can throw 1 or 2 times. The number depends on whether a strike was thrown on the first throw.
The score of a frame is the number of knocked down pins, plus bonuses for strikes and spares.
After every frame the pins are reset
Strikes:

The player has a strike if he knocks down all 10 pins with the first roll in a frame.
The frame ends immediately
The bonus for that frame is the number of pins knocked down by the next 2 rolls - the next frame (expect if the player rolls a strike agian.
Spares:

The player has a spare if they knock down all 10 pins within the 2 rolls of a frame.
The bonus for that frame is the number of pins knocked down by the next roll.
10th frame:

If the player rolls a strike or spare in the 10th frame he can roll the additional balls for the bonus. But he can never have more than 3 rolls in the 10th frame.
The additional rolls only count for the bonus, not for the regular frame count.
Example 1: 10, 10, 10 in the 10th frame gives 30 points (10 points for the regular strike, and 20 points for the bonus
Example 2: 1, 9, 10 in the 10th frame gives 20 points (10 points for the regular spare and 10 points for the bonus)

*/
function bowlingScore(frames) {
  var framesArr = frames.split(' ').map((frame) => [...frame]);
  var result = 0;
  
  for (var i=0; i < framesArr.length; i++) {
    var current = framesArr[i];
    
    if(current[0] === 'X' && i < 9) {
      result += 10 + getNextElementsScore(framesArr, i, 2);
    } else if(current.length === 2 && current[1] === '/' && i < 9) {
      result += 10 + getNextElementsScore(framesArr, i, 1);
    } else if(current.length === 3) {
      result += getThreeRollScore(current);
    } else {
      result += getElementScore(current, 0) + getElementScore(current, 1);
    }
  }
  return result;
}

function getNextElementsScore(framesArr, index, count) {
  var result = getElementScore(framesArr[index + 1], 0);
  var result2 = getElementScore(framesArr[index + 1], 1)
  
  if (framesArr[index + 1].length === 1) {
    return count === 1 ? result : result + getElementScore(framesArr[index + 2], 0);
  }
  return count === 1 ? result : (result2 === 10 && result !== 10 ? result2 : result2 + result );
}
    
function getElementScore(frame, index) {
  if (frame[index] === 'X' || frame[index] === '/') {
    return 10;
  }
  return parseInt(frame[index]);
}

function getThreeRollScore(current) {
  var third = getElementScore(current, 2);
  var second = getElementScore(current, 1);
  var first = getElementScore(current, 0);

  return third === 10 && second !== 10 ? third + first : (second === 10 && first !== 10 ? third + second : first + second + third);
}



// maybe this bowler should put bumpers on
// Test.assertEquals(bowlingScore('11 11 11 11 11 11 11 11 11 11'), 20)
// woah! Perfect game!
// Test.assertEquals(bowlingScore('X X X X X X X X X XXX'), 300)
