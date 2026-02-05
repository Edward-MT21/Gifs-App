import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { GifService } from '../../services/gif.service.';
import { GifList } from "../../components/gif-list/gif-list";

@Component({
  selector: 'app-gif-history',
  standalone: true,
  imports: [GifList],
  templateUrl: './gif-history.html',
})
export default class GifHistory {

  gifService = inject(GifService);

  query = toSignal(inject(ActivatedRoute).params.pipe(
    map((params) => params['query'])
  ));

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));

}
