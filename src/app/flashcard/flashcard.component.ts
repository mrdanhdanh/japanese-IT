import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataService, ITN5Entry } from '../shared/shared-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flashcard',
  imports: [CommonModule],
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnDestroy {
  isFlipped: boolean = false;
  kanji: string = '';
  name: string = '';
  meaning: string = '';
  note: string = '';
  private dataLoadedSub: Subscription;

  constructor(private sharedDataService: SharedDataService) {
    this.dataLoadedSub = this.sharedDataService.dataLoaded$.subscribe(loaded => {
      if (loaded) {
        const entries = this.sharedDataService.getAllDataEntries();
        const firstKey = Object.keys(entries)[0];
        if (firstKey) {
          this.kanji = entries[firstKey].Kanji;
          this.name = entries[firstKey].Name;
          this.meaning = entries[firstKey].Meaning;
          this.note = entries[firstKey].Note;
        }
      }
    });
  }

  ngOnDestroy() {
    this.dataLoadedSub.unsubscribe();
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}
