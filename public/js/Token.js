class Token {
    /** owner is a player */
    constructor(index,owner) {
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
    }
}