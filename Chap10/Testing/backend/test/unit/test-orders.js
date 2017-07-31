const assert = require('assert');
const sinon = require('sinon');
const Order = require('../../lib/order');

describe('Order', () => {
    describe('#saveOrder()', () => {
        it('should call db and notifier', (done) => {
        
            // define the behavior of the fake functions
            const dbMock = {
                saveOrder: (order, callback) => {
                    callback(null);
                }
            }  

            const notifierMock = {
                sendEmail: (email, callback) => {
                    callback(null);
                }
            }

            // spy the objects to identify when and how they are executed
            sinon.spy(dbMock, 'saveOrder');
            sinon.spy(notifierMock, 'sendEmail');

            // define the input event 
            const event = { 
                order: { id: 1 },
                email: 'example@example.com'
            };

            // inject the mocked objects
            const order = new Order(dbMock, notifierMock);

            // execute the function
            order.save(event.order, event.email, (err, res) => {

                // assert if the mocked functions were used as expected
                assert(dbMock.saveOrder.calledOnce, true);
                assert(notifierMock.sendEmail.calledOnce, true);
                assert(dbMock.saveOrder.calledWith(event.order), true);
                assert(notifierMock.sendEmail.calledWith(event.email), true);

                done(err);
            })
        });
    }); 
});