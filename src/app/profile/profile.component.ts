import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile = {
    username: 'JohnDoe',
    description: 'Avid traveler and foodie',
    country: 'USA',
    city: 'New York',
    profilePic: 'path/to/profile-pic.jpg',
    tags: ['travel', 'food', 'photography']
  };
  newTag: string = '';

  constructor() {}

  ngOnInit(): void {}

  removeTag(tag: string): void {
    this.profile.tags = this.profile.tags.filter(t => t !== tag);
  }

  addTag(): void {
    if (this.newTag.trim() && !this.profile.tags.includes(this.newTag)) {
      this.profile.tags.push(this.newTag);
      this.newTag = '';
    }
  }
}
