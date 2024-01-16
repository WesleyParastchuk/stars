export class Star {
	public direction: number;
	public element: HTMLElement | null;
	public speed: number = 0;

	constructor({
		direction,
		element,
		speed
	}: {
		direction: number;
		element: HTMLElement | null;
		speed?: number;
	}) {
		this.direction = direction;
		this.element = element as HTMLElement;
		this.speed = speed || Math.random();
	}
}
