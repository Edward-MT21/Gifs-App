import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-gif-history',
  standalone: true,
  imports: [],
  templateUrl: './gif-history.html',
})
export default class GifHistory {
  query = toSignal(inject(ActivatedRoute).params.pipe(
    map((params) => params['query'])
  ));
 }
