document.addEventListener('DOMContentLoaded',()=>{
    const gridDisplay=document.querySelector('.grid')
    const scoreDisplay=document.getElementById('score')
    const resultDIsplay=document.getElementById('result')
    const width=4
    let squares=[]
    let score=0
    function createBoard(){
        for(let i=0;i<width*width;i++){
            square=document.createElement('div')
            square.innerHTML=0
            gridDisplay.appendChild(square)
            squares.push(square)
           
        }
        generate()
        generate()
    }
    createBoard()
    //generate a number 
    function generate(){
        let randomnumber=Math.floor(Math.random()*squares.length)
    if(squares[randomnumber].innerHTML==0){
        squares[randomnumber].innerHTML=2
        checkover()
    }else generate()
    
}

    //swipe right 
    function moveRight(){
        for(let i=0;i<16;i++){
            if(i%4==0){
                let sum1=squares[i].innerHTML
                let sum2=squares[i+1].innerHTML
                let sum3=squares[i+2].innerHTML
                let sum4=squares[i+3].innerHTML
                let row=[parseInt(sum1),parseInt(sum2),parseInt(sum3),parseInt(sum4)]
              
                let filteredRow=row.filter(num => num)
               
                let missing=4 - filteredRow.length
                let zeros=Array(missing).fill(0)
             
                let newRow=zeros.concat(filteredRow)
              
                squares[i].innerHTML=newRow[0]
                squares[i+1].innerHTML=newRow[1]
                squares[i+2].innerHTML=newRow[2]
                squares[i+3].innerHTML=newRow[3]
            }
        }
    }
  
    //move left
    function moveLeft(){
        for(let i=0;i<16;i++){
            if(i%4==0){
                let sum1=squares[i].innerHTML
                let sum2=squares[i+1].innerHTML
                let sum3=squares[i+2].innerHTML
                let sum4=squares[i+3].innerHTML
                let row=[parseInt(sum1),parseInt(sum2),parseInt(sum3),parseInt(sum4)]
 
                let filteredRow=row.filter(num => num)
            
                let missing=4 - filteredRow.length
                let zeros=Array(missing).fill(0)
          
                let newRow=filteredRow.concat(zeros)
           
                squares[i].innerHTML=newRow[0]
                squares[i+1].innerHTML=newRow[1]
                squares[i+2].innerHTML=newRow[2]
                squares[i+3].innerHTML=newRow[3]
            }
        }
    }
    function moveDown(){
        for(let i=0;i<4;i++){
            let sum1=squares[i].innerHTML
            let sum2=squares[i+width].innerHTML
            let sum3=squares[i+(width*2)].innerHTML
            let sum4=squares[i+(width*3)].innerHTML
            let colsum=[parseInt(sum1),parseInt(sum2),parseInt(sum3),parseInt(sum4)]
            let filtered=colsum.filter(num => num)
            let missing=4-filtered.length
            let zeros=Array(missing).fill(0)
            let newColumn=zeros.concat(filtered)
            squares[i].innerHTML=newColumn[0]
            squares[i+width].innerHTML=newColumn[1]
            squares[i+(width*2)].innerHTML=newColumn[2]
            squares[i+(width*3)].innerHTML=newColumn[3]
            
        }
    }
    function moveUp(){
        for(let i=0;i<4;i++){
            let sum1=squares[i].innerHTML
            let sum2=squares[i+width].innerHTML
            let sum3=squares[i+(width*2)].innerHTML
            let sum4=squares[i+(width*3)].innerHTML
            let colsum=[parseInt(sum1),parseInt(sum2),parseInt(sum3),parseInt(sum4)]
            let filtered=colsum.filter(num => num)
            let missing=4-filtered.length
            let zeros=Array(missing).fill(0)
            let newColumn=filtered.concat(zeros)
            squares[i].innerHTML=newColumn[0]
            squares[i+width].innerHTML=newColumn[1]
            squares[i+(width*2)].innerHTML=newColumn[2]
            squares[i+(width*3)].innerHTML=newColumn[3]
            
        }
    }
    function combine(){
        for(let i=0;i<15;i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML){
                let comb=parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML=comb
                squares[i+1].innerHTML=0
                score+=comb
                scoreDisplay.innerHTML=score
            }
        }
        checkwin()
    }
    function combine_column(){
        for(let i=0;i<12;i++){
            if(squares[i].innerHTML === squares[i+width].innerHTML){
                let comb=parseInt(squares[i].innerHTML)+parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML=comb
                squares[i+width].innerHTML=0
                score+=comb
                scoreDisplay.innerHTML=score
            }
        }
        checkwin()
    }
    //assign keycodes 
    function control(e){
        if(e.keyCode===39){
            keyRight()
        }
        else if(e.keyCode===37){
            keyLeft()
        }
        else if(e.keyCode===38){
            keyUp()
        }
        else if(e.keyCode===40){
            keyDown()
        }
    }
    document.addEventListener('keyup',control)
    function keyRight(){
        moveRight()
        combine()
        moveRight()
        generate()
    }
    function keyLeft(){
        moveLeft()
        combine()
        moveLeft()
        generate()
    }
    function keyDown(){
        moveDown()
        combine_column()
        moveDown()
        generate()
    }
    function keyUp(){
        moveUp()
        combine_column()
        moveUp()
        generate()
    }
    //checkwin
    function checkwin(){
    for(i=0;i<squares.length;i++){
        if(squares[i].innerHTML==4){
        resultDIsplay.innerHTML="You win!"
        document.removeEventListener('keyUp',control)
       
        }
    }
    }
    function checkover(){
        let zeros=0
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML==0)
            zeros++;
        }
        if(zeros===0)
        resultDIsplay.innerHTML="You lose!"
        document.removeEventListener('keyUp',control)
    }
})