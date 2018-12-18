var lvl1 = {
    preload: function() {
        // Basic Images
        game.load.image('starfield', 'assets/starfield.png');
        game.load.image('ship', 'assets/ship.png');
        game.load.image('bullet', 'assets/bullets/bullet.png');
        game.load.image('spacepirates', 'assets/enemies/enemy2.png');
        game.load.image('baddies', 'assets/enemies/enemy3.png');
        game.load.image('EnemyBullet', 'assets/bullets/blue-enemy-bullet.png');
        game.load.image('boss', 'assets/enemies/blue-enemy.png');
        game.load.image('deathray', 'assets/bullets/bullet2.png');
        game.load.image('tripleshot', 'assets/power-ups/tripleshot.png');
        game.load.image('dontknow', 'assets/power-ups,dontknowyet.png');

        // Audios
        game.load.audio('bmusic', 'assets/sounds/level1.mp3');
        game.load.audio('lasers', 'assets/sounds/laser6.mp3');
        game.load.audio('boom', 'assets/sounds/explosion.mp3');
        //game.load.audio('v1sound','assets/sounds/enemylaser.mp3');

        // Sprites
        game.load.spritesheet('explosion', 'assets/explode.png', 128, 128);

        // My Font
        game.load.bitmapFont('Sp@Ce', 'assets/Sp@Ce/Sp@Ce.png', 'assets/Sp@Ce/Sp@Ce.fnt');
    },

    create: function() {

        //  The scrolling starfield background
        starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

        //  Our bullet group
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);


        //  The hero!
        player = game.add.sprite(100, game.height / 2, 'ship');
        player.health = 100;
        player.anchor.setTo(0.5, 0.5);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
        player.body.drag.setTo(DRAG, DRAG);
        player.weaponLevel = 1;
        player.events.onKilled.add(function() {
            shipTrail.kill();
        });

        player.events.onRevived.add(function() {
            shipTrail.start(false, 5000, 10);
        });

        // Enemy Spaceships 
        villains = game.add.group();
        villains.enableBody = true;
        villains.physicsBodyType = Phaser.Physics.ARCADE;
        villains.createMultiple(5, 'spacepirates');
        villains.setAll('anchor.x', 0.5);
        villains.setAll('anchor.y', 0.5);
        villains.setAll('scale.x', 0.75);
        villains.setAll('scale.y', 0.75);
        villains.setAll('angle', 270);
        villains.forEach(function(enemy) {
            addEnemyEmitterTrail(enemy);
            enemy.body.setSize(enemy.width * 3 / 4, enemy.height * 3 / 4);
            enemy.damageAmount = 20;
            enemy.events.onKilled.add(function() {
                enemy.trail.kill();
            });
        });

        game.time.events.add(1000, launchEnemy);

        //  Enemy Spaceships's 2 bullets
        enemyBullets = game.add.group();
        enemyBullets.enableBody = true;
        enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets.createMultiple(30, 'EnemyBullet');
        enemyBullets.callAll('crop', null, {
            x: 90,
            y: 0,
            width: 90,
            height: 70
        });
        enemyBullets.setAll('alpha', 0.9);
        enemyBullets.setAll('anchor.x', 0.5);
        enemyBullets.setAll('anchor.y', 0.5);
        enemyBullets.setAll('outOfBoundsKill', true);
        enemyBullets.setAll('checkWorldBounds', true);
        enemyBullets.forEach(function(enemy) {
            enemy.body.setSize(20, 20);
        });

        // Enemy Spaceships 2
        villains1 = game.add.group();
        villains1.enableBody = true;
        villains1.physicsBodyType = Phaser.Physics.ARCADE;
        villains1.createMultiple(5, 'baddies');
        villains1.setAll('anchor.x', 0.5);
        villains1.setAll('anchor.y', 0.5);
        villains1.setAll('scale.x', 0.75);
        villains1.setAll('scale.y', 0.75);
        villains1.setAll('angle', 270);
        villains1.forEach(function(enemy) {
            addEnemyEmitterTrail(enemy);
            enemy.body.setSize(enemy.width * 3 / 4, enemy.height * 3 / 4);
            enemy.damageAmount = 20;
            enemy.events.onKilled.add(function() {
                enemy.trail.kill();
            });
        });

        // BOSS
        badboss = game.add.group();
        badboss.enableBody = true;
        badboss.physicsBodyType = Phaser.Physics.ARCADE;
        badboss.createMultiple(1, 'boss');
        badboss.setAll('anchor.x', 0.5);
        badboss.setAll('anchor.y', 0.5);
        badboss.setAll('scale.x', 1);
        badboss.setAll('scale.y', 1);
        badboss.setAll('angle', 270);
        badboss.forEach(function(enemy) {
            addEnemyEmitterTrail(enemy);
            enemy.body.setSize(enemy.width * 1, enemy.height * 1);
            enemy.damageAmount = 30;
            enemy.events.onKilled.add(function() {
                enemy.trail.kill();
            });
        });

        //  Boss's bullets
        deathrays = game.add.group();
        deathrays.enableBody = true;
        deathrays.physicsBodyType = Phaser.Physics.ARCADE;
        deathrays.createMultiple(100, 'deathray');
        deathrays.callAll('crop', null, {
            x: 90,
            y: 0,
            width: 90,
            height: 70
        });
        deathrays.setAll('alpha', 0.9);
        deathrays.setAll('anchor.x', 0.5);
        deathrays.setAll('anchor.y', 0.5);
        deathrays.setAll('outOfBoundsKill', true);
        deathrays.setAll('checkWorldBounds', true);
        deathrays.forEach(function(enemy) {
            enemy.body.setSize(20, 20);
        });

        // Triple shot Power up
        triples = game.add.group();
        triples.enableBody = true;
        triples.physicsBodyType = Phaser.Physics.ARCADE;
        triples.createMultiple(10, 'tripleshot');
        triples.setAll('anchor.x', 0.5);
        triples.setAll('anchor.y', 0.5);
        triples.setAll('scale.x', 0.75);
        triples.setAll('scale.y', 0.75);
        triples.setAll('outOfBoundsKill', true);
        triples.setAll('checkWorldBounds', true);

        // Triple shot Power up
        beam = game.add.group();
        beam.enableBody = true;
        beam.physicsBodyType = Phaser.Physics.ARCADE;
        beam.createMultiple(10, 'dontknow');
        beam.setAll('anchor.x', 0.5);
        beam.setAll('anchor.y', 0.5);
        beam.setAll('scale.x', 0.6);
        beam.setAll('scale.y', 0.6);
        beam.setAll('outOfBoundsKill', true);
        beam.setAll('checkWorldBounds', true);


        //  And some controls to play the game with
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //  Add an emitter for the ship's trail
        shipTrail = game.add.emitter(player.x - 20, player.y, 400);
        shipTrail.height = 10;
        shipTrail.makeParticles('bullet');
        shipTrail.setYSpeed(20, -20);
        shipTrail.setXSpeed(-140, -120);
        shipTrail.setRotation(50, -50);
        shipTrail.setAlpha(1, 0.01, 800);
        shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000,
            Phaser.Easing.Quintic.Out);
        shipTrail.start(false, 5000, 10);

        //  An explosion pool
        explosions = game.add.group();
        explosions.enableBody = true;
        explosions.physicsBodyType = Phaser.Physics.ARCADE;
        explosions.createMultiple(30, 'explosion');
        explosions.setAll('anchor.x', 0.5);
        explosions.setAll('anchor.y', 0.5);
        explosions.forEach(function(explosion) {
            explosion.animations.add('explosion');
        });

        //  Shield stat
        shield = game.add.bitmapText(game.world.width - 350, 10, 'Sp@Ce', '' + player.health + '%', 50);
        shield.render = function() {
            shield.text = 'Shield: ' + Math.max(player.health, 0) + '%';
        };
        shield.render();

        //  Score
        scoreText = game.add.bitmapText(10, 10, 'Sp@Ce', '', 50);
        scoreText.render = function() {
            scoreText.text = 'Score: ' + score;
        };
        scoreText.render();

        // Background music!
        music = game.add.audio('bmusic');
        music.loop = true;
        music.play();

        //  Game over text
        gameOver = game.add.bitmapText(game.world.centerX, game.world.centerY, 'Sp@Ce', 'GAME OVER!', 110);
        gameOver.x = gameOver.x - gameOver.textWidth / 2;
        gameOver.y = gameOver.y - gameOver.textHeight / 3;
        gameOver.visible = false;
    },

    update: function() {

        //  Scroll the background
        starfield.tilePosition.x -= 2;

        //  Reset the player, then check for movement keys
        player.body.acceleration.y = 0;
        player.body.acceleration.x = 0;

        if (cursors.up.isDown) {
            player.body.acceleration.y = -ACCLERATION;
        } else if (cursors.down.isDown) {
            player.body.acceleration.y = ACCLERATION;
        } else if (cursors.left.isDown) {
            player.body.acceleration.x = -ACCLERATION;
        } else if (cursors.right.isDown) {
            player.body.acceleration.x = ACCLERATION;
        }

        //  Stop at screen edges
        if (player.x > game.width - 30) {
            player.x = game.width - 30;
            player.body.acceleration.x = 0;
        }
        if (player.x < 30) {
            player.x = 30;
            player.body.acceleration.x = 0;
        }
        if (player.y > game.height - 15) {
            player.y = game.height - 15;
            player.body.acceleration.y = 0;
        }
        if (player.y < 15) {
            player.y = 15;
            player.body.acceleration.y = 0;
        }

        //  Fire bullet
        if (player.alive && fireButton.isDown) {
            fireBullet();
        }

        //  Keep the shipTrail lined up with the ship
        shipTrail.y = player.y;
        shipTrail.x = player.x - 20;

        //  Check collisions 1st Enemy
        game.physics.arcade.overlap(player, villains, shipCollide, null, this);
        game.physics.arcade.overlap(villains, bullets, hitEnemy, null, this);


        // Check collisions 2nd Enemy
        game.physics.arcade.overlap(player, villains1, shipCollide, null, this);
        game.physics.arcade.overlap(villains1, bullets, hitEnemy, null, this);
        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);

        // Check collision Boss
        game.physics.arcade.overlap(player, badboss, shipCollide, null, this);
        game.physics.arcade.overlap(badboss, bullets, hitBoss, null, this);
        game.physics.arcade.overlap(player, deathrays, enemyHitsPlayer, null, this);

        // Check collision Powerups
        game.physics.arcade.overlap(player, triples, hitPowerup, null, this);
        game.physics.arcade.overlap(player, beam, hitPowerup1, null, this);

        //  Game over?
        if (!player.alive && gameOver.visible === false) {
            gameOver.visible = true;
            gameOver.alpha = 0;
            var fadeInGameOver = game.add.tween(gameOver);
            fadeInGameOver.to({
                alpha: 1
            }, 1000, Phaser.Easing.Quintic.Out);
            fadeInGameOver.onComplete.add(setResetHandlers);
            fadeInGameOver.start();

            function setResetHandlers() {
                //  The "click to restart" handler
                tapRestart = game.input.onTap.addOnce(_restart, this);
                spaceRestart = fireButton.onDown.addOnce(_restart, this);

                function _restart() {
                    tapRestart.detach();
                    spaceRestart.detach();
                    restart();
                }
            }
        }
    },
    render: function() {

    }
}