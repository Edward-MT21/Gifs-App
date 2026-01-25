import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gifs-side-menu-header',
  standalone: true,
  imports: [],
  templateUrl: './gifs-side-menu-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuHeader { }
