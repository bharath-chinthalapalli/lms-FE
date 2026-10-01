import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "currencyCoverting",
})
export class CurrencyCovertingPipe implements PipeTransform {
  transform(value: any): any {
    let value_cuurency = Number(value);
    let coverting_into_million = value_cuurency / 1000000;
    return coverting_into_million;
  }
}
