import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mappers/gif.maper';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient)

  constructor() {
    this.loadTrendingGifs();
   }

  loadTrendingGifs(){

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,
      {
        params: {
          api_key: "ko5rmjwedQsKpDhuUHzCbvMdeGNHek1D",
          limit: 3,
          q: "dog"
        }

      }
    ).subscribe(
      (resp) => {
        console.log("resp", resp);
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        console.log("gifs", gifs);

      }
    );

  }

}
