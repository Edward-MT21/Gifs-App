import {Component, input } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  standalone: true,
  imports: [],
  templateUrl: './gif-list-item.html',
})
export class GifListItem { 
  gif = input.required<string>();
}
