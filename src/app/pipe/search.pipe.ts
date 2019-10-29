import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], rechercheMot: string): any {
    if (!items || !rechercheMot) {
      return items;
    }
    return items.filter(ps => ps.nom.toLowerCase().indexOf(rechercheMot.toLowerCase()) !== -1 || ps.prenom.toLowerCase().indexOf(rechercheMot.toLowerCase()) !== -1 || ps.email.toLowerCase().indexOf(rechercheMot.toLowerCase()) !== -1);
  }

}
