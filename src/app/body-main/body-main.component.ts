import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { DynamicLoaderService } from '../shared/dynamic-loader.service';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { QuizComponent } from '../quiz/quiz.component';
import { GridflexControlComponent } from '../gridflex-control/gridflex-control.component';

@Component({
  selector: 'app-body-main',
  templateUrl: './body-main.component.html',
  styleUrls: ['./body-main.component.scss']
})
export class BodyMainComponent implements OnInit {
  @ViewChild('appContainBody', { read: ViewContainerRef, static: false }) appContain!: ViewContainerRef;

  constructor(private dynamicLoaderService: DynamicLoaderService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  ngOnInit() {
    this.dynamicLoaderService.loadComponent$.subscribe((componentName) => {
      if (componentName === 'none') {
        this.appContain.clear();
        return;
      }
      // Load the component dynamically based on the name
      const component = this.getComponentByName(componentName);
      if (component) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        this.appContain.clear();
        this.appContain.createComponent(componentFactory);
      }
      else {
        console.error(`Component ${componentName} not found.`);
      }
    });
  }

  private getComponentByName(name: string): any {
    // Map component names to actual component classes
    const components: { [key: string]: any } = {
      'flashcard': FlashcardComponent,
      'quiz': QuizComponent,
      'gridflex': GridflexControlComponent,
    };
    return components[name] || null;
  }
}