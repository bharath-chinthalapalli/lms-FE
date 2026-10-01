import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "capitalizeSpace",
})
export class CapitalizeSpacePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return "";
    }
    let formattedString = value.charAt(0).toUpperCase();

    for (let i = 1; i < value.length; i++) {
      if (value.charAt(i).toUpperCase() === value.charAt(i)) {
        formattedString += " " + value.charAt(i);
      } else {
        formattedString += value.charAt(i);
      }
    }

    return formattedString;
  }
}
