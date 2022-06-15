import { doVisitedAnimation, doPathAnimation, isCellValid, doInstantAnimation } from "../utils/helpful";

const bidirectional = async (grid, startX, startY, endX, endY, message, animationSpeed) => {
	const doAnimation = [];
	const shortestPath = await doBidirectional(grid, startX, startY, endX, endY, doAnimation);
	if(message) {
		let result = "failure";
		if(shortestPath) {
			result = shortestPath.length > 0 ? "success" : "failure";
		}
		doInstantAnimation(grid, doAnimation, startX * 61 + startY, endX * 61 + endY, '', shortestPath, result);
		return result;
	}
	await doVisitedAnimation(doAnimation, startX* 61 + startY, endX * 61 + endY, animationSpeed);

	if(shortestPath === undefined || shortestPath.length === 0) {
		return 'failure';
	}
	doPathAnimation(grid, shortestPath, startX * 61 + startY, endX * 61 + endY, animationSpeed);
    await new Promise((resolve) =>
          setTimeout(() => {
              resolve();    
    }, shortestPath.length * animationSpeed));
    return "success";
}

const doBidirectional = (grid, startX, startY, endX, endY, doAnimation) => {
	grid[endX][endY].isWall = grid[startX][startY].isWall = false;
	let frontVisited = initialize();
	let endVisited = initialize();
	const frontParent = [], endParent = [];
	const frontQueue = [], endQueue = [];
	frontQueue.push([startX, startY]);
    frontVisited[startX][startY] = true;
	endQueue.push([endX, endY]);
	endVisited[endX][endY] = true;
	let shortestPath;
	let intersectionNode = undefined;

	while(frontQueue.length > 0 && endQueue.length > 0) {
		doBFS(grid, frontQueue, frontVisited, frontParent, doAnimation);
		doBFS(grid, endQueue, endVisited, endParent, doAnimation);
		intersectionNode = didIntersect(frontVisited, endVisited);
		if(intersectionNode !== undefined) {
			shortestPath = getPath(frontParent, endParent, intersectionNode);
			return shortestPath;
		}
	}
	return shortestPath;
}


const doBFS = (grid, queue, visited, parent, doAnimation) => {
	const node = queue.shift();
	const directionX = [-1, 0, 1, 0];
    const directionY = [0, -1, 0, 1];

	for(let i = 0; i < 4; i++) {
		const x = node[0] + directionX[i], y = node[1] + directionY[i]
		if(isCellValid(grid, x, y, visited)) {
			queue.push([x, y]);
			parent.push([node[0], node[1], x, y]);
			const m = grid[x][y].isWeight ? "t" : "f";
			doAnimation.push([x * 61 + y, m]);
			visited[x][y] = true;
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

const initialize = () => {
    let grid = [];
    for(let i = 0; i < 21; i++) {
        let temp = [];
        for(let j = 0; j < 61; j++) {
            temp.push(false);
        }
        grid.push(temp);
    }
    return grid;
}

export default bidirectional;