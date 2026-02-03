import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment.development';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mappers/gif.maper';
import { Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient)

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  constructor() {
    this.loadTrendingGifs();
   }

  loadTrendingGifs(){

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,
      {
        params: {
          api_key: "ko5rmjwedQsKpDhuUHzCbvMdeGNHek1D",
          limit: 10,
          q: "dog"
        }

      }
    ).subscribe(
      (resp) => {
        console.log("resp", resp);
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
        console.log("gifs", gifs);
        console.log({gifs});

      }
    );

  }

}
