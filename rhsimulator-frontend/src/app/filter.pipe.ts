import { Pipe, PipeTransform } from '@angular/core';
import {Resume} from './resumes/resumes.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Resume[], filterText: string): any[] {
    if(!items) return [];
    if(!filterText) return items;

    filterText = filterText.toLowerCase();
    return items.filter( (res: Resume)  => {
      return res.name.toLowerCase().includes(filterText) ||
        res.content.toLowerCase().includes(filterText);
    });
  }

}
