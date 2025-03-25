const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
// Definir el tamaño de cada celda y el tamaño del tablero.
const cellSize = 20;
const boardSize = canvas.width / cellSize;
// Iniciar la serpiente.
let snake = [{x: 5, y: 5}];
//Definir la direccion de la serpiente.
let dx = 1; //derecha
let dy = 0;
// defini la velocidad de la serpiente 
let snakeSpeed = 200;//milisegundos (mas alto es mas lento)
let gameStarted = false;

let food = {x:getRandomCoordinate(),y:getRandomCoordinate()};
let score = 0;//funcion para dibujar los puntos en el canvas

//function drawScore(){// funcion para colocar los puntos
   // const scoreElement = document.getElementById("");
    //scoreElement.innerHTML= "Puntos"+ score;
    //ctx.fillStyle = " white";// para la color de los puntos
    //ctx.font = "16px Arial";
  //  ctx.fillText("Puntos:" + score,10,20);
//}

function getRandomCoordinate(){
    return Math.floor(Math.random() * boardSize);
}
function checkFoodCollision(){
    const head = snake[0];
    if(head.x === food.x && head.y === food.y){
        score++;
        document.getElementById("score").textContent=score.toString();
        if(score >= 5){
            endGame();
            //ssreturn;
        }
        const newHead = {x:head.x + dx,y: head.y + dy};
        snake.unshift(newHead);
        food = {x: getRandomCoordinate(),y: getRandomCoordinate()};
        
    }
    
}
function drawFood(){
    ctx.fillStyle ="red";
    ctx.fillRect(food.x * cellSize,food.y * cellSize,cellSize,cellSize);
}

//Manaejar eventos de teclado mrx
document.addEventListener("keydown",function(event){
    if(event.key === "ArrowUp" && dy !==1){
        dx = 0;
        dy = -1;//mover arriba 
    }else if(event.key === "ArrowDown" && dy !==-1){
        dx = 0;
        dy = 1 //mover abajo
    }else if(event.key === "ArrowLeft" && dx !== 1){
        dx = -1;
        dy = 0;// mover izquierda.
    }else if(event.key === "ArrowRight" && dx !== -1){
        dx = 1;
        dy = 0;//mover derecha
    }
});
// Funcion para dibujar la serpiente el canvas
function drawSnake(){
    ctx.clearRect(0,0,canvas.width,canvas.height);// Limpiar el canvas
    for(let i = 0 ; i< snake.length; i++){
        ctx.fillStyle="green";// Color de la serpiente
        ctx.fillRect(snake[i].x * cellSize, snake[i].y * cellSize, cellSize,cellSize);
    }
    drawFood();   

    //Funcion para mover la serpiente
}
function moveSnake(){
    const head = { x: snake[0].x + dx,y: snake[0].y + dy};
    // Comprobacion de bordes del tablero
    if(head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize ){
        // estamos haciendo una condicion ; de que si la serpiente choca con el borde se termina el juego
        endGame();
        return;
    } 
    for (let i = 1; i < snake.length; i++){
        if(snake[i].x === head.x && snake[i].y === head.y){
            endGame();
            return;
        }
    }       
    snake.unshift(head);
    if(head.x === food.x && head.y === food.y){
        food = { x:getRandomCoordinate(),y :getRandomCoordinate()};
    }
    else{
        snake.pop();//Remover la ultima parte de la serpiente 
    }
   

}//funcion de la actualizacion del juego
function update(){
    moveSnake();
    checkFoodCollision();
    drawSnake();

}//Funcion de bucle de juego
function gameLoop(){
    update();
    requestAnimationFrame(gameLoop);
    
}// Funcion para finalizar el juego
function endGame(){
    //Detener el bucle de juego , mostrar un mensaje de finalizacion,etc.
    clearInterval(gameLoopInterval);
    const scoreValue = score.toString();
    const endMessage = "Felicitaciones " + scoreValue + "puntos"
    alert(endMessage);//mensaje emergente

}//funcion para manejar los eventos de teclado
function handlekeyDown(event){
    if(!gameStarted){
        //Iniciar el juego al precionar una letra
        gameStarted = true;
        gameLoopInterval = setInterval(update , snakeSpeed);
        
        const startMessage = document.getElementById("StartMessage");
        startMessage.style.display = "none";
    }
}
document.addEventListener("keydown",handlekeyDown);
function update(){
    moveSnake();
    drawSnake();
}   
