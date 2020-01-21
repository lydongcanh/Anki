export default class Card {
    
    Card(_id, _front, _back, _type, _ease, _interval, _lastReviewTime) {
        this.id = _id;
        this.front = _front;
        this.type = _type;
        this.ease = _ease;
        this.interval = _interval;
        this.lastReviewTime = _lastReviewTime;
    }
}
