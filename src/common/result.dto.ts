import { IsObject } from 'class-validator';

export class ResultDto {
	@IsObject()
	readonly result: object;

	constructor(data: object, success: boolean = true) {
		this.result = { ...data, success };
	}
}
