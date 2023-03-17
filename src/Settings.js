class Settings extends Phaser.Scene {
    constructor() {
        super('Settings');
    }
    create() {
		this.add.sprite(0, 0, 'fundo2').setOrigin(0, 0);
		this.screenName = 'settings';
		this.input.keyboard.on('keydown', this.handleKey, this);

		this.buttonBack = new Button(20, 20, 'button-back', this.clickBack, this);
		this.buttonBack.setOrigin(0, 0);
		this.buttonBack.y = -this.buttonBack.height-20;
		this.tweens.add({targets: this.buttonBack, y: 20, duration: 500, ease: 'Back'});

		var fontTitle = { font: '46px '+EPT.text['FONT'], fill: '#e0bcdd', stroke: '#4b0082', strokeThickness: 7, align: 'center' };
		var fontSubtitle = { font: '38px '+EPT.text['FONT'], fill: '#e0bcdd', stroke: '#4b0082', strokeThickness: 5, align: 'center' };
		var fontSmall = { font: '28px '+EPT.text['FONT'], fill: '#e0bcdd', stroke: '#4b0082', strokeThickness: 4, align: 'center' };
		var titleSettings = this.add.text(EPT.world.centerX, 80, EPT.text['settings'], fontTitle);
		titleSettings.setOrigin(0.5, 0.5);
		var offsetLeft = 130;

		this.buttonMusic = new Button(offsetLeft+40, 250, 'button-music-on', this.clickMusic, this);
		this.buttonMusic.setOrigin(0.5, 0.5);
		this.textMusic = this.add.text(offsetLeft+30+this.buttonMusic.width, 250, EPT.text['music-on'], fontSubtitle);
		this.textMusic.setOrigin(0, 0.5);
		this.buttonCredits = new Button(offsetLeft+40, 400, 'button-credits', this.clickCredits, this);
		this.buttonCredits.setOrigin(0.5, 0.5);
		this.textCredits = this.add.text(offsetLeft+30+this.buttonCredits.width, 400, EPT.text['credits'], fontSubtitle);
		this.textCredits.setOrigin(0, 0.5);		

		

		EPT.Sfx.update('music', this.buttonMusic, this.textMusic);

		this.buttonMusic.setScale(0.5);
		this.tweens.add({targets: this.buttonMusic, scaleX: 1, scaleY: 1, duration: 500, delay: 250, ease: 'Cubic.easeOut' });
		this.textMusic.setScale(0.5);
		this.tweens.add({targets: this.textMusic, scaleX: 1, scaleY: 1, duration: 500, delay: 250, ease: 'Cubic.easeOut' });
		this.buttonCredits.setScale(0.5);
		this.tweens.add({targets: this.buttonCredits, scaleX: 1, scaleY: 1, duration: 500, delay: 500, ease: 'Cubic.easeOut' });
		this.textCredits.setScale(0.5);
		this.tweens.add({targets: this.textCredits, scaleX: 1, scaleY: 1, duration: 500, delay: 500, ease: 'Cubic.easeOut' });


		var offsetTopCredits = 20;
		var offsetTopCrew = 550;
		this.containerCredits = this.add.container(0, EPT.world.height);
		var creditsBg = this.add.sprite(0, 0, 'fundo2');
		creditsBg.setOrigin(0, 0);
		var creditsBack = new Button(20, 20, 'button-back', function(){this.clickBack('credits');}, this);
		creditsBack.setOrigin(0, 0);

		var titleCredits = this.add.text(EPT.world.centerX, offsetTopCredits+40, EPT.text['credits'], fontTitle);
		titleCredits.setOrigin(0.5);
		var titleCreditsText = this.add.text(EPT.world.centerX, offsetTopCredits+100, EPT.text['madeby'], fontSubtitle);
		titleCreditsText.setOrigin(0.5,0);
		var titleCrew = this.add.text(EPT.world.centerX, offsetTopCrew-50, EPT.text['team'], fontSubtitle);
		titleCrew.setOrigin(0.5,0);
		var titleCreditsLogo = new Button(EPT.world.centerX, offsetTopCredits+200, 'logo-enclave', this.clickEnclave, this, 'noframes');
		titleCreditsLogo.setOrigin(0.5,0).setScale(0.5);


		this.containerCredits.add([creditsBg,creditsBack,titleCredits,titleCreditsText,titleCrew,titleCreditsLogo]);

		

		this.cameras.main.fadeIn(250);
	}
    handleKey(e) {
        switch(e.code) {
			case 'KeyM': {
				this.clickMusic();
				break;
			}
			case 'KeyC': {
				if(this.screenName == 'settings') {
					this.clickCredits();
				}
				else { // this.screenName == 'credits'
					this.clickBack('credits');
				}
				break;
			}
            case 'KeyS': {
                this.clickBack();
				break;
			}
			default: {}
        }
    }

	clickMusic() {
		EPT.Sfx.play('click');
		EPT.Sfx.manage('music', 'switch', this, this.buttonMusic, this.textMusic);
	}
	clickCredits() {
		EPT.Sfx.play('click');
		this.tweens.add({targets: this.containerCredits, y: 0, duration: 750, ease: 'Cubic.easeOut' });

		this.buttonBack.input.enabled = false;
		this.buttonMusic.input.enabled = false;
		this.buttonCredits.input.enabled = false;
		if(this.bannerBeer && this.bannerBeer.input) {
			this.bannerBeer.input.enabled = false;
		}
		this.screenName = 'credits';
	}
   
	clickBack(name) {
		EPT.Sfx.play('click');
		if(name) {
			this.buttonBack.input.enabled = true;
			this.buttonMusic.input.enabled = true;
			this.buttonCredits.input.enabled = true;
			if(this.bannerBeer && this.bannerBeer.input) {
				this.bannerBeer.input.enabled = true;
			}
			if(name == 'credits') {
				this.tweens.add({targets: this.containerCredits, y: EPT.world.height, duration: 750, ease: 'Cubic.easeIn' });
			}
			else if(name == 'keyboard') {
				this.tweens.add({targets: this.containerKeyboard, y: EPT.world.height, duration: 750, ease: 'Cubic.easeIn' });
			}
			this.screenName = 'settings';
		}
		else {
			EPT.fadeOutScene('MainMenu', this);
		}
	}
	clickEnclave() {
		EPT.Sfx.play('click');
		window.top.location.href = 'https://www.crunchyroll.com/pt-br/series/GRMG8ZQZR/one-piece';
	}
};