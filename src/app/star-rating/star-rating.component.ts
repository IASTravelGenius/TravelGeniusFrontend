import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-star-rating',
    templateUrl: './star-rating.component.html',
    styleUrls: ['./star-rating.component.css'],
    standalone: false
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  stars: boolean[] = [false, false, false, false, false];

  ngOnChanges(): void {
    this.updateStars();
  }

  rate(rating: number): void {
    this.rating = rating;
    this.ratingChange.emit(this.rating);
    this.updateStars();
  }

  private updateStars(): void {
    this.stars = this.stars.map((_, i) => i < this.rating);
  }
}
