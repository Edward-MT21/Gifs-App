import { Component, inject, signal } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifService } from '../../services/gif.service.';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [GifList],
  templateUrl: './search-page.html',
})
export default class SearchPage {

  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(argSearch: string) {
    console.log({argSearch})
    this.gifService.searchGifs(argSearch).subscribe(
      (resp) => this.gifs.set(resp)
    );
  }

}
