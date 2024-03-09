import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map } from 'rxjs/operators';
import { GithubUser, GithubUserResponse } from '../interfaces/github';

@Injectable({
  providedIn: 'root'
})

export class GithubApiService {
  public searchResults$: Observable<GithubUser[]>;
  private searchTerms = new Subject<string>();
  private apiUrl = 'https://api.github.com/search/users';

  constructor(private http: HttpClient) {

    this.searchResults$ = this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (term.trim() === '') {
          return of([]);
        } else {
          return this.http.get<GithubUserResponse>(`${this.apiUrl}?q=${term}+in:login&per_page=50`).pipe(
            map(response => response.items),
            catchError(error => {
              console.error('Error occurred while searching users:', error);
              return of([]);
            })
          );
        }
      })
    );
  }

  public search(term: string): void {
    this.searchTerms.next(term);
  }
}
