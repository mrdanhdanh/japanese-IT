import { Component } from '@angular/core';
import { HeaderAComponent } from './header-a/header-a.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
// import { Body001Component } from './body-001/body-001.component';
// import { Body002Component } from './body-002/body-002.component';
// import { Body003Component } from './body-003/body-003.component';
import { BodyMainComponent } from "./body-main/body-main.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderAComponent, BodyMainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IT-japanese';
}
