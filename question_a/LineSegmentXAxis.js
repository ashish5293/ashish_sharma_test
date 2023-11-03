"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineSegmentXAxis = void 0;
var LineSegmentXAxis = /** @class */ (function () {
    function LineSegmentXAxis(x1, x2) {
        this.x1 = x1;
        this.x2 = x2;
    }
    LineSegmentXAxis.prototype.overlapsWith = function (lineSegment) {
        // If one line segment starts after the other line segment ends, then they overlap
        return !(this.x1 > lineSegment.x2 || lineSegment.x1 > this.x2);
    };
    return LineSegmentXAxis;
}());
exports.LineSegmentXAxis = LineSegmentXAxis;
