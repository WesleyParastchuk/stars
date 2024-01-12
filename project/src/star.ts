//@ts-ignore
import { coordinate, dimension } from "./types.ts";

export class Star {
	public direction: number;
	public element: HTMLElement | null;

	constructor({
		direction,
		element,
	}: {
		direction: number;
		element: HTMLElement | null;
	}) {
		this.direction = direction;
		this.element = element;
	}


}
