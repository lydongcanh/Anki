# Summary of the technical details

## Phases
### Learning Phase
By default, there's a test after one minute and another after 10 additional minutes. If you fail any of these tests, you go back to the first one. Once you complete them all, the card is shown, by default, the next day and goes to the Reviewing Phase. If you click the Easy Button at any point, the card will be shown four days later and it will skip immediately to the Reviewing Phase.

### Reviewing Phase (aka, when the card is Graduated)
You are tested indefinitely after progressively longer intervals. If you fail, you enter the Relearning Phase. The intervals are computed with the formulas explained below.

### Relearning Phase
You are tested every 10 minutes, by default, until you succeed. The new interval will be, by default, 0% of the interval immediately before entering the relearning step; so it will be the minimum interval, which, by default, is one day. 


## Interval formulas for Reviewing Phase
A different formula for computing the interval (to the next time the card is shown) is used depending on your recall performance:

* Again: go to relearning phase
* Hard: Current Interval * 1.2 * Interval Modifier
* Good: Current Interval * Ease * Interval Modifier
* Easy: Current Interval * Ease * Interval Modifier * Easy Bonus

The factors used above are defined as follows.

### Ease
The Ease is a property of the card.
By default, it starts at 250%.
Its minimum value is 130%.
During the Reviewing Phase, it changes depending on your recall performance:

* Again: -20%
* Hard: -15%
* Good: +0%
* Easy: +15%

### Interval Modifier
The Interval Modifier is a property of the deck.
By default, it is 100%.

### Easy Bonus
The Easy Bonus is a property of the deck.
By default, it is 130%.
