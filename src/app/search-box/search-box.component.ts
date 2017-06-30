import { Component } from '@angular/core';

import { YouTubeService } from '../youtube.service';
import { SearchResult } from '../search-result';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  results:SearchResult[];

  constructor(private youTubeService:YouTubeService) { }

  search(query:string):void {
    this.youTubeService.search(query)
      .subscribe(
        (results:SearchResult[]) => {console.log(results); this.results = results;},
        (err:any) => console.error(err));
  }

}
