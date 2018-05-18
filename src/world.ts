import core from './enchant/core';
import PlayingScene from './scenes/playing-scene';
import { Character, CharacterPosition } from './character';
import { AnimationQueue } from './animation-queue';
import { Map, MapPoint } from './enchant/map';
import stages from './stages';
import MapChip from './enchant/map-chip';
import { GameOverReason } from './scenes/gameover-scene';

export type ItemKind = 'key' | 'chest';

export type EndStatus = {
	actionNum: number;
	gotChestNum: number;
	gameOverReason?: GameOverReason;
};

export class World {
	public readonly scene: PlayingScene;
	public readonly character: Character;
	public readonly map: Map;
	public readonly animationQueue: AnimationQueue;
	public readonly stageNumber: number;
	public isAnimating: boolean;
	public isDead: boolean;
	public isGoal: boolean;
	public isHavingKey: boolean;
	public gotChestNum: number;
	public actionNum: number;
	public gameOverReason: GameOverReason;

	public constructor(scene: PlayingScene, stageNumber: number) {
		this.scene = scene;
		this.character = new Character(this, stages[stageNumber].characterInitialPosition);
		this.animationQueue = new AnimationQueue();
		this.map = new Map(this.animationQueue, stages[stageNumber].map);
		this.stageNumber = stageNumber;

		this.map.addInto(this.scene);
		this.scene.addChild(this.character);

		this.isAnimating = this.character.isAnimating;

		this.reset();
	}

	public reset() {
		this.isDead = false;
		this.isGoal = false;
		this.isHavingKey = false;
		this.gotChestNum = 0;
		this.actionNum = 0;
		this.character.reset();
		this.map.reset(stages[this.stageNumber].map);
		this.animationQueue.clear();
	}

	/**
	 * マップ座標をわたすとそこのマップチップを返す。
	 * @param {MapPoint} x -mapPoint_x
	 * @param {MapPoint} y -mapPoint_y
	 * @returns {number} -タイル番号
	 */
	public checkTile(x: MapPoint, y: MapPoint): number {
		return this.map.checkTile(x, y);
	}

	public setTile(x: MapPoint, y: MapPoint, tile: MapChip) {
		this.map.setTile(x, y, tile);
	}

	/**
	 * CharacterPositionを渡すとキャラクターが目の前のマスに進めるかを返す。
	 * @param {CharacterPosition} position -CharacterPosition
	 * @param {number} distance -FocusDistance
	 * @returns {boolean} -進めるならtrue
	 */
	public canMoveCharacterNext(position: CharacterPosition, distance: number = 1): boolean {
		let next_x = position.mapPoint_x;
		let next_y = position.mapPoint_y;

		if (position.direction === 'north') {
			next_y -= distance;
		}
		if (position.direction === 'east') {
			next_x += distance;
		}
		if (position.direction === 'south') {
			next_y += distance;
		}
		if (position.direction === 'west') {
			next_x -= distance;
		}

		console.log({ next_x, next_y });

		return this.map.canEnter(next_x, next_y);
	}

	public goal() {
		this.character.goal();
		this.isGoal = true;
	}

	public die(gameOverReason: GameOverReason) {
		this.character.kill();
		this.isDead = true;
		this.gameOverReason = gameOverReason;
	}

	public getItem(item: ItemKind) {
		if (item === 'key') {
			this.isHavingKey = true;
		}
		if (item === 'chest') {
			this.gotChestNum += 1;
		}
	}

	public getEndStatus(): EndStatus {
		return { actionNum: this.actionNum, gotChestNum: this.gotChestNum, gameOverReason: this.gameOverReason };
	}
}
