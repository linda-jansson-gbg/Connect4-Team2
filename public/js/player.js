class Player {

    constructor(name,id,color, active = false){
        this.name = name; //add name
        this.id = id;
        this.color = color;
        this.active = active;
        this.tokens = this.createTokens(21); 
    }

    /**
     * Creates token objects for player
     * @param {integer} num - Number of token objects to be created 
     */

    createTokens(num) {
        const tokens = [];

        for(let i=0; i < num; i++){
            let token = new Token(i,this);
            tokens.push(token);
        } 

        return tokens;
    }
}