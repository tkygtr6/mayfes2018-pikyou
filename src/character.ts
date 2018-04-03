import * as enchant from 'node-enchantjs';
import core from './enchant/core';
import { code } from './blockly-main';
import { mapchipSize, Map } from './enchant/map';
import { World } from './world';
import MapChip from './enchant/mapchip';

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
	private isAnimation: boolean;

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
		this.isAnimation = false;
	}

	//向いている方向に進む
	public moveForward() {
		if (!this.isAnimation) {
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

			this.tl.action(this.mkMovingAction(this.direction));
		}

			console.log(`x = ${this.mapPoint_x}, y = ${this.mapPoint_y}, tile = ${this.getFeetTile()}`);
	}

	//方向転換
	public setDirection(direction: Direction) {
		if (!this.isAnimation) {
			this.direction = direction;
		}
	}

	//ストップ
	public stop() {
		this.velocity = 0;

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

	private mkMovingAction(direction: Direction) {
		const timer: number = 4;
		let actiontick;

		if (direction === 'north') {
			actiontick = function() {
				this.moveBy(0, -this.velocity);
			}
		}
		
		if (direction === 'east') {
			actiontick = function() {
				this.moveBy(this.velocity, 0);
			}
		}

		if (direction === 'south') {
			actiontick = function() {
				this.moveBy(0, this.velocity);
			}
		}

		if (direction === 'west') {
			actiontick = function() {
				this.moveBy(-this.velocity, 0);
			}
		}

		const action = {
			time: timer,
			onactionstart: function() {
				this.isAnimation = true;
				console.log('action start');
			},
			onactionend: function() {
				this.isAnimation = false;
				console.log('action end');
			},
			onactiontick: actiontick
		}

		return action;
	}

	private initCharacter() {
		this.on('enterframe', function() {
			eval(code);

			if (this.getFeetTile() === MapChip.Goal) {
				this.world.goal();
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
