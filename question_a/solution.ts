/*
Question A:
    Your goal for this question is to write a program that accepts two lines (x1,x2) and (x3,x4) on the
    x-axis and returns whether they overlap. As an example, (1,5) and (2,6) overlaps but not (1,5)
    and (6,8).
*/

import { LineSegmentXAxis } from "./LineSegmentXAxis";

const message = (line1: LineSegmentXAxis, line2: LineSegmentXAxis, doOverlap: boolean) =>
    `Are line segments (${line1.x1},${line1.x2}) and (${line2.x1},${line2.x2}) overlapping? ${doOverlap}`;


const lineSegmentComparisonCases = [
    { line1: new LineSegmentXAxis(1, 5), line2: new LineSegmentXAxis(2, 6) },
    { line1: new LineSegmentXAxis(1, 5), line2: new LineSegmentXAxis(6, 8) },
    { line1: new LineSegmentXAxis(2, 6), line2: new LineSegmentXAxis(5, 10) },
    { line1: new LineSegmentXAxis(-9, -3.0000001), line2: new LineSegmentXAxis(-3, 2) },
    { line1: new LineSegmentXAxis(0, 0), line2: new LineSegmentXAxis(0, 0) },
];

lineSegmentComparisonCases.forEach((linesToCheck) => {
    const { line1, line2 } = linesToCheck;
    console.log(message(line1, line2, line1.overlapsWith(line2)));
});
