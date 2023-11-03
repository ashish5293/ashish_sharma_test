export class LineSegmentXAxis {
    constructor(public x1: number, public x2: number) {}

    public overlapsWith(lineSegment: LineSegmentXAxis): boolean {
        // If one line segment starts after the other line segment ends, then they overlap
        return !(this.x1 > lineSegment.x2 || lineSegment.x1 > this.x2);

    }
}
