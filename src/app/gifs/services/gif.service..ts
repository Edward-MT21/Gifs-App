import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment.development';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mappers/gif.maper';
import { Gif } from '../interfaces/gif.interface';
import { map, Observable, tap } from 'rxjs';

const HISTORY_GIFS = 'historyGifs';

const loadGifsFromLocalStorage = () => {
  let historyGifs = localStorage.getItem(HISTORY_GIFS);
  return historyGifs ? JSON.parse(historyGifs) : {};
}


@Injectable({
  providedIn: 'root'
})
export class GifService {

  constructor() {
    this.loadTrendingGifs();
   }

  private http = inject(HttpClient)

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);
  trendingGifsGroup = computed<Gif[][]>(() => {
    const groups = [];
    for(let i=0; i<this.trendingGifs().length; i+=3){
      groups.push(this.trendingGifs().slice(i, i+3));
    }
    console.log({groups});
    return groups; // [[g1,g2,g3], [g4,g5]]

  });

  searchHistory = signal<Record<string, Gif[]>>(loadGifsFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  saveGifsToLocalStorage = effect(() => {
    localStorage.setItem(HISTORY_GIFS, JSON.stringify(this.searchHistory()));
  });



  loadTrendingGifs(){

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,
      {
        params: {
          api_key: "ko5rmjwedQsKpDhuUHzCbvMdeGNHek1D",
          limit: 20,
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

    searchGifs(arggSearch: string): Observable<Gif[]>{

    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,
      {
        params: {
          api_key: "ko5rmjwedQsKpDhuUHzCbvMdeGNHek1D",
          limit: 10,
          q: arggSearch
        }

      }
    ).pipe(
      tap(() => console.log("Entro pipe")),
      map(({data})=> data),
      map((items)=> GifMapper.mapGiphyItemsToGifArray(items)),
      //map(({data})=>  GifMapper.mapGiphyItemsToGifArray(data))//Example two in one line
      tap((items) => {
        this.searchHistory.update((history) => ({
          ...history,
          [arggSearch.toLowerCase()]: items
        }))
      })

    );

  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query]?? [];
  }

  /*
  loadGifsFromLocalStorage(): Record<string, Gif[]> {
    let historyGifs = localStorage.getItem(HISTORY_GIFS);
    return historyGifs ? JSON.parse(historyGifs) : {};
  }
  */

}
