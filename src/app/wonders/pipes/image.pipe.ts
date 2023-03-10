import { Pipe, PipeTransform } from '@angular/core';
import { Wonder } from '../interfaces/wonders.interface';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(wonder: Wonder): string {

    if(wonder.id==undefined && wonder.picture_link== " "){
      return 'assets/no-image.png';
    } else if (wonder.picture_link) {
      return wonder.picture_link;
    } else {
      return `assets/wonders/${wonder.id}.jpg`;
    }
  }

}
