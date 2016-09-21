/**
 * Created by phillip.gillan on 13/09/2016.
 */

//Exercise examples from the Good Parts tutorial on pluralsight

var exercise = (function() {

//write a function that takes an argument and returns an argument
    function identity(x) {

        return (x);
    }

// Write two binary functions ADD and MUL, that take two numbers and return their Sum and Product

    function add(x, y) {

        return (x + y);
    }

    function mul(x, y) {

        return (x * y);
    }

//Write a function that takes an argument and returns a function that returns that argument

    function identityf(x) {

        return function () {

            return x;
        };
    }

    var idf = identityf(3);
    idf();

// Write a function that adds form two invocations

    function addf(x) {

        return function (y) {

            return (x + y);
        }
    }

// Write a function that takes a binary function and makes it callable with two invocations

    function applyf(binary) {

        return function (x) {

            return function (y) {

                return binary(x, y)
            };
        };
    }

// Write a function that takes a function and an argument and returns a function that can supply a second argument

    function curry(binary, x) {

        return function (y) {

            return binary(x, y);
        };

    }

// Without writing any new functions show three ways to crete the inc function

    var inc = addf(1); //takes number adds 1
    var inc = applyf(add)(1); // takes the add function and adds one
    var inc = curry(add, 1); // same as above

// Write a methodise function that converts a binary function into a method

    function methodise(binary) {

        return function (y) {
            return binary(this, y);
        };
    }

// The ... notation coming soon will allow the passing of more arguments without checking


// Write demethodise a function that converts a method to a binary function

    function demethodise(method) {

        return function (that, y) {

            return method.call(that, y);
        };

    }

// Write a function twice that takes a binary function and returns a a unary function that passes its argument to the binary function twice

    function twice(binary) {

        return function (x) {

            return binary(x, x);
        };
    }

    var double = twice(add);
    double(11);
    var square = twice(mul);
    square(11);

// Write a function composeu that takes two unary functions and returns a unary function that calls them both

    function composeu(f, g) {

        return function (a) {

            return g(f(a));
        };
    }

// Write a function composeb that takes two functions and returns a function that calls them both

    function composeb(f, g) {

        return function (a, b, c) {

            return g(f(a, b), c)
        };


    }

// Write a function that allows another function to only be called once

    function once(func) {
        return function () {
            var f = func;
            func = null; // sets the function to null
            return f.apply(this, arguments);
        }
    };

//Write a factory function that implemnt an up/down counter

    function counterf(value) {

        return {
            inc: function () {

                value += 1;

                return value;
            },

            dec: function () {

                value -= 1;

                return value;
            }
        };
    };

    var counter = counterf(10);
    counter.inc();
    counter.dec();

// Make a revocable function that takes a nice function and returns a revoke function that denies access to the nice function and an invoke function
// that can inc=voke the nice function until it is revoked

    function revokable(nice) {

        return {
            invoke: function () {

                return nice.apply(this, arguments)
            },

            revoke: function () {

                nice = null;
            }
        };
    }


//Make an array wrapper object with methods GET, STORE and APPEND, such that an attacker cannot gain access to the private array

    function vector() {
        var array = [];

        return {
            get: function (a) {
                return array[a];
            },
            store: function (a, b) {
                array[a] = b;

            },
            append: function (a) {
                array.push[a];

            }
        }
    }

    var my_vector = vector();

    my_vector.append(7);
    my_vector.store(1, 8);
    my_vector.get(0);
    my_vector.get(1);


// Make a function that makes a publish/subscribe object. It will reliably deliver all publications to all subs in the right order

    function pubsub() {

        var subArray = [];

        return {
            subscribe: function (subscriber) {

                subArray.push[subscriber];
            },

            publish: function (publication) {

                for (var i = 0; i < subArray.length; i += 1) {
                    subArray[i](publication);
                }
            }
        };
    }

//Make a factory that makes functions that generate unique symbols

    function gensym(sym) {

        var i = -1;

        return function () {
            i += 1;
            return sym + i;
        };
    }

//Make a function that returns  function that will return the next fibonacci number

    function fibonaccif(a, b) {

        return function () {

            var n = a;
            a = b;
            b += n;
            return n;
        };
    }

// Write a function that adds from many invocations, until it sees an empty invocation.

    function addg(a) {
        return function step(y) {
            if (y === undefined) {
                return a;
            }

            a += y;
            return step;
        };
    }

//Write a function that will take a binary function and apply it to many invocations

    function applyg(binary) {

        var x;
        return function step(y) {

            if (y === undefined) {
                return x;
            }
            x = x === undefined
                ? y
                : binary(x, y);
            return step;
        };
    }

// question mark similar to an if statement

// Write a function m that takes a value and an optional source string and returns them in an object

    function m(value, source) {

        return {
            value: value,
            source: value === undefined
                ? String(value)
                : source
        };
    }

// write a function addm that takes two m objects and returns an m object

    function addm(f, g) {

        return m((f.value + g.value), ("(" + a.source + "+" + b.source + ")"));
        {
            return g(f);
        }
    }

//Write a function binarymf that takes a binary function and a string and returns a function that acts on m objects

    function binarymf(binary, op) {

        return function (a, b) {

            return m(binary(a.value, b.value), ("(" + a.source + op + b.source + ")"));
        };
    }

// Modify the functions binarymf so that the functions can produces can accept the arguments that are either numbers or m objects

    function binarymf(x, op) {

        return function (a, b) {
            if (typeof a === 'number') {

                a = m(a);
            }
            if (typeof b === 'number') {
                b = m(b);
            }

            return m(x(a.value, b.value), ("(" + a.source + op + b.source + ")"));
        };
    }

// Write function unarymf which like binarymf except that it acts on unary functions

    function unarymf(f, op) {

        return function (a) {

            if (typeof a === 'number') {

                a = m(a);
            }

            return m(f(a.value), "(" + op + " " + a.source + ")")
        }
    }

// write a function that takes the lengths of two sides of a triangle and computes the length of the hypotenuse

    function hyp(x, y) {

        return Math.sqrt(add(mul(x, x), mul(y, y)));
    }

//Write a function that evaluates array expressions

    function exp(value) {

        return Array.isArray(value)
            ? value[0](exp(value[1]), exp(value[2]))
            : value;
    }

// Make a function that stores a value in a variable

    var variable;

    function store(value) {

        variable = value;
    }

// Make a function that takes a binary function, two functions that provide an operands and a function that takes the result

    function quatre(binary, f, g, store) {

        return store(binary(f(), g()));
    }

    addc = (binaryyc(add));
    mulc = (binaryyc(mul));

    quatre(add, identityf(3), identityf(4), store);

// Makes a function that takes a unary function and returns a function that takes an argument callback

    function unaryc(unary) {

        return function (value, cb) {

            return cb(unary(value));
        };
    }

    sqrtc = unaryc(Math.sqrt);
    sqrtc(81, store);

// Make a function that takes a binary function and returns a function that takes two arguments and a callback

    function binaryyc(binary) {

        return function (x, y, store) {

            return store(binary(x, y));
        };
    }

//Write the hypc (hyp with the continuation) function using addc, mulc, and sqrtc

    function hypc(a, b, c) {

        return mulc(a, a, function (asqr) {

            return mulc(b, b, function (bsqr) {

                return addc(asqr, bsqr, function (addabsqr) {

                    return sqrtc(addabsqr, c);
                })
            })
        });
    }
}());