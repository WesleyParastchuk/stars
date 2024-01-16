import { Star } from "./star";
import { coordinate } from "./types";
import { universeDimensions } from "./global/universeDimensions";
import { universeElement } from "./global/universeElement";
import {
	speedDivider,
	starMultiplier,
	starUpdateTime,
	starsAmount,
} from "./config/config";

export class StarController {
	private stars: Star[] = [];
	private count: HTMLElement = document.querySelector("#count")!;

	constructor() {
		this.setAnimation();
		window.onload = () => {
			let i = 0;
			const intervalId = setInterval(async () => {
				if (i >= starsAmount) {
					clearInterval(intervalId);
					return;
				}
				this.createStar();
				i++;
				this.count.textContent = i.toString();
			}, starUpdateTime);
		};
	}

	createStar(): void {
		const newStar = new Star({
			direction: this.randomDirection(),
			element: this.createStarElement(),
		});

		this.stars.push(newStar);
		this.putInUniverse(newStar.element);
		this.setCoord(newStar.element);
		this.setOpacity(newStar);
		this.setSize(newStar);
		this.setColor(newStar);
		this.setRotation(newStar);
	}

	private setRotation(star: Star): void {
		star.element &&
			(star.element.style.transform = `rotate(${star.direction}deg)`);
	}

	private updateStars(): void {
		for (let star of this.stars) {
			if (!star.element) continue;

			const directionInRadians = star.direction * (Math.PI / 180);
			const newLeft =
				(parseFloat(star.element.style.left) || 0) +
				(star.speed / speedDivider) * Math.cos(directionInRadians);
			const newTop =
				(parseFloat(star.element.style.top) || 0) +
				(star.speed / speedDivider) * Math.sin(directionInRadians);

			if (
				newLeft < 0 ||
				newLeft > universeDimensions.width ||
				newTop < 0 ||
				newTop > universeDimensions.height
			) {
				star.direction = (star.direction + 180) % 360;
			} else {
				star.element.style.left = `${newLeft}px`;
				star.element.style.top = `${newTop}px`;
			}
		}
	}

	private setAnimation(): void {
        const updateStars = () => {
            this.updateStars();
            requestAnimationFrame(updateStars);
        };
        requestAnimationFrame(updateStars);
    }

	private createStarElement(): HTMLElement {
		const starElement = document.createElement("div");
		starElement.classList.add("star");
		return starElement;
	}

	private randomDirection(): number {
		return Math.floor(Math.random() * 360);
	}

	private randomCoord(): coordinate {
		return {
			x: Math.floor(Math.random() * universeDimensions.width),
			y: Math.floor(Math.random() * universeDimensions.height),
		};
	}

	private putInUniverse(element: HTMLElement | null) {
		element && universeElement?.appendChild(element);
	}

	private setCoord(
		element: HTMLElement | null,
		coord: coordinate = this.randomCoord()
	): void {
		element &&
			(element.style.left = coord.x + "px") &&
			(element.style.top = coord.y + "px");
	}

	private setOpacity(star: Star): void {
		star.element &&
			(star.element.style.opacity = star.speed as unknown as string);
	}

	private setSize(star: Star): void {
		star.element &&
			(star.element.style.width = star.speed * starMultiplier + "px") &&
			(star.element.style.height = star.speed * starMultiplier + "px");
	}

	private setColor(star: Star): void {
		star.element &&
			(star.element.style.backgroundColor = `rgb(${
				Math.floor(Math.random() * 56) + 200
			}, ${Math.floor(Math.random() * 56) + 200}, ${Math.floor(
				Math.random() * 56
			)})`);
	}
}
