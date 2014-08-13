/**
 * Created by sunboss on 2014/8/13.
 */
var inputValid;

module("Basic input validation tests", {
    setup: function() {
        inputValid = new inputValid();
    }
});

test("testUsername", function() {
    inputValid.testUsername(null, function(errCode) {
        equal("errIsNull", errCode, "passes, username can't be null");
    });
    inputValid.testUsername("", function(errCode) {
        equal("errIsNull", errCode, "passes, username can't be null");
    });
    inputValid.testUsername("1", function(errCode) {
        equal("errTooShort", errCode, "passes, username too short");
    });
    inputValid.testUsername("ab", function(errCode) {
        equal("errTooShort", errCode, "passes, username too short");
    });
    inputValid.testUsername("abcdefghijklmnopqrstu", function(errCode) {
        equal("errTooLong", errCode, "passes, username too long");
    });
    inputValid.testUsername("12345", function(errCode) {
        equal("errInvalidStart", errCode, "passes, should start with letter");
    });
    inputValid.testUsername("_12345", function(errCode) {
        equal("errInvalidStart", errCode, "passes, should start with letter");
    });
    inputValid.testUsername("X#1234", function(errCode) {
        equal("errInvalidChar", errCode, "passes, invalid char");
    });
    inputValid.testUsername("tonysun", function(errCode) {
        ok(!errCode, "passes, username valid");
    });

    inputValid.testPassword(null, function(errCode) {
        equal("errIsNull", errCode, "passes, password can't be null");
    });
    inputValid.testPassword("", function(errCode) {
        equal("errIsNull", errCode, "passes, password can't be null");
    });
    inputValid.testPassword("1", function(errCode) {
        equal("errTooShort", errCode, "passes, password too short");
    });
    inputValid.testPassword("ab", function(errCode) {
        equal("errTooShort", errCode, "passes, password too short");
    });
    inputValid.testPassword("abcdefghijklmnopqrstu", function(errCode) {
        equal("errTooLong", errCode, "passes, password too long");
    });
    inputValid.testPassword("X%1234", function(errCode) {
        equal("errInvalidChar", errCode, "passes, invalid char");
    });
    inputValid.testPassword("*abcd[", function(errCode) {
        equal("errInvalidChar", errCode, "passes, invalid char");
    });
    inputValid.testPassword("1qazxsw2", function(errCode) {
        ok(!errCode, "passes, password valid");
    });
});