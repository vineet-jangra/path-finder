const selector = document.getElementsByClassName('node');

const getPath = (parent) => {
    let index = parent.length - 1;
    let X = parent[index][0];
    let Y = parent[index][1];
    const animation = [];
    animation.push(parent[index][2] * 61 + parent[index][3]);
    animation.push(parent[index][0] * 61 + parent[index][1]);
    index--;
    while(index >= 0) {
        if(parent[index][2] === X && parent[index][3] === Y) {
            X = parent[index][0];
            Y = parent[index][1];
            animation.push(X * 61 + Y);
        }
        index--;
    }
    animation.reverse();
    // const newAnimation = getPathWithDirection(animation, grid);
    return animation;
}
const getPathWithDirectio = (animation, grid) => {
    const directionPath = [];
    for(let i = 0; i < animation.length; i++) {
        const a = Math.floor(animation[i] / 61);
        const b = animation[i] % 61;
        const m = grid[a][b].isWeight ? "t" : "f";
        directionPath.push([animation[i], m]);
        // const x = animation[i] - animation[i - 1];
        // if(x === 1) {
        //     directionPath.push([animation[i], 'r', m]);
        // } else if(x === -1) {
        //     directionPath.push([animation[i], 'l', m]);
        // } else if(x === 61) {
        //     directionPath.push([animation[i], 'd', m]);
        // } else if(x === -61) {
        //     directionPath.push([animation[i], 'u', m]);
        // }
    }
    return directionPath;
}
const doVisitedAnimatio = async(doAnimation, start, end, animationSpeed) => {
    // do as same as slow one
    for(let i = 0; i < doAnimation.length; i++) {
        if(doAnimation[i][0] === start || doAnimation[i][0] === end) continue;
        let c = doAnimation[i][1] === 't' ? " node-weight" : "";
        setTimeout(() => {
            selector[doAnimation[i][0]].className = "node node-visited" + c;
        }, i * animationSpeed);
    }
    const x = doAnimation.length * animationSpeed;
    await new Promise((resolve) => {
        setTimeout(() => {
            console.log('hello');
        resolve();
        }, x)
    });
}
const doPathAnimatio = (grid, shortestPath, start, end, animationSpeed) => {
    // selector[shortestPath[1][0]].className = "node node-left";
    if(shortestPath[0] === start) {
        shortestPath = getPathWithDirection(shortestPath, grid);
    }
    for(let i = 1; i < shortestPath.length; i++) {
        let clas;
        const x = shortestPath[i][1] === 't' ? "node-weight" : "";
        // if(shortestPath[i][1] === 'r') {
        //     clas = "node-right";
        // } else if(shortestPath[i][1] === 'l') {
        //     clas = "node-left";
        // } else if(shortestPath[i][1] === 'd') {
        //     clas = "node-down";
        // } else if(shortestPath[i][1] === 'u') {
        //     clas = "node-up";
        // }
        if(shortestPath[i][0] === start || shortestPath[i][0] === end) continue;
        setTimeout(() => {
            selector[shortestPath[i][0]].className = "node node-path " + x;
            // selector[shortestPath[i][0]].className = `node ${clas} `;
        }, i * animationSpeed);
    }
}
const doInstantAnimatio = (grid, doAnimation, start, end, parent, path, result) => {
    for(let i = 0; i < doAnimation.length; i++) {
        const c = doAnimation[i][1] === 't' ? " node-weight" : "";
        if( doAnimation[i][0] === start || doAnimation[i][0] === end) continue;
        selector[doAnimation[i][0]].className = "node node-visited" + c;
    }
    if(result === 'failure') return;
    if(path && path.length > 0) {
        if(path[0] === start) {
            path = getPathWithDirection(path, grid);
        }
        for(let i = 1; i < path.length; i++) {
            if( path[i][0] === start || path[i][0] === end) continue;
            const x = path[i][1] === 't' ? "node-weight" : "";
            selector[path[i][0]].className = "node node-path " + x;
        }    
        return;
    }
    let shortestPath = getPath(parent);
    shortestPath = getPathWithDirection(shortestPath, grid);
    for(let i = 0; i < shortestPath.length; i++) {
        if( shortestPath[i][0] === start || shortestPath[i][0] === end) continue;
        const x = shortestPath[i][1] === 't' ? "node-weight" : "";
        selector[shortestPath[i][0]].className = "node node-path " + x;
    }
}
const isCellVali = (grid, X, Y, visited) => {
    if(X < 0 || X >= 21 || Y < 0 || Y >= 61) {
        return false;
    }
    if(visited[X][Y] === true || grid[X][Y].isWall === true) {
        return false;
    }
    return true;
}

export{
    getPat as getPath,
    doVisitedAnimatio as doVisitedAnimation,
    doPathAnimatio as doPathAnimation,
    doInstantAnimatio as doInstantAnimation,
    isCellVali as isCellValid,
};