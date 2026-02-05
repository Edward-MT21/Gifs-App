import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifService } from 'src/app/gifs/services/gif.service.';

interface MenuOption {
  icon: string;
  label: string;
  subLabel: string;
  route: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuOptions { 

  gifService = inject(GifService);

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Popular gifs',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      subLabel: 'Search gifs',
      route: '/dashboard/search'
    }

  ];


}
