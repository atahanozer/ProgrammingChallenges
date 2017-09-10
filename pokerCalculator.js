/*A famous casino is suddenly faced with a sharp decline of their revenues. They decide to offer Texas hold'em also online. Can you help them by writing an algorithm that can rank poker hands?

Task Specification

Create a poker hand that has a method to compare itself to another poker hand:

PokerHand.prototype.compareWith = function(hand) { ... };
A poker hand has a constructor that accepts a string containing 5 cards:

var hand = new PokerHand("KS 2H 5C JD TD");
The characteristics of the string of cards are:

A space is used as card seperator
Each card consists of two characters
The first character is the value of the card, valid characters are:

2, 3, 4, 5, 6, 7, 8, 9, T(en), J(ack), Q(ueen), K(ing), A(ce)

The second character represents the suit, valid characters are:

S(pades), H(earts), D(iamonds), C(lubs)

The result of your poker hand compare can be one of these 3 options:

var Result = {
    "win": 1,
    "loss": 2,
    "tie": 3
}
Poker Hands

Apply the standard Texas Hold'em rules for ranking the cards. (Ace is the highest valued card, as shown above.)

In order, from highest-ranking to lowest-ranking (e.g., a Straight Flush beats a Four-of-a-Kind), the hands are:

Straight Flush

All five cards have the same suit, and are in sequential order.
If two hands are both a straight flush, then the hand with the highest card value is the winner.
If both hands have the same values, it's a tie.
Four-of-a-Kind

Four of the cards are the same face value and one non-matching card. Suit does not matter.
If two hands are four-of-a-kind, then the hand with the higher value four-of-a-kind card is the winner.
No tie possible.
Full House

Three cards of one face value and two of another. Suit does not matter.
If two hands are both full houses, then the hand with the higher set of three wins.
No tie possible
Flush

All five cards are the same suit.
If two hands are both a flush, follow high card rules.
If both flushes have the same values, it's a tie.
Straight

Five cards in any sequential order. Suit does not have to match.
If two hands are both a straight, then the hand with the highest face value wins.
If both hands have the same values, it's a tie.
Three-of-a-Kind

Three cards with the same value, and two non-matching cards.
If two hands are both three-of-a-kind, then the hand with the highest set of three wins.
No tie possible
Two Pair

Two sets of two matching cards, and a non-matching card, such as A,A,9,9,2.
If two hands are both two pair, compare the highest set of two from each. Then compare the lowest set of two from each. If they match, follow high-card rules.
If both hands have the same face values, it's a tie.
One Pair

One set of matching cards, and three non-matching cards, such as A,A,7,6,4.
If two hands both have one pair, compare the sets. If they match, follow high-card rules for the remaining cards.
If both hands have the same face values, it's a tie.
High Card

No matching values or suits, and the cards are not all in a sequence.
To compare two high card hands, compare the highest value on each hand. If that matches, compare the next highest value, and so on.
If all cards have the same value, it's a tie.
*/


var Result = { "win": 1, "loss": 2, "tie": 3 }
var nums = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

function PokerHand(hand) {
  this.hand = hand.split(' ').map((element) => {
   return {num:element.slice(0,1),suit:element.slice(1)};
  });
}
PokerHand.prototype.compareWith = function(pokerHand){
  var myHandResult = this.check();
  var opHandResult = pokerHand.check();
    if (myHandResult.fnIndex < opHandResult.fnIndex || (myHandResult.fnIndex === opHandResult.fnIndex && myHandResult.result > opHandResult.result))
      return Result.win;
    if (myHandResult.fnIndex === opHandResult.fnIndex && myHandResult.result === opHandResult.result)
      return Result.tie;
    return Result.loss;
};

PokerHand.prototype.check=function(){

  var hands=['sf','fk', 'fh', 'f', 's', 'tk', 'tp','op','hc'];
  for(var i=0;i<hands.length;i++){
    var fn = 'is'+hands[i];
    var result = this[fn]();
    if(result > -1){
      return {fnIndex: i, result: result};
    }
  }
  return {fnIndex: 999, result: -1};
 };
 
 
PokerHand.prototype.issf=function(){
  var result = this.hand;
  var suit=result[0].suit;
  var isFlush=this.isFlush(result,suit);
  var isStraight=this.isStraight(result);
  if(isFlush ){
    return isStraight
  }
    return -1;
};

PokerHand.prototype.iss=function(){
  var result = this.hand;
  return this.isStraight(result);
};

PokerHand.prototype.isf=function(){
  var result = this.hand;
  var suit=result[0].suit;
  var isFlush=this.isFlush(result,suit);
  if (isFlush) {
    return this.highCards(result);
  }
  return -1;
};

PokerHand.prototype.isfk=function(){
  return this.isfkOrfh(3);
};

PokerHand.prototype.isfh=function(){

  return this.isfkOrfh(2, 1);
};

PokerHand.prototype.istk=function(){

  return this.isfkOrfh(2);
};

PokerHand.prototype.istp=function(){
  return this.isfkOrfh(1,1);
};

PokerHand.prototype.isop=function(){
  var result = this.hand;
  return (this.isfkOrfh(1) * 10000) + this.highCards(result);;
};

PokerHand.prototype.ishc=function(){
  return this.highCards(this.hand);
};

PokerHand.prototype.isfkOrfh=function(maxNum, secondMax){
  var result = this.hand;
  var groups = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var res = -1, secondRes = -1, prevRes = -1;
  result.forEach( (a) => {
      var ind = nums.indexOf(a.num);
      groups[ind] += 1; 
      
      if (secondMax && groups[ind] > secondMax) {
        secondRes = ind;
        prevRes = prevRes > -1 ? prevRes : secondRes;
        
      }
      
      if (groups[ind] > maxNum) {
      
        if(secondRes === ind) {
          secondRes = prevRes !== ind ? prevRes : -1;
        }
        
        res = ind;
      }
      
   });
  
    return !secondMax ? res : groups[secondRes] > secondMax ? res : -1;
};

PokerHand.prototype.isFlush = (hand, suit) => {
  return hand.every((e) => e.suit === suit);
};

PokerHand.prototype.isStraight = (hand) => {
  var sorted = hand.sort((a, b) => {
    return nums.indexOf(a.num) < nums.indexOf(b.num) ? -1 : 1;
  });
  for (var i=0; i < sorted.length - 1; i++) {
    if (nums.indexOf(sorted[i].num) !== nums.indexOf(sorted[i+1].num) - 1) {
      return -1;
    }
  }
  return nums.indexOf(sorted[sorted.length-1].num);
};

PokerHand.prototype.highCards = (hand) => {
  var sorted = hand.sort((a, b) => {
    return nums.indexOf(a.num) < nums.indexOf(b.num) ? -1 : 1;
  });

  return sorted.reduce(function(sum, value, i) {
  var val = nums.indexOf(value.num);
    return sum + (parseInt(val) * (i+1)*10);
  }, 0);
};

/*var player = "4S 5H 6H TS AC";
var opponent =  "3S 5H 6H TS AC";
var p = new PokerHand(player);
var o = new PokerHand(opponent);
*/
