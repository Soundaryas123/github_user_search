import { Component, OnDestroy, OnInit } from '@angular/core';
import { GithubApiService } from '../services/github-api.service';
import { Subscription } from 'rxjs';
import { GithubUser } from '../interfaces/github'

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit, OnDestroy {
  public searchResults: GithubUser[] | undefined;
  private searchResultsSubscription!: Subscription;

  constructor(private githubApiService: GithubApiService) { }

  ngOnInit(): void {
    this.searchResultsSubscription = this.githubApiService.searchResults$.subscribe(
      (users: GithubUser[]) => {
        this.searchResults = users;
      }
    );
  }

  public search(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.githubApiService.search(term);
  }

  ngOnDestroy(): void {
    this.searchResultsSubscription.unsubscribe();
  }
}
