import { doVisitedAnimation, doPathAnimation, doInstantAnimation } from "../utils/helpful";
const MAX = Number.MAX_SAFE_INTEGER;

const biDijkstra = async (grid, startX, startY, endX, endY, message, animationSpeed) => {
	const doAnimation1 = [], doAnimation2 = [];
	const shortestPath = await doBidirectional(grid, startX, startY, endX, endY, doAnimation1, doAnimation2);
	const animate = [];
	for(let i = 0; i < Math.max(doAnimation1.length, doAnimation2.length); i++) {
		if(i < doAnimation1.length) {
			animate.push(doAnimation1[i]);
		}
		if(i < doAnimation2.length) {
			animate.push(doAnimation2[i]);
		}
	}
	if(message) {
		let result = "failure";
		if(shortestPath) {
			result = shortestPath.length > 0 ? "success" : "failure";
		}
		doInstantAnimation(grid, animate, startX * 61 + startY, endX * 61 + endY, '', shortestPath, result);
		return result;
	}
	await doVisitedAnimation(animate, startX* 61 + startY, endX * 61 + endY, animationSpeed);
	
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

const doBidirectional = (grid, startX, startY, endX, endY, doAnimation1, doAnimation2) => {
	grid[endX][endY].isWall = grid[startX][startY].isWall = false;
    let frontVisited = [], endVisited = [], frontDistance = [], endDistance = [];
	initialize(frontVisited, frontDistance);
	initialize(endVisited, endDistance);
	
    frontVisited[startX][startY] = true;
    endVisited[endX][endY] = true;
	const frontParent = [], endParent = [];
	
    frontDistance[startX][startY] = 0;
    endDistance[endX][endY] = 0;
	let shortestPath;
	let intersectionNode = undefined;
	
		
		doDijkstra1(grid, frontDistance, frontParent, doAnimation1, frontVisited, startX, startY, endX, endY);
		doDijkstra1(grid, endDistance, endParent, doAnimation2, endVisited, endX, endY, startX, startY);
		intersectionNode = didIntersect(frontVisited, endVisited);
		if(intersectionNode !== undefined) {
			let flag = false;
			console.log(intersectionNode, '1');
			for(let i = 0 ; i < doAnimation1.length; i++ ) {
				if(flag) {
					doAnimation1.splice(i);
				}
				if(doAnimation1[i][0] / 61 === intersectionNode[0] && doAnimation1[i][1] % 21 === intersectionNode[1]) {flag = true; console.log('hel');}
			}
			flag = false;
			for(let i = 0 ; i < doAnimation2.length; i++ ) {
				if(flag) {
					doAnimation2.remove(i);
				}
				if(doAnimation2[i][0] / 61 == intersectionNode[0] && doAnimation2[i][1] % 21 == intersectionNode[1]) flag = true;
			}
			console.log(doAnimation1, '2');
			shortestPath = getPath(frontParent, endParent, intersectionNode);
			return shortestPath;
		}
	
	return shortestPath;
}


const doDijkstra1 = (grid, distance, parent, doAnimation, visited, startX, startY, endX, endY) => {
	const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    grid[endX][endY].isWall = grid[startX][startY].isWall = false;
    distance[startX][startY] = 0;
    const helper = [];
    helper.push([0, startX, startY]);
	visited[startX][startY] = true;
    while(helper.length > 0) {
        Sort(helper);
        let x = helper[0][1];
        let y = helper[0][2];
        let m = grid[x][y].isWeight ? "t" : "f";
        doAnimation.push([helper[0][1] * 61 + helper[0][2], m]);
		visited[x][y] = true;
        helper.shift();
        for(let i = 0; i < 4; i++) {
            if(isCellValid(grid, x + dx[i], y+ dy[i])) {
                const newX = x + dx[i];
                const newY = y + dy[i];
                parent.push([x, y, newX, newY]);
                if(newX === endX && newY === endY) {
                    doAnimation.push([newX * 61 + newY, 'f']);
                    console.log('found');
                    return "success";
                }
                let dist = grid[newX][newY].isWeight === true ? 15 : 1;

                if(distance[newX][newY] > distance[x][y] + dist) {
                    distance[newX][newY] = distance[x][y] + dist;
                    helper.push([distance[newX][newY], newX, newY]);
                }
            }
        }
    }
    return "failure";
}

const Sort = (helper) => {
    helper.sort((first, second) => first[0] - second[0]);
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

const initialize = (array, grid) => {
    for(let i = 0; i < 21; i++) {
        let temp = [];
        let val = [];
        for(let j = 0; j < 61; j++) {
            temp.push(MAX);
            val.push(false);
        }
        array.push(val);
        grid.push(temp);
    }
}
const isCellValid = (grid, X, Y) => {
    if(X < 0 || X >= 21 || Y < 0 || Y >= 61) {
        return false;
    }
    if(grid[X][Y].isWall === true) {
        return false;
    }
    return true;
}

export default biDijkstra;