import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Wonder } from '../../interfaces/wonders.interface';
import { WondersService } from '../../services/wonders.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  term: string = '';
  wonders: Wonder[] = [];
  selectedWonder!: Wonder | undefined;
  termChanged = new Subject<string>();


  constructor(private wondersService: WondersService) {
    this.termChanged.pipe(debounceTime(300)).subscribe((term) => {
      this.search(term);
    });
  }

  changed() {
    this.termChanged.next('test');
  }

  ngOnInit(): void {}

  search(term: string) {
    this.wondersService
      .getSuggestions(this.term.trim())
      .subscribe(({ data }) => {
        const wonders: Wonder[] = data.wonders.items;
        this.wonders = wonders;
      });
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.selectedWonder = undefined;
      return;
    }

    const wonder: Wonder = event.option.value;
    this.selectedWonder = wonder;
    this.term = wonder.name;
  }
}
