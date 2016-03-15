// Preloader will load all of the assets like graphics and audio
GameStates.Preloader = function (game) {
    this.preloadBar = null;
}

GameStates.Preloader.prototype = {
    preload: function () {
        // common to add a loading bar sprite here...
        this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);

        //LOAD ASSETS 
        this.load.spritesheet('mainChar', 'assets/spriteSheet00.png', 94, 130, 4);   //main character spritesheet
        this.load.image('background', 'assets/testBg00.png');
        this.load.image('objPprs', 'assets/objPprs.png', 109, 113);
        this.load.image('objDesk', 'assets/objDesk.png', 299, 164);
        this.load.image('objMntr', 'assets/objMntr.png', 177, 159);
        this.load.image('objFlrs', 'assets/objFlrs.png', 127, 176);
    }, 

    create: function () {
        //call next state
        this.state.start('Game');
    }
};