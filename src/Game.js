

class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    create() {
		this.startTime = this.time.now;
		var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		var tileInfo = this.textures.get('tile').getSourceImage();
		this.gameSpeed = 5;
		this.obstaculos =this.physics.add.group();
		this.obstacleSpeed = 200; // velocidade inicial dos obstáculos
		this.speedIncreaseInterval = 50000;
		this.gOver=false;
		this.cont=0;

		this.add.sprite(0, 0, 'background').setOrigin(0,0);
		this.fundoPredios = this.add.sprite(0, 0, 'predios').setOrigin(0,0);
		

        this.stateStatus = null;
        this._score = 0;
        this._time = 0;
		this._gamePaused = false;
		this._runOnce = false;
		const {height, width } = EPT.world;

		this.anims.create({
			key: 'playerAnim',
			frames: this.anims.generateFrameNumbers('splayer', { start: 1, end: 13 }),
			frameRate: 5,
			repeat: -1
		});
		
		this.anims.create({
			key: 'animdead',
			frames: this.anims.generateFrameNumbers('splayer', { start: 14, end: 15 }),
			frameRate: 5,
			repeat: -1
		});

		this.ground = this.add.tileSprite(0, height, width, 26, 'tile1').setOrigin(0,1);
		this.upGround = this.add.tileSprite(0, 0, width, 26, 'tile2').setOrigin(0,1);
		this.upGround.setScale(1, -1); // vira verticalmente
		// this.buttonDummy = new Button(EPT.world.centerX, EPT.world.centerY, 'clickme', this.addPoints, this, 'static');
        // this.buttonDummy.setOrigin(0.5,0.5);
        // this.buttonDummy.setAlpha(0);
        // this.buttonDummy.setScale(0.1);
        // this.tweens.add({targets: this.buttonDummy, alpha: 1, duration: 500, ease: 'Linear'});
        // this.tweens.add({targets: this.buttonDummy, scale: 1, duration: 500, ease: 'Back'});
		this.player = this.physics.add.sprite(150, height, 'splayer')
		.setOrigin(0.5,0.5)
		.setCollideWorldBounds(true)
		.setGravityY(0)
		.setScale(2,2);

		this.player.angle = 0;

		this.player.anims.play('playerAnim', true);0
		

		this.physics.add.collider(this.player, this.ground);
		this.physics.add.collider(this.player, this.upGround);

        this.initUI();
        // this.currentTimer = this.time.addEvent({
        //     delay: 1000,
        //     callback: function(){
        //         this._time--;
        //         this.textTime.setText(EPT.text['gameplay-timeleft']+this._time);
        //         if(!this._time) {
        //             this._runOnce = false;
        //             this.stateStatus = 'gameover';
        //         }
        //     },
        //     callbackScope: this,
        //     loop: true
        // });

