import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    // tslint:disable-next-line:pipe-naming
    name: 'replaceHiphen',
    pure: false
}) 
export class replaceHiphen implements PipeTransform {
    transform(value: number): number {
        if(!value){
         return 0;
        }
       return +value.toString().replace(/-/g, " ");
    //    .toString().replace(/-/g,'')
    }
}