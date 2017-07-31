const assert = require('assert');
const greetings = require('../../functions/greetings');

// list the unit tests of the greetings function
describe('Greetings', () => {

    // this is the only test that we have for this file
    describe('#hello()', () => {

        // the `done` argument must be used only for 
        // async tests, like this one
        it('should return hello + name', (done) => {

            // set the event variable as expected by the function
            const event = { 
                name: 'John'
            };

            // context can be null in this test
            const context = null;
    
            // invoke the function locally
            greetings.hello(event, context, (err, response) => {
                
                const expected = 'Hello, John!';
                const actual = response;
        
                // testing if the result is the expected
                assert.equal(expected, actual);

                // exiting successfully if `err` variable is null
                done(err);
            });
        }); 
    });
});