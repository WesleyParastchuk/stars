import { Star } from "./star";
import { coordinate, dimension } from "./types";

export class StarController {
	private stars: Star[] = [];
	private universeDimensions: dimension = { width: 0, height: 0 };
    private counter: number = 0;

	constructor({
		universeDimensions: dimension,
	}: {
		universeDimensions: dimension;
	}) {
		this.universeDimensions = dimension;

	}

	createStar() {
		this.stars.push(
			new Star({
				direction: this.randomDirection(),
                element: this.createStarElement(),
			})
		);
        this.counter++;
        //setCoord(this.stars[this.counter].element, this.randomCoord());
	}

	moveAll() {
		//fodeo k
	}
    
    //@ts-ignore
    private setCoord(element: HTMLElement, coord: coordinate) {
        element.style.left = coord.x + 'px';
        element.style.top = coord.y + 'px';
    }

    private createStarElement(): HTMLElement {
        const starElement = document.createElement('div');
        starElement.classList.add('star');
        return starElement;
    }

	private randomDirection(): number {
		return Math.floor(Math.random() * 360);
	}

    //@ts-ignore
	private randomCoord(): coordinate {
		return {
			x: Math.floor(Math.random() * this.universeDimensions.width),
			y: Math.floor(Math.random() * this.universeDimensions.height),
		};
	}
}
