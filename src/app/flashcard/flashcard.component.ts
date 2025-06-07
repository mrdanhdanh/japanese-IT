import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataService, ITN5Entry } from '../shared/shared-data.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flashcard',
  imports: [CommonModule, MatButtonModule,
    FormsModule],
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnDestroy {
  isFlipped: boolean = false;
  kanji: string = '';
  name: string = '';
  meaning: string = '';
  note: string = '';
  keys: string[] = [];
  currentKey: string = '';
  inputValue: string = '';
  message: string = '';
  private dataLoadedSub: Subscription;

  constructor(private sharedDataService: SharedDataService) {
    this.dataLoadedSub = this.sharedDataService.dataLoaded$.subscribe(loaded => {
      if (loaded) {
        const entries = this.sharedDataService.getAllDataEntries();
        this.keys = Object.keys(entries);
        if (this.keys.length > 0) {
          const randomKey = this.keys[Math.floor(Math.random() * this.keys.length)];
          this.kanji = entries[randomKey].Kanji;
          this.name = entries[randomKey].Name;
          this.meaning = entries[randomKey].Meaning;
          this.note = entries[randomKey].Note;
          this.currentKey = randomKey;
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

  nextCard() {
    if (this.keys.length === 0) return;
    const entries = this.sharedDataService.getAllDataEntries();
    let randomKey = this.keys[Math.floor(Math.random() * this.keys.length)];
    let tries = 0;
    // Đảm bảo không lặp lại thẻ hiện tại
    while (randomKey === this.currentKey && tries < 10) {
      randomKey = this.keys[Math.floor(Math.random() * this.keys.length)];
      tries++;
    }
    this.kanji = entries[randomKey].Kanji;
    this.name = entries[randomKey].Name;
    this.meaning = entries[randomKey].Meaning;
    this.note = entries[randomKey].Note;
    this.isFlipped = false;
    this.currentKey = randomKey;
    this.inputValue = '';
    this.message = '';
  }

  submitAnswer() {
    if (this.inputValue.trim() === this.name.trim()
        || this.inputValue.trim() === this.kanji.trim()) {
      this.message = 'Đúng!';
      setTimeout(() => {
        this.nextCard();
      }, 800);
    } else {
      this.message = 'Sai!';
    }
  }

  get kanjiFontSize(): string {
    return this.kanji && this.kanji.length > 6 ? '36px' : '50px';
  }

  speakKanji(event: Event) {
    event.stopPropagation();
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(this.kanji);
      utter.lang = 'ja-JP';
      window.speechSynthesis.speak(utter);
    }
  }
}
