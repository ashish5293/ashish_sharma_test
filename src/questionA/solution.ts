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
    // Overlapping: Second line starts before first one ends
    { line1: new LineSegmentXAxis(1, 5), line2: new LineSegmentXAxis(2, 6) },

    // Non-overlapping: First line ends where the second line starts
    { line1: new LineSegmentXAxis(1, 5), line2: new LineSegmentXAxis(5, 8) },

    // Overlapping: First line ends after second line starts
    { line1: new LineSegmentXAxis(2, 6), line2: new LineSegmentXAxis(5, 10) },

    // Overlapping: First line ends where the second line starts (edge case of touching bounds)
    { line1: new LineSegmentXAxis(-9, -3.0000001), line2: new LineSegmentXAxis(-3, 2) },

    // Coinciding at a point (edge case, depending on implementation may be considered as overlapping or not)
    { line1: new LineSegmentXAxis(0, 0), line2: new LineSegmentXAxis(0, 0) },

    // Directly adjacent (non-overlapping) but touching at a point
    { line1: new LineSegmentXAxis(1, 3), line2: new LineSegmentXAxis(3, 5) },

    // One inside the other (overlapping), fully contained
    { line1: new LineSegmentXAxis(1, 10), line2: new LineSegmentXAxis(2, 9) },

    // Partial overlap, sharing a segment
    { line1: new LineSegmentXAxis(1, 4), line2: new LineSegmentXAxis(3, 6) },

    // No overlap, one line segment completely to the left
    { line1: new LineSegmentXAxis(-5, -1), line2: new LineSegmentXAxis(1, 3) },

    // No overlap, one line segment completely to the right
    { line1: new LineSegmentXAxis(1, 2), line2: new LineSegmentXAxis(3, 4) },

    // Overlapping at a single point
    { line1: new LineSegmentXAxis(1, 2), line2: new LineSegmentXAxis(2, 3) },

    // One line segment is a single point within another segment
    { line1: new LineSegmentXAxis(1, 1), line2: new LineSegmentXAxis(0, 2) },

    // One line segment is a single point outside another segment
    { line1: new LineSegmentXAxis(-1, -1), line2: new LineSegmentXAxis(0, 2) },

    // Overlapping line segments with negative coordinates
    { line1: new LineSegmentXAxis(-8, -3), line2: new LineSegmentXAxis(-6, -1) },

    // Non-overlapping line segments with negative coordinates
    { line1: new LineSegmentXAxis(-10, -7), line2: new LineSegmentXAxis(-6, -5) },

    // Identical line segments, fully overlapping
    { line1: new LineSegmentXAxis(2, 5), line2: new LineSegmentXAxis(2, 5) },
];


lineSegmentComparisonCases.forEach((linesToCheck) => {
    const { line1, line2 } = linesToCheck;
    console.log(message(line1, line2, line1.overlapsWith(line2)));
});
