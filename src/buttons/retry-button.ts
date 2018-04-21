import GameOverScene from '../scenes/gameover-scene';

export default class RetryButton extends enchant.Sprite {
	public constructor(x: number, y: number, scene: GameOverScene) {
		super(200, 40);
		this.backgroundColor = 'green';
		this.x = x;
		this.y = y;

		this.listenButton(scene);
	}

	private listenButton(scene: GameOverScene) {
		this.addEventListener('touchstart', () => {
			console.log('retry button is pushed!');
			scene.moveNextScene('Playing');
		});
	}
}