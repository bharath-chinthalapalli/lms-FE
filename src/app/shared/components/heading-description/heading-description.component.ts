import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading-description',
  templateUrl: './heading-description.component.html',
  styleUrls: ['./heading-description.component.scss'],
})
export class HeadingDescriptionComponent {
  @Input() heading: string = '';
  @Input() description: string = '';

  constructor() {}
}
