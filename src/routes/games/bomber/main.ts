import Phaser from 'phaser';
// import { EventBus } from '../EventBus';

let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
let score = 0;
let scoreText: Phaser.GameObjects.Text;
let gameOver = false;
let stars;
let bombs;

class Game extends Phaser.Scene {
	preload() {
		this.load.image('sky', '/assets/sky.png');
		this.load.image('ground', '/assets/platform.png');
		this.load.image('star', '/assets/star.png');
		this.load.image('bomb', '/assets/bomb.png');
		this.load.spritesheet('dude', '/assets/dude.png', {
			frameWidth: 32,
			frameHeight: 48
		});
	}

	create() {
		this.add.image(400, 300, 'sky');

		const platforms = this.physics.add.staticGroup();

		platforms.create(400, 568, 'ground').setScale(2).refreshBody();

		platforms.create(600, 400, 'ground');
		platforms.create(50, 250, 'ground');
		platforms.create(750, 220, 'ground');

		// player
		player = this.physics.add.sprite(100, 450, 'dude');

		player.setBounce(0.2);
		player.setCollideWorldBounds(true);

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'turn',
			frames: [{ key: 'dude', frame: 4 }],
			frameRate: 20
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		});

		this.physics.add.collider(player, platforms);

		// @ts-expect-error
		cursors = this.input.keyboard.createCursorKeys();

		// stars
		stars = this.physics.add.group({
			key: 'star',
			repeat: 11,
			setXY: { x: 12, y: 0, stepX: 70 }
		});

		// @ts-expect-error
		stars.children.iterate((child) => {
			// @ts-expect-error
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
		});

		this.physics.add.collider(stars, platforms);
		this.physics.add.overlap(player, stars, collectStar, undefined, this);

		scoreText = this.add.text(16, 16, 'score: 0', {
			fontSize: '32px',
			fill: '#000'
		});

		// bombs
		bombs = this.physics.add.group({
			key: 'bomb',
			repeat: 4,
			setXY: { x: 80, y: 100, stepX: 80 },
			bounceY: 1
		});

		this.physics.add.collider(bombs, platforms);
		this.physics.add.collider(player, bombs, hitBomb, undefined, this);

		// EventBus.emit('current-scene-ready', this);
	}

	update() {
		if (cursors.left.isDown) {
			player.setVelocityX(-160);

			player.anims.play('left', true);
		} else if (cursors.right.isDown) {
			player.setVelocityX(160);

			player.anims.play('right', true);
		} else {
			player.setVelocityX(0);

			player.anims.play('turn');
		}

		if (cursors.up.isDown && player.body.touching.down) {
			player.setVelocityY(-330);
		}
	}
}

function collectStar(player, star) {
	star.disableBody(true, true);

	score += 10;
	scoreText.setText('Score: ' + score);

	if (stars.countActive(true) === 0) {
		stars.children.iterate((child) => {
			child.enableBody(true, child.x, 0, true, true);
		});

		const x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

		const bomb = bombs.create(x, 16, 'bomb');
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	}
}

function hitBomb(player, bomb) {
	this.physics.pause();

	player.setTint(0xff0000);
	player.anims.play('turn');
	gameOver = true;
}

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	parent: 'game-container',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300, x: 0 },
			debug: false
		}
	},
	scene: Game,
	scale: {
		parent: 'game-container',
		mode: Phaser.Scale.FIT,
		width: 800,
		height: 600
	}
};

const StartGame = (parent: string) => {
	return new Phaser.Game({ ...config, parent });
};

export default StartGame;
