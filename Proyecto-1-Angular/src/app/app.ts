import { Component, ViewChild, ElementRef, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('Práctica DOM Angular');
  protected items = signal<string[]>(['Elemento 1', 'Elemento 2']);
  protected inputText = signal('');

  @ViewChild('content') contentRef!: ElementRef;

  ngAfterViewInit() {
    // Modificamos el contenido y estilo dinámicamente
    if (this.contentRef) {
      const browser = this.detectBrowser();
      
      // Cambiar color según navegador
      if (browser === 'Chrome') {
        this.contentRef.nativeElement.style.backgroundColor = 'lightblue';
      } else if (browser === 'Firefox') {
        this.contentRef.nativeElement.style.backgroundColor = 'lightcoral';
      } else if (browser === 'Edge') {
        this.contentRef.nativeElement.style.backgroundColor = 'lightgreen';
      } else {
        this.contentRef.nativeElement.style.backgroundColor = 'lightyellow';
      }
      
      this.contentRef.nativeElement.textContent += ' (Modificado dinámicamente)';
    }
  }

  addItem() {
    const currentItems = this.items();
    this.items.set([...currentItems, `Elemento ${currentItems.length + 1}`]);
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputText.set(target.value);
  }

  detectBrowser(): string {
    const userAgent = navigator.userAgent;
    
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
      return 'Chrome';
    } else if (userAgent.includes('Firefox')) {
      return 'Firefox';
    } else if (userAgent.includes('Edg')) {
      return 'Edge';
    }
    
    return 'Otro';
  }
}