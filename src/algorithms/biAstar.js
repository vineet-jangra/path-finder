import { doVisitedAnimation, doPathAnimation, doInstantAnimation, isCellValid } from '../utils/helpful';
const MAX = Number.MAX_SAFE_INTEGER;

const bidirectionalAstar = async(grid, startX, startY, endX, endY, message, animationSpeed) => {
    const parent = [], doAnimation = [];
    const shortestPath = await Astar(grid, startX, startY, endX, endY, doAnimation);
    if(message) {
        let result = "failure";
		if(shortestPath) {
			result = shortestPath.length > 0 ? "success" : "failure";
		}
        doInstantAnimation(grid, doAnimation, startX * 61 + startY, endX * 61 + endY, '', shortestPath, result);
        return result;
    }
    await doVisitedAnimation(doAnimation, startX * 61 + startY, endX * 61 + endY, animationSpeed);

    if(shortestPath === undefined || shortestPath.length === 0) {
		return 'failure';
	}
    await doPathAnimation(grid, shortestPath, startX * 61 + startY, endX * 61 + endY, animationSpeed);
    await new Promise((resolve) =>
    setTimeout(() => {
        resolve();    
    }, shortestPath.length * animationSpeed));
    return "success";
}

const Astar = (grid, startX, startY, endX, endY, doAnimation) => {
    grid[endX][endY].isWall = grid[startX][startY].isWall = false;
    const startOpenList = [], endOpenList = [];
    const frontParent = [], endParent = [];
    let startGScore = [], startFScore = [], startVisited = [];
    let endGScore = [], endFScore = [], endVisited = [];
    initialize(startGScore, startFScore, startVisited);
    initialize(endGScore, endFScore, endVisited);

    startGScore[startX][startY] = startFScore[startX][startY] = 0;
    startOpenList.push([0, startX, startY]);

    endGScore[endX][endY] = endFScore[endX][endY] = 0;
    endOpenList.push([0, endX, endY]);
    let shortestPath;
    let intersectionNode = undefined;
    while(startOpenList.length > 0 && endOpenList.length > 0) {
        doAstar1(startOpenList, endX, endY, startVisited, startFScore, startGScore, grid, doAnimation, frontParent);
        doAstar2(endOpenList, startX, startY, endVisited, endFScore, endGScore, grid, doAnimation, endParent);
        intersectionNode = didIntersect(startVisited, endVisited);
        if(intersectionNode !== undefined) {
            shortestPath = getPath(frontParent, endParent, intersectionNode);
            console.log('found');
            return shortestPath;
        }
    }
    return shortestPath;
}

const doAstar1 = (openList, endX, endY, visited, fScore, gScore, grid, doAnimation, parent) => {
    const node = Sort(openList, endX, endY);
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    let x = node[1];
    let y = node[2];
    const m = grid[x][y].isWeight ? "t" : "f";
    doAnimation.push([x * 61 + y, m]);
    visited[x][y] = true;
    for(let i = 0; i < 4; i++) {
        const newX = x + dx[i], newY = y + dy[i];  
        if(isCellValid(grid, newX, newY, visited)) {
            
            const gscore = gScore[x][y] + (grid[newX][newY].isWeight === true ? 15 : 1);
            const hValue = heuristic(newX, newY, endX, endY);
            const fscore = gscore + hValue;

            if(fScore[newX][newY] === MAX || fScore[newX][newY] > fscore) {
                openList.push([fscore, newX, newY]);
                fScore[newX][newY] = fscore;
                gScore[newX][newY] = gscore;
                parent.push([x, y, newX, newY]);
            }
        }
    }
}

const doAstar2 = (openList, startX, startY, visited, fScore, gScore, grid, doAnimation, parent) => {
    const node = Sort(openList, startX, startY);
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    let x = node[1];
    let y = node[2];
    const m = grid[x][y].isWeight ? "t" : "f";
    doAnimation.push([x * 61 + y, m]);
    visited[x][y] = true;
    for(let i = 0; i < 4; i++) {
        const newX = x + dx[i], newY = y + dy[i];  
        if(isCellValid(grid, newX, newY, visited)) {
            
            const gscore = gScore[x][y] + (grid[newX][newY].isWeight === true ? 15 : 1);
            const hValue = heuristic(newX, newY, startX, startY);
            const fscore = gscore + hValue;

            if(fScore[newX][newY] === MAX || fScore[newX][newY] > fscore) {
                openList.push([fscore, newX, newY]);
                fScore[newX][newY] = fscore;
                gScore[newX][newY] = gscore;
                parent.push([x, y, newX, newY]);
            }
        }
    }
}

const getPath = (frontParent, endParent, intersectionNode) => {
	const path = [];
	let node = intersectionNode;
	let current = undefined;
	for(let i = frontParent.length - 1; i >= 0; i--) {
		if(frontParent[i][2] === intersectionNode[0] && frontParent[i][3] === intersectionNode[1]) {
			current = i;
			break;
		}
	}
	while(current >= 0) {
		if(frontParent[current][2] === node[0] && frontParent[current][3] === node[1]) {
			const X = frontParent[current][0];
            const Y = frontParent[current][1];
            path.push(X * 61 + Y);
			node = [frontParent[current][0], frontParent[current][1]];
		}
		current--;
	}
	path.reverse();
	path.push(intersectionNode[0] * 61 + intersectionNode[1]);
	node = intersectionNode;
	for(let i = endParent.length - 1; i >= 0; i--) {
		if(endParent[i][2] === intersectionNode[0] && endParent[i][3] === intersectionNode[1]) {
			current = i;
			break;
		}
	}
	while(current >= 0) {
		if(endParent[current][2] === node[0] && endParent[current][3] === node[1]) {
			const X = endParent[current][0];
            const Y = endParent[current][1];
            path.push(X * 61 + Y);
			node = [endParent[current][0], endParent[current][1]];
		}
		current--;
	}
	return path;
}

const didIntersect = (frontVisited, endVisited) => {
	for(let i = 0; i < 21; i++) {
		for(let j = 0; j < 61; j++) {
			if(frontVisited[i][j] && endVisited[i][j]) {
				return [i, j];
			}
		}
	}
	return undefined;
}



const Sort = (set, endX, endY) => {
    let index = 0, min = set[0];
    for(let i = 0; i < set.length; i++) {
        if(set[i][0] < min[0]) {
            min = set[i];
            index = i;
        }
        else if(set[i][0] === min[0]) {
            const h1 = heuristic(set[i][1], set[i][2], endX, endY)
            const h2 = heuristic(min[1], min[2], endX, endY);
            if(h1 < h2) {
                min = set[i];
                index = i;
            }
        }
    }
    const node = set[index];
    set.splice(index, 1);
    return node;
}

const initialize = (gScore, fScore, visited) => {
    for(let i = 0; i < 21; i++) {
        let temp = [];
        let vis = [];
        for(let j = 0; j < 61; j++) {
            temp.push(MAX);
            vis.push(false);
        }
        visited.push(vis); gScore.push(temp); fScore.push(temp);
    }
}

const heuristic = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
export default bidirectionalAstar;