import MapChip from './enchant/mapchip';
import { CharacterPosition } from './character';

export type Stage = {
	map: MapChip[][];
	name: string;
	description: string;
	characterInitialPosition: CharacterPosition;
};

const stages: Stage[] = [
	{
		map: [
			[21, 22, 22, 22, 22, 22, 22, 22, 22, 23],
			[24,  7,  2,  2,  2,  2,  6,  2, 11, 26],
			[24,  2, 30, 28, 28, 31,  2, 30, 28, 29],
			[24,  2, 26, 21, 22, 44,  2, 26, 25, 25],
			[24,  2, 26, 24,  2, 42,  2, 26, 25, 25],
			[24,  8, 26, 24,  2, 42,  2, 26, 25, 25],
			[24,  2, 26, 24,  2, 42,  2, 26, 25, 25],
			[24,  2, 32, 33,  2, 43,  2, 32, 22, 23],
			[24,  3, 10,  2,  2,  2,  5,  2,  9, 26],
			[27, 28, 28, 28, 28, 28, 28, 28, 28, 29],
		],
		name: 'まっすぐ進む',
		description: '基本的な操作に慣れよう',
		characterInitialPosition: {
			mapPoint_x: 5,
			mapPoint_y: 5,
			direction: 'south',
		},
	},
	{
		map: [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 7, 2, 2, 2, 2, 6, 2, 11, 1],
			[1, 2, 1, 1, 1, 1, 2, 1, 1, 1],
			[1, 2, 1, 1, 1, 1, 2, 1, 1, 1],
			[1, 2, 1, 1, 2, 1, 2, 1, 1, 1],
			[1, 8, 1, 1, 1, 1, 2, 1, 1, 1],
			[1, 2, 1, 1, 2, 1, 2, 1, 1, 1],
			[1, 2, 1, 1, 2, 1, 2, 1, 1, 1],
			[1, 3, 10, 2, 4, 2, 5, 2, 9, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		],
		name: '曲がる',
		description: '曲がるという操作を覚えよう',
		characterInitialPosition: {
			mapPoint_x: 5,
			mapPoint_y: 5,
			direction: 'south',
		},
	},
	{
		map: [
			[21, 22, 22, 22, 22, 22, 22, 22, 22, 23],
			[24,  7,  2,  2,  2,  2,  6,  2,  2, 26],
			[24,  2, 30, 28, 28, 31,  2, 41,  2, 26],
			[24,  2, 26, 21, 22, 44,  2, 42,  2, 26],
			[24,  2, 26, 24,  2, 42,  2, 42,  2, 26],
			[24,  2, 32, 33,  2, 43,  2, 43,  2, 26],
			[24,  2, 10, 11,  8,  2,  2,  2,  9, 26],
			[24,  2, 34, 36,  2, 57,  2, 57,  2, 26],
			[24,  3, 10,  2,  4,  2,  5,  2,  2, 26],
			[27, 28, 28, 28, 28, 28, 28, 28, 28, 29],
		],
		name: 'image test',
		description: 'マップチップのテスト',
		characterInitialPosition: {
			mapPoint_x: 5,
			mapPoint_y: 5,
			direction: 'south',
		},
	},
	{
		map: [
			[21, 22, 22, 22, 22, 22, 22, 22, 22, 23],
			[24,  7,  2,  2,  2,  2,  6,  2,  2, 26],
			[24,  2, 30, 28, 28, 31,  2, 41,  2, 26],
			[24,  2, 26, 21, 22, 44,  2, 42,  2, 26],
			[24,  2, 26, 24,  2, 42,  2, 42,  2, 26],
			[24,  2, 32, 33,  2, 43,  2, 43,  2, 26],
			[24,  2, 10, 11,  8,  2,  2,  2,  9, 26],
			[24,  2, 34, 36,  2, 57,  2, 57,  2, 26],
			[24,  3, 10,  2,  4,  2,  5,  2,  2, 26],
			[27, 28, 28, 28, 28, 28, 28, 28, 28, 29],
		],
		name: 'image test',
		description: 'マップチップのテスト',
	},
];

export default stages;