		this.input.keyboard.on('keydown', this.handleKey, this);
        this.cameras.main.fadeIn(250);
        this.stateStatus = 'playing';
    }
	update() {
		switch(this.stateStatus) {
			// case 'paused': {
			// 	if(!this._runOnce) {
			// 		this.statePaused();
			// 		this._runOnce = true;
			// 	}
			// 	break;
			// }
			case 'gameover': {
				if(!this._runOnce) {
					this.stateGameover();
					this._runOnce = true;
				}
				break;
			}
			case 'playing': {
				this.statePlaying();
				
			}
			
			default: {
			}
		}
	}
    handleKey(e) {
        switch(e.code) {
            case 'KeyB': {
                this.stateBack();
                break;
            }
            case 'KeyT': {
                this.stateRestart();
                break;
            }
			case 'Space': {
				if (this.player.y<=EPT.world.height && this.player.y>=(EPT.world.height-30)) {
					this.saltar()

				}
				else if(this.player.y>=0 && this.player.y<=40){
					this.voltar()

				}
				break;
            }
            default: {}
        }
    }

	async saltar(){
		this.player.setVelocityY(-1300);
		this.tweens.add({
			targets: this.player,
			duration: 300, // tempo em milissegundos
			angle: -180,
			y: this.player.y - 500,
			
		},200);

		this.player.scaleX *= (-1);
	}

	async voltar(){
		this.player.setVelocityY(1300);
		await new Promise(resolve => setTimeout(resolve, 80));
		// this.player.angle = 180;
		// sprite.scaleY = -1;

		this.tweens.add({
			targets: this.player,
			duration: 200, // tempo em milissegundos
			angle: 0,
			
		},200);

		this.player.scaleX *= (-1);
	}

    // managePause() {
    //     this._gamePaused =! this._gamePaused;
    //     this.currentTimer.paused =! this.currentTimer.paused;
	// 	EPT.Sfx.play('click');
	// 	if(this._gamePaused) {
	// 		EPT.fadeOutIn(function(self){

	// 			self.stateStatus = 'paused';
	// 			self._runOnce = false;
	// 		}, this);
	// 		this.screenPausedBack.x = -this.screenPausedBack.width-20;
	// 		this.tweens.add({targets: this.screenPausedBack, x: 100, duration: 500, delay: 250, ease: 'Back'});
	// 		this.screenPausedContinue.x = EPT.world.width+this.screenPausedContinue.width+20;
	// 		this.tweens.add({targets: this.screenPausedContinue, x: EPT.world.width-100, duration: 500, delay: 250, ease: 'Back'});
	// 	}
	// 	else {
	// 		EPT.fadeOutIn(function(self){
	// 			self._stateStatus = 'playing';
	// 			self._runOnce = false;
	// 		}, this);
	// 		this.screenPausedBack.x = 100;
	// 		this.tweens.add({targets: this.screenPausedBack, x: -this.screenPausedBack.width-20, duration: 500, ease: 'Back'});
	// 		this.screenPausedContinue.x = EPT.world.width-100;
	// 		this.tweens.add({targets: this.screenPausedContinue, x: EPT.world.width+this.screenPausedContinue.width+20, duration: 500, ease: 'Back'});
    //     }
    // }
	async statePlaying() {
		this._time = this.time.now - this.startTime;
		this.ground.tilePositionX += this.gameSpeed;
		this.upGround.tilePositionX += this.gameSpeed;
		this.cont+=1;

		if(this.cont===5){
			this.addPoints();
			this.cont=0;
		}
		
		this.time.addEvent({
			delay: 15000,
			callback: this.colocarObstaculos(),
			callbackScope: this,
			loop: true
		});	

		this.physics.add.collider(this.player, this.obstaculos, () =>{
			console.log('Você colidiu com um obstáculo!');
			this.gOver=true;
		});

		if(this.gOver===true){
			this._runOnce = false;
			this.obstaculos.getChildren().forEach(function(child) {
				child.setVelocityX(0); 
				child.setVelocityY(0); 
			  });
			this.player.setVelocity(0);
			this.gameSpeed=0;
			this.player.anims.play('playerAnim', false);
			this.stateStatus = 'gameover';

			  

		}
		


	}

	async delay(n){
		return new Promise(function(resolve){
			setTimeout(resolve,n*1000);
		});
	}
	// statePaused() {
    //     this.screenPausedGroup.toggleVisible();
	// }


	async stateGameover() {
		// this.currentTimer.paused =! this.currentTimer.paused;
		this.player.anims.play('animdead', true);
		await this.delay(2);
		this.player.anims.play('animdead', false);
		EPT.Storage.setHighscore('EPT-highscore',this._score);
		EPT.fadeOutIn(function(self){
			self.screenGameoverGroup.toggleVisible();			
			// self.buttonPause.input.enabled = false;
			self.screenGameoverScore.setText(EPT.text['gameplay-score']+self._score);
			self.gameoverScoreTween();
		}, this);
		this.screenGameoverBack.x = -this.screenGameoverBack.width-20;
		this.tweens.add({targets: this.screenGameoverBack, x: 100, duration: 500, delay: 250, ease: 'Back'});
		this.screenGameoverRestart.x = EPT.world.width+this.screenGameoverRestart.width+20;
		this.tweens.add({targets: this.screenGameoverRestart, x: EPT.world.width-100, duration: 500, delay: 250, ease: 'Back'});
		this.obstaculos.getChildren().forEach(function(child) {
			child.setDepth(-1);
		  });
	}
    initUI() {

	

		var fontScore = { font: '38px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 5 };
		var fontScoreWhite =  { font: '38px '+EPT.text['FONT'], fill: '#000', stroke: '#ffde00', strokeThickness: 5 };
		this.textScore = this.add.text(EPT.world.width-30, 45, EPT.text['gameplay-score']+this._score, fontScore);
		this.textScore.setOrigin(1,0);

		this.textScore.y = -this.textScore.height-20;
		this.tweens.add({targets: this.textScore, y: 45, duration: 500, delay: 100, ease: 'Back'});
	


		var fontTitle = { font: '48px '+EPT.text['FONT'], fill: '#000', stroke: '#ffde00', strokeThickness: 10 };

		this.screenGameoverGroup = this.add.group();
        this.screenGameoverBg = this.add.sprite(0, 0, 'overlay');
        this.screenGameoverBg.setAlpha(0.95);
        this.screenGameoverBg.setOrigin(0, 0);
		this.screenGameoverText = this.add.text(EPT.world.centerX, 100, EPT.text['gameplay-gameover'], fontTitle);
		this.screenGameoverText.setOrigin(0.5,0);
		this.screenGameoverBack = new Button(100, EPT.world.height-100, 'button-mainmenu', this.stateBack, this);
		this.screenGameoverBack.setOrigin(0,1);
		this.screenGameoverRestart = new Button(EPT.world.width-100, EPT.world.height-100, 'button-restart', this.stateRestart, this);
		this.screenGameoverRestart.setOrigin(1,1);
		this.screenGameoverScore = this.add.text(EPT.world.centerX, 300, EPT.text['gameplay-score']+this._score, fontScoreWhite);
		this.screenGameoverScore.setOrigin(0.5,0.5);
		this.screenGameoverGroup.add(this.screenGameoverBg);
		this.screenGameoverGroup.add(this.screenGameoverText);
		this.screenGameoverGroup.add(this.screenGameoverBack);
		this.screenGameoverGroup.add(this.screenGameoverRestart);
		this.screenGameoverGroup.add(this.screenGameoverScore);
		this.screenGameoverGroup.toggleVisible();
		this.screenGameoverGroup.getChildren().forEach(function(sprite) {
			sprite.setDepth(0); 
		  });
    }
    addPoints() {
		this._score+=1;
        this.textScore.setText(EPT.text['gameplay-score']+this._score);
        

    }
	stateRestart() {
		EPT.Sfx.play('click');
        EPT.fadeOutScene('Game', this);
	}
	stateBack() {
		EPT.Sfx.play('click');
		EPT.fadeOutScene('MainMenu', this);
	}
	gameoverScoreTween() {
		this.screenGameoverScore.setText(EPT.text['gameplay-score']+'0');
		if(this._score) {
			this.pointsTween = this.tweens.addCounter({
				from: 0, to: this._score, duration: 2000, delay: 250,
				onUpdateScope: this, onCompleteScope: this,
				onUpdate: function(){
					this.screenGameoverScore.setText(EPT.text['gameplay-score']+Math.floor(this.pointsTween.getValue()));
				},
				onComplete: function(){
					var emitter = this.add.particles('particle').createEmitter({
						x: this.screenGameoverScore.x+30,
						y: this.screenGameoverScore.y,
						speed: { min: -600, max: 600 },
						angle: { min: 0, max: 360 },
						scale: { start: 0.5, end: 3 },
						blendMode: 'ADD',
						active: true,
						lifespan: 2000,
						gravityY: 1000,
						quantity: 250,
						setDepth: 1,
					}); 
					emitter.explode();
				}
			});
		}
	}

	colocarObstaculos(){
		const {height, width } = EPT.world;

		// for (let i = 0; i < 10; i++) {
		// 	this.obstacle = this.obstacles.create(width, Math.random() * 400, 'obs1');
		// 	this.obstacle.setVelocityX(-this.obstacleSpeed); // velocidade inicial
		//   }


		if (this.obstaculos.getLength() === 0 || this.obstaculos.getChildren()[this.obstaculos.getLength() - 1].x < 400) {
			// Crie um novo obstáculo
			let i = 1; //Phaser.Math.Between(1, 3);
			console.log(i);
			this.obstaculo = this.obstaculos.create(800, Math.random() * 400, `obs${i}`);
			this.obstaculo.setVelocityX(-200);
			this.obstaculo.setDepth(0);
		}


	}

	
};