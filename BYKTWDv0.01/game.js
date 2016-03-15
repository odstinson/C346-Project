GameStates.Game = function (game) {

};

//PUBLIC VARS
var mainChar;
var cursors;
var background;
var desk;
var mntr;
var flrs;
var pprs;
var pprs2;

GameStates.Game.prototype = {

    create: function () {
        //SET WORLD SIZE
        //this.world.setBounds(0, 50, 950, 750);

        //SET PHASER PHYSICS
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.setImpactEvents(true);
        this.physics.p2.defaultRestitution = 0.8;
            //collision groups
        var playerCollision = this.physics.p2.createCollisionGroup();
        var objCollisionStationary = this.physics.p2.createCollisionGroup();
        var objCollision = this.physics.p2.createCollisionGroup();
        this.physics.p2.updateBoundsCollisionGroup();

        //ADD BACKGROUND
        this.stage.backgroundColor = '#EBEBEB';
        background = this.add.tileSprite(0, 0, 950, 750, 'background');

        //ADD OBJECTS
        //paper
        pprs = this.add.group();
        pprs2 = this.add.group();
        pprs = pprs.create(this.world.randomX - 20, this.world.randomY - 20, 'objPprs');
        pprs2 = pprs2.create(this.world.randomX - 20, this.world.randomY - 20, 'objPprs');
        pprs.rotation = this.rnd.integerInRange(0, 360);
        pprs2.rotation = this.rnd.integerInRange(0, 360);
            //desk
        desk = this.add.group();
        desk.enableBody = true;
        desk.physicsBodyType = Phaser.Physics.P2JS;
        desk = desk.create(this.world.randomX, this.world.randomY, 'objDesk');
        desk.body.setRectangle(299, 164);
        desk.body.setCollisionGroup(objCollisionStationary);
        desk.body.collides([desk, playerCollision]);
            //monitor
        mntr = this.add.group();
        mntr.enableBody = true;
        mntr.physicsBodyType = Phaser.Physics.P2JS;
        mntr = mntr.create(desk.position.x, desk.position.y-100, 'objMntr');
        mntr.body.setRectangle(177, 159);
        mntr.body.setCollisionGroup(objCollision);
        mntr.body.collides([objCollision, playerCollision]);
            //flowers
        flrs = this.add.group();
        flrs.enableBody = true;
        flrs.physicsBodyType = Phaser.Physics.P2JS;
        flrs = flrs.create(this.world.randomX - 20, this.world.randomY - 20, 'objFlrs');
        flrs.body.setRectangle(127, 176);
        flrs.body.setCollisionGroup(objCollision);
        flrs.body.collides([objCollision, playerCollision]);

        //ADD MAIN CHARACTER PLAYER SPRITE
        mainChar = this.add.sprite(this.world.centerX, this.world.centerY, 'mainChar', 0);
        mainChar.smoothed = false;  //retains sharp pixels
        mainChar.anchor.setTo(0.5, 0.5);    //set position
        mainChar.scale.setTo(1, 1);         //set sprite scale
        this.physics.p2.enable(mainChar);   //enable physics
        mainChar.body.fixedRotation = true; //fixed rotation
        mainChar.body.setRectangle(47, 65);
        mainChar.body.setCollisionGroup(playerCollision);
        mainChar.body.collides(objCollision, objHit, this);
        mainChar.body.collides(objCollisionStationary, objHitStationary, this);
            //set camera to player
        //this.camera.follow(mainChar);

        //INIT SPRITE CHANGE/ ANIMATIONS
        mainChar.animations.add('down', [0], 1, true);
        mainChar.animations.add('up', [1], 1, true);
        mainChar.animations.add('left', [2], 1, true);
        mainChar.animations.add('right', [3], 1, true);

        //RECEIVE INPUT FROM KEYS
        cursors = this.input.keyboard.createCursorKeys();
    },

    update: function () {

        //CHARACTER MOVEMENT
        mainChar.body.setZeroVelocity();

        //LEFT KEY DOWN
        if (cursors.left.isDown) { 
            mainChar.body.moveLeft(300);
            mainChar.play('left');      //left sprite
        } //RIGHT KEY DOWN
        else if (cursors.right.isDown) {
            mainChar.body.moveRight(300);
            mainChar.play('right');     //right sprite
        }

        //UP KEY DOWN
        if (cursors.up.isDown) {
            mainChar.body.moveUp(300);

            //ensures sprite is correct if 2 keys are pressed at once
            if (cursors.left.isDown) {
                mainChar.play('left');
            } else if (cursors.right.isDown) {
                mainChar.play('right');
            } else {
                mainChar.play('up');    //up sprite
            }
        } //DOWN KEY DOWN
        else if (cursors.down.isDown) {
            mainChar.body.moveDown(300);

            //ensures sprite is correct if 2 keys are pressed at once
            if (cursors.left.isDown) {
                mainChar.play('left');
            } else if (cursors.right.isDown) {
                mainChar.play('right');
            } else {
                mainChar.play('down');  //down sprite
            }
        }

    },

    

    render: function () { },
};

//collision group 1
function objHit (player, obj) {
    
}

//collision group 2
function objHitStationary(player, obj) {

}