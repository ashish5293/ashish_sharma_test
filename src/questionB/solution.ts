/*
Question B:
    The goal of this question is to write a software library that accepts 2 version string as input and
    returns whether one is greater than, equal, or less than the other. As an example: “1.2” is
    greater than “1.1”. Please provide all test cases you could think of.
*/

import { compareVersions } from "./compareVersions";


const compareVersionsCases = [
    { version1: '1.2', version2: '1.1', expected: 1 },
    { version1: '1.0', version2: '1.0.0', expected: 0 },
    { version1: '1.0.0', version2: '1.0.1', expected: -1 },
    { version1: '1.0', version2: '1', expected: 0 },
    { version1: '1.2.3', version2: '1.2.3', expected: 0 },
    { version1: '1.2.3', version2: '1.2.3.4', expected: -1 },
    { version1: '1.2.3.4', version2: '1.2.3', expected: 1 },
    { version1: '1.10', version2: '1.2', expected: 1 },
    { version1: '1.0.0.0', version2: '1', expected: 0 },
    { version1: '0.9', version2: '1.0', expected: -1 },
    // error cases
    { version1: '1.0.0-dne', version2: '1.0.0', expected: 'error' },
    { version1: 'incorrect.2.3', version2: '1.0', expected: 'error' },
    { version1: '1..0', version2: '1.0', expected: 'error' },
    { version1: '1._.0', version2: '1.0', expected: 'error' },
    { version1: '-1.0', version2: '1.0', expected: 'error' }
];

compareVersionsCases.forEach(({ version1, version2, expected }) => {
    try {
        const result = compareVersions(version1, version2);
        console.log(`Comparing versions '${version1}' and '${version2}' with expected value of ${expected}: Result -> ${result}`);
        if (result !== expected) {
            console.error(`Test failed for versions '${version1}' and '${version2}'. Expected ${expected} but got ${result}.`);
        }
    } catch (error) {
        if (expected === 'error') {
            console.log(`Error while comparing versions: '${version1}' and '${version2}'. ${error}`);
        } else {
            console.error(`Unexpected error while comparing versions '${version1}' and '${version2}': ${error}`);
        }
    }
});

