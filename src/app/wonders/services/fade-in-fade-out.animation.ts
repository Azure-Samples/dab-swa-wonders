import {
    transition,
    style,
    animate,
    query,
    stagger,
    trigger
  } from '@angular/animations';
  
  export const FADEINOUT = trigger('listAnimation', [
    transition('* => *', [
      query(':leave', [stagger(100, [animate('0.5s', style({ opacity: 0 }))])], {
        optional: true
      }),
      query(
        ':enter',
        [
          style({ opacity: 0 }),
          stagger(100, [animate('0.5s', style({ opacity: 1 }))])
        ],
        { optional: true }
      )
    ])
  ]);
  