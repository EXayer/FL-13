function isBigger(a, b) {
    return a > b;
}

function stringToNumber(str) {
    return +str;
}

/**
 * Calculates points of collection of football games for a team.
 *
 * @param {array} results of football matches.
 * @returns {number} points that team achieved.
 * @example
 *
 * func(['3:1','1:0','0:0','1:2','4:0','2:3','1:1','0:1','2:1','1:0'])
 * // => 17
 *
 * func(['1:1','1:2','2:0','4:2','0:1','2:3','1:1','0:1','1:1','3:0'])
 * // => 12
 */
function countPoints(results) {
    let points = 0;
    const WIN = 3;
    const DRAW = 1;
    const LOSE = 0;

    for(let i = 0; i < results.length; i++) {
        const match_points = results[i].split(':');
        const goals_scored = stringToNumber(match_points[0]);
        const goals_conceded = stringToNumber(match_points[1]);

        if (isBigger(goals_scored, goals_conceded)) {
            points += WIN;
        } else if (goals_scored === goals_conceded) {
            points += DRAW;
        } else {
            points += LOSE;
        }
    }

    return points;
}

countPoints(['3:1','1:0','0:0','1:2','4:0','2:3','1:1','0:1','2:1','1:0']);
countPoints(['1:1','1:2','2:0','4:2','0:1','2:3','1:1','0:1','1:1','3:0']);