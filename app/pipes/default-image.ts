import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'defaultImage'
})

export class DefaultImage implements PipeTransform {
  transform(value, arg ){
    value = "https://pixabay.com/static/uploads/photo/2016/08/12/10/50/cutlery-1588097__340.png";
    return value;
  }
}
