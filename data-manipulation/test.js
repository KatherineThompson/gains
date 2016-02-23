'use strict';

const tape = require('tape'),
    dataManipulation = require('./');

tape('data-manipulation', t => {
    t.test('map', t => {
        t.test('subtractOneFromEachNumber', t => {
            t.plan(3);

            t.deepEqual(
                dataManipulation.subtractOneFromEachNumber([]),
                [],
                'returns an empty list when called with empty list'
            );

            t.deepEqual(
                dataManipulation.subtractOneFromEachNumber([1, 2, 3]),
                [0, 1, 2],
                'works with positive numbers'
            );

            t.deepEqual(
                dataManipulation.subtractOneFromEachNumber([-1, -4, 0]),
                [-2, -5, -1],
                'works with negative numbers'
            );
        });

        t.test('wrapStrings', t => {
            t.plan(3);

            t.deepEqual(
                dataManipulation.wrapStrings([]),
                [],
                'returns an empty list when called with empty list'
            );

            t.deepEqual(
                dataManipulation.wrapStrings(['inner', 'strings'], '_omg_'),
                ['_omg_inner_omg_', '_omg_strings_omg_'],
                'works with strings'
            );

            t.deepEqual(
                dataManipulation.wrapStrings(['wrapper string is empty'], ''),
                ['wrapper string is empty'],
                'works when wrapper string is empty'
            );
        });

        t.test('getStringLengths', t => {
            t.plan(3);

            t.deepEqual(
                dataManipulation.getStringLengths([]),
                [],
                'returns an empty list when called with empty list'
            );

            t.deepEqual(
                dataManipulation.getStringLengths(['inner', 'strings']),
                [5, 7],
                'works with strings'
            );

            t.deepEqual(
                dataManipulation.getStringLengths(['']),
                [0],
                'works with empty string'
            );
        });

        t.test('pick', t => {
            t.plan(3);

            t.deepEqual(
                dataManipulation.pick([]),
                [],
                'returns an empty list when called with empty list'
            );

            t.deepEqual(
                dataManipulation.pick([{name: 'Liam', age: 4}, {name: 'Potato', age: 13}], 'age'),
                [4, 13],
                'works with objects'
            );

            t.deepEqual(
                dataManipulation.pick([{nullKey: null}], 'nullKey'),
                [null],
                'works with null key'
            );
        });

        t.test('pluck', t => {
            t.plan(3);

            t.deepEqual(
                dataManipulation.pluck([]),
                [],
                'returns an empty list when called with empty list'
            );

            t.deepEqual(
                dataManipulation.pluck([{name: 'Liam', age: 4}, {name: 'Potato', age: 13}], 'age'),
                [{age: 4}, {age: 13}],
                'works with objects'
            );

            t.deepEqual(
                dataManipulation.pluck([{nullKey: null, keyWithValue: 'value'}], 'nullKey'),
                [{nullKey: null}],
                'works with null key'
            );
        });

        t.test('lookupUsers', t => {
            t.plan(3);

            t.deepEqual(
                dataManipulation.lookupUsers([], []),
                [],
                'returns an empty list when called with empty list'
            );

            const allUsers = [
                {name: "Liam", age: 4},
                {name: "Potato", age: 13},
                {name: "Paul", age: 32},
                {name: "Sally Ann Perkins", age: 31},
            ];
            t.deepEqual(
                dataManipulation.lookupUsers(allUsers, ["Liam", "Paul"]),
                [{name: "Liam", age: 4}, {name: "Paul", age: 32}],
                'returns users with the given names'
            );

            t.deepEqual(
                dataManipulation.lookupUsers(allUsers, ['Po']),
                [],
                'returns empty list when invalid users are specified'
            );
        });

        t.test('getFirstElements', t => {
            t.plan(3);

            t.deepEqual(
                dataManipulation.getFirstElements([]),
                [],
                'returns an empty list when called with empty list'
            );

            t.deepEqual(
                dataManipulation.getFirstElements([[5, 4, 3], [9, 8, 7]], 2),
                [[5, 4], [9, 8]],
                'returns the first elements'
            );

            t.deepEqual(
                dataManipulation.getFirstElements([[5, 4, 3], [9, 8, 7]], -1),
                [],
                'returns empty list when a negative count of elements is specified'
            );
        });
    });

    t.test('filter', t => {
        t.test('getOddNumbers', t => {
            t.plan(3);

            t.deepEqual(
                dataManipulation.getOddNumbers([]),
                [],
                'returns an empty list when called with empty list'
            );

            t.deepEqual(
                dataManipulation.getOddNumbers([5, 4, 3, 9, 8, 7]),
                [5, 3, 9, 7],
                'returns the odd numbers'
            );

            t.deepEqual(
                dataManipulation.getOddNumbers([2, 4, 6, 8]),
                [],
                'returns empty list when there are no odd numbers'
            );
        });

        t.test('getStringsWithCat', t => {
            t.plan(3);

            t.deepEqual(
                dataManipulation.getStringsWithCat([]),
                [],
                'returns an empty list when called with empty list'
            );

            t.deepEqual(
                dataManipulation.getStringsWithCat(['dog', 'po', 'liam', 'cat', 'big cat']),
                ['cat', 'big cat'],
                'returns strings with the phrase cat'
            );

            t.deepEqual(
                dataManipulation.getStringsWithCat(['reagan', 'theo']),
                [],
                'returns empty list when there are no cat strings'
            );
        });

        t.test('getNumberListsSummingToZero', t => {
            t.plan(3);

            t.deepEqual(
                dataManipulation.getNumberListsSummingToZero([]),
                [],
                'returns an empty list when called with empty list'
            );

            t.deepEqual(
                dataManipulation.getNumberListsSummingToZero([[-1, 1], [2, 3], [-2, -2, 0, 4]]),
                [[-1, 1], [-2, -2, 0, 4]],
                'returns lists summing to zero'
            );

            t.deepEqual(
                dataManipulation.getNumberListsSummingToZero([[2, 3], [6]]),
                [],
                'returns empty list when there are no lists summing to zero'
            );
        });

        t.test('getObjectsWithAtLeastThreeKeys', t => {
            t.plan(3);

            t.deepEqual(
                dataManipulation.getObjectsWithAtLeastThreeKeys([]),
                [],
                'returns an empty list when called with empty list'
            );

            t.deepEqual(
                dataManipulation.getObjectsWithAtLeastThreeKeys([{a: 1}, {objectWithThreeKeys: 2, c: 3, d: 4}]),
                [{objectWithThreeKeys: 2, c: 3, d: 4}],
                'returns a list with the objects with at least three keys'
            );

            t.deepEqual(
                dataManipulation.getObjectsWithAtLeastThreeKeys([{a: 1}, {}]),
                [],
                'returns empty list when there are no objects with at least three keys'
            );
        });
    });

    t.test('reduce', t => {
        t.test('powerAll', t => {
            t.plan(3);

            t.deepEqual(
                dataManipulation.powerAll([]),
                0,
                'returns 0 when called with empty list'
            );

            t.deepEqual(
                dataManipulation.powerAll([2, 3, 4]),
                4096,
                'correctly applies exponentiation'
            );

            t.deepEqual(
                dataManipulation.powerAll([2, 2, 2]),
                16,
                'correctly applies exponentiation to multiple identical elements'
            );
        });

        t.test('concatAll', t => {
            t.plan(3);

            t.deepEqual(
                dataManipulation.concatAll([]),
                '',
                'returns the empty string when called with empty list'
            );

            t.deepEqual(
                dataManipulation.concatAll(['aa', 'b', 'cde']),
                'aabcde',
                'concats all strings'
            );

            t.deepEqual(
                dataManipulation.concatAll(['ad', '', 'ggg']),
                'adggg',
                'handles empty strings'
            );
        });

        t.test('flatten', t => {
            t.plan(3);

            t.deepEqual(
                dataManipulation.flatten([]),
                [],
                'returns an empty list when called with empty list'
            );

            t.deepEqual(
                dataManipulation.flatten([['aa'], ['b', 3], ['cde', {a: 1}]]),
                ['aa', 'b', 3, 'cde', {a: 1}],
                'concats all lists'
            );

            t.deepEqual(
                dataManipulation.flatten([[], [], [1, 2], [3, [4]]]),
                [1, 2, 3, [4]],
                'handles empty and nested lists'
            );
        });

        t.test('getTotalLength', t => {
            t.plan(3);

            t.deepEqual(
                dataManipulation.getTotalLength([]),
                0,
                'returns zero when called with empty list'
            );

            t.deepEqual(
                dataManipulation.getTotalLength(['aaa', 'bb', 'c']),
                6,
                'gets the combined length of all strings'
            );

            t.deepEqual(
                dataManipulation.getTotalLength(['', 'ff', 'ggg']),
                5,
                'handles empty strings'
            );
        });

        t.test('map', t => {
            t.plan(2);

            t.deepEqual(
                dataManipulation.map([]),
                [],
                'returns an empty list when called with empty list'
            );

            t.deepEqual(
                dataManipulation.map(['aaa', 'bb', 'c'], str => str + str),
                ['aaaaaa', 'bbbb', 'cc'],
                'applies a function to all strings'
            );
        });

        t.test('filter', t => {
            t.plan(2);

            t.deepEqual(
                dataManipulation.filter([]),
                [],
                'returns an empty list when called with empty list'
            );

            t.deepEqual(
                dataManipulation.filter(['aaa', 'bb', 'c'], str => str.startsWith('a') || str.startsWith('b')),
                ['aaa', 'bb'],
                'filters list members by a predicate'
            );
        });

        t.test('reduce', t => {
            t.plan(2);

            t.deepEqual(
                dataManipulation.reduce([]),
                [],
                'returns an empty list when called with empty list'
            );

            t.deepEqual(
                dataManipulation.reduce([1, 2, 3], (sum, num) => sum + num, 0),
                6,
                'can be used to compute the sum of a list'
            );
        });

        t.test('reduceRecursive', t => {
            t.plan(2);

            t.deepEqual(
                dataManipulation.reduceRecursive([], () => null, 'initial value'),
                'initial value',
                'returns the initial value when called with empty list'
            );

            t.deepEqual(
                dataManipulation.reduceRecursive([1, 2, 3], (sum, num) => sum + num, 0),
                6,
                'can be used to compute the sum of a list'
            );
        });
    });
});