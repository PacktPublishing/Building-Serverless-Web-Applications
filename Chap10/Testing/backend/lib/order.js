class Order {

    // Dependency Injection
    constructor(db, notifier) {
        this.db = db;
        this.notifier = notifier;
    }

    save(order, email, callback) { 
        this.db.saveOrder(order, (err) => {
            if (err) {
                callback(err);
            } else {
                this.notifier.sendEmail(email, callback);          
            }
        });
    }
}

module.exports = Order;