/**
 * Created by Armin on 25.05.2017.
 */
var assert = require('assert');
module.exports = {
    'Test 1' : function(test) {
        test.expect(1);
        test.ok(true, "This shouldn't fail");
        assert.equal('A', 'A');
        test.done();
    },
    'Test 2' : function(test) {
        test.expect(1);
        test.ok(1 === 1, "This shouldn't fail");
        test.done();
    }
};