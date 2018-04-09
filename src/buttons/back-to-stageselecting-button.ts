import GameOverScene from '../scenes/gameover-scene';

export default class BackToStageSelectingButton extends enchant.Sprite {
	public constructor(x: number, y: number, scene: GameOverScene) {
		super(200, 40);
		this.backgroundColor = 'blue';
		this.x = x + 20;
		this.y = y + 240;

		this.listenButton(scene);
	}

	private listenButton(scene: GameOverScene) {
		this.addEventListener('touchstart', () => {
			console.log('BackToStageSelecting button is pushed!');
			scene.moveNextScene('StageSelecting');
		});
	}
}
