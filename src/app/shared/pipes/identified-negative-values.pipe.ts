import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "identifiedNegativeValues",
})
export class IdentifiedNegativeValuesPipe implements PipeTransform {
  transform(value: any, arg1: any, arg2: any): any {
    let tranferValue = "";
    let covertingTheToNumber: any = Number(value);
    if (covertingTheToNumber >= 0) {
      tranferValue = arg1 + " " + covertingTheToNumber + " " + arg2;
    } else {
      let removeminusFromValue = covertingTheToNumber * -1;
      tranferValue = `(${arg1} ${removeminusFromValue} ${arg2})`;
    }
    return tranferValue;
  }
}
