export default class Card {
    
    /**
     * @param {string} _front Unique question, also used to generate id.
     * @param {string} _back Answer.
     * @param {string} _type
     * @param {number} _ease
     * @param {number} _interval 
     * @param {Date} _lastReviewTime 
     */
    constructor (_front, _back, _type, _ease, _interval, _lastReviewTime) {
        this.front = _front;
        this.type = _type;
        this.ease = _ease;
        this.interval = _interval;
        this.lastReviewTime = _lastReviewTime;
    }
}
