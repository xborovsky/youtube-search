import { Injectable, Inject } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { SearchResult } from './search-result';

const API_KEY = 'AIzaSyDco-fJrAJivWIQKjyGGC9_tOFQTjAaGu0';
const API_URL = 'https://www.googleapis.com/youtube/v3/search';

@Injectable()
export class YouTubeService {

  constructor(private http:Http) { }

  search(query:string):Observable<SearchResult[]> {
    let params:string = [
      `q=${query}`,
      `key=${API_KEY}`,
      `part=snippet`,
      `type=video`,
      `maxResults=12`
    ].join('&');
    let queryUrl:string = `${API_URL}?${params}`;

    return this.http.get(queryUrl)
      .map((response:Response) => {
        return (<any>response.json()).items.map(item => {
          console.log(item);
          return new SearchResult({
            id : item.id.videoId,
            title : item.snippet.title,
            description : item.snippet.description,
            thumbnailUrl : item.snippet.thumbnails.high.url
          });
        });
      });
  }

}
