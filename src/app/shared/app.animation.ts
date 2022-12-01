import { trigger, transition, style, animate } from '@angular/animations';
export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }), animate('200ms', style({ opacity: 1 }))]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('200ms', style({ opacity: 0 }))]
  )
]);
