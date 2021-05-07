import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCollapsible]'
})
export class CollapsibleDirective {

  constructor(private renderer: Renderer2, private element: ElementRef) { }

  @HostListener('click') onClick() {
    let button = this.element.nativeElement
    let collapsible = this.renderer.nextSibling(button);
    if(collapsible.classList.contains("show")) {
      this.renderer.removeClass(collapsible, "show");
      this.renderer.removeClass(button, "active");
    }else {
      this.renderer.addClass(collapsible, "show");
      this.renderer.addClass(button, "active");
    }
  }
}