# bowlingScoreCalculator

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

# CsvSorter:

describe('Challenge', function() {
  it('should handle the example', function() {
    assert.equal(sortCsvColumns("Beth,charles,Danielle,Adam,Eric\n17945,10091,10088,3907,10132\n2,12,13,48,11"), "Adam,Beth,charles,Danielle,Eric\n3907,17945,10091,10088,10132\n48,2,12,13,11");
  });
  
# findNearestClone
https://www.hackerrank.com/challenges/find-the-nearest-clone

there is a connected undirected graph where each of the nodes is a color. Given a color, find the shortest path connecting any two nodes of that color. Each edge has a weight of . If there is not a pair or if the color is not found, print .

For example, given , and  edges  and  and colors for each node are  we can draw the following graph:

https://s3.amazonaws.com/hr-assets/0/1529952915-a96eba7baa-nearestcloneexample.png

Each of the nodes is labeled [node]/[color] and is colored appropriately. If we want the shortest path between color , blue, we see there is a direct path between nodes  and . For green, color , we see the path length  from . There is no pair for node  having color , red.
  
# pokerCalculator

A famous casino is suddenly faced with a sharp decline of their revenues. They decide to offer Texas hold'em also online. Can you help them by writing an algorithm that can rank poker hands?

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
