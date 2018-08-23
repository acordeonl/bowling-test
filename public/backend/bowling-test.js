// --------------- HELPER FUNCTIONS ----------------------
    // previous_roll => parametro opcional en caso de spare
    function getSumValue(roll,previous_roll){
        if(roll !== 'X' && roll !== '/')//suma de dígitos
            return roll-'0' ; 
        else if(roll === '/') // spare
            return 10-(previous_roll-'0'); 
        else // strike
            return 10 ;
    }

    // Se  consideran varios formatos para el parametro rolls
    function preprocess (rolls){
        rolls = rolls.replace(/\s/g, "") ;
        for(let i = 0 ; i < rolls.length ; i ++ ) {
            if(rolls[i] === '-')
                rolls = rolls.substr(0,i) + '0' + rolls.substr(i+1);
            else if(rolls[i] === 'x')
                rolls = rolls.substr(0,i) + 'X' + rolls.substr(i+1);
        }
        return rolls ; 
    }

// --------------- MAIN ----------------------

    // rolls => Cadena de caracteres utilizando el formato que se describe en el enunciado
    // Se asume una validación de datos asociados a los rolls en el front end:
    //   - Los rolls pueden ser 'X', '/' o un digito
    //   - Los valores de 'X' y '/' son coherentes con el turno del frame
    //   - El número de rolls es consistente con la cantidad de frames y los bonos permitidos
    //   - Los rolls corresponden a frames completos
    function app___computeScore(rolls){
        let score = 0 , frame = 0; 
        let frameScores = [] ; 
        // preparación de datos
        rolls = preprocess (rolls) ; 

        // suma del score
        for(let i = 0 ; i < rolls.length ; i ++ ){
            if(rolls[i] !== 'X' && rolls[i] !== '/'){ //suma de dígitos
                frame += 0.5 ;  
                score+=rolls[i]-'0' ;
            }
            else if(rolls[i] === '/'){ // spare
                frame+=0.5 ;
                if(frame < 10) {
                    if(i+1 >= rolls.length) // No hay mas datos para sumar
                        return {score:score,frameScores:frameScores} ; 
                    score += getSumValue(rolls[i+1]) ; 
                }
                score += 10-(rolls[i-1]-'0') ; 
            }
            else {  // strike 
                frame +=1 ;
                if(frame < 10) {
                    if(i+2 >= rolls.length) // No hay mas datos para sumar
                        return {score:score,frameScores:frameScores} ; 
                    score += getSumValue(rolls[i+1]) + getSumValue(rolls[i+2],rolls[i+1]) ; 
                }
                score += 10 ;
            }
            if(Number.isInteger(frame) && frame < 10)
                frameScores.push(score) ; 
        }
        return {score:score,frameScores:frameScores} ; 
    }