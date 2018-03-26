import * as enchant from 'node-enchantjs';
import core from './enchant/core';
import { code } from './blockly-main';
import { mapchipSize, Map } from './enchant/map';
import { World } from './world';

export type Direction = 'north' | 'east' | 'south' | 'west';

export type CharacterPosition = {
	mapPoint_x: number;
	mapPoint_y: number;
	direction: Direction;
};

export class Character extends enchant.Sprite {
	//mapPoint_*, init_* はマス目の座標を入れる。
	//実際のピクセル座標は、getCoordinateで得る。
	private world: World;
	private mapPoint_x: number;
	private mapPoint_y: number;
	private initMapPoint_x: number;
	private initMapPoint_y: number;
	private countRate: number;
	private defaultVelocity: number;
	private velocity: number;
	private direction: Direction;
	private count: number;

	public constructor(world: World) {
		const width = 32;
		const height = 32;
		super(width, height);
		this.image = core.assets['img/chara1.png'];
		this.initMapPoint_x = 5;
		this.initMapPoint_y = 5;
		this.countRate = 4;
		this.defaultVelocity = mapchipSize / this.countRate;
		this.world = world;

		this.reset();
		this.initCharacter();
	}

	//初期位置に戻す
	public reset() {
		this.mapPoint_x = this.initMapPoint_x;
		this.mapPoint_y = this.initMapPoint_y;
		this.velocity = this.defaultVelocity;
		this.direction = 'east';
		this.x = Map.getCoordinateFromMapPoint(this.mapPoint_x);
		this.y = Map.getCoordinateFromMapPoint(this.mapPoint_y);
		this.count = 0;
	}

	//向いている方向に進む
	public moveForward() {
		if (this.count < this.countRate) {
			this.velocity = this.defaultVelocity;

			if (this.direction === 'north') {
				this.moveBy(0, -this.velocity);
			}

			if (this.direction === 'east') {
				this.moveBy(this.velocity, 0);
			}

			if (this.direction === 'south') {
				this.moveBy(0, this.velocity);
			}

			if (this.direction === 'west') {
				this.moveBy(-this.velocity, 0);
			}

			this.count += 1;
		} else if (this.count === this.countRate) {
			if (this.direction === 'north') {
				this.mapPoint_y -= 1;
			}

			if (this.direction === 'east') {
				this.mapPoint_x += 1;
			}

			if (this.direction === 'south') {
				this.mapPoint_y += 1;
			}

			if (this.direction === 'west') {
				this.mapPoint_x -= 1;
			}

			this.count = 0;

			console.log(this.mapPoint_x, this.mapPoint_y);
			console.log(this.getFeetTile());
		} else {
			this.count += 1;
		}
	}

	//方向転換
	public setDirection(direction: Direction) {
		this.direction = direction;
	}

	//ストップ
	public stop() {
		this.velocity = 0;
		this.count = 0;

		this.x = Map.getCoordinateFromMapPoint(this.mapPoint_x);
		this.y = Map.getCoordinateFromMapPoint(this.mapPoint_y);
	}

	/**
	 * CharacterPositionをマップ座標で返す
	 * @returns {CharacterPosition} -charcaterのマップ座標と向きを返す。
	 */
	public getMapPointAndDirection(): CharacterPosition {
		const mapPoint_x = this.mapPoint_x;
		const mapPoint_y = this.mapPoint_y;
		const direction = this.direction;

		return {
			mapPoint_x,
			mapPoint_y,
			direction,
		};
	}

	/**
	 * 足元のマップチップの種類を取得する。
	 * @returns {number} -足元のマップチップの種類
	 */
	private getFeetTile(): number {
		return this.world.checkCharacterFeetTile(this.mapPoint_x, this.mapPoint_y);
	}

	/**
	 * 目の前のマスに進めるかどうか。
	 * @returns {boolean} -進めればtrue
	 */
	private canMoveNext(): boolean {
		const mapPoint_x = this.mapPoint_x;
		const mapPoint_y = this.mapPoint_y;
		const direction = this.direction;

		return this.world.canMoveCharacterNext({
			mapPoint_x,
			mapPoint_y,
			direction,
		});
	}

	private initCharacter() {
		this.on('enterframe', function() {
			eval(code);

			if (this.getFeetTile() === 3) {
				this.world.scene.moveNextScene('Result');

				//debug用コード（Result画面ができたら消す
				console.log(core.currentScene);
				this.world.scene.moveNextScene('Playing');
			}

			//debug用コード
			if (
				this.mapPoint_x < 2 ||
				this.mapPoint_x > 9 ||
				this.mapPoint_y < 2 ||
				this.mapPoint_y > 9
			) {
				this.reset();
			}
		});
	}
}
