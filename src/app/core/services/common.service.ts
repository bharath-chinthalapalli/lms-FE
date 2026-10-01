import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AddPopupsComponent } from 'src/app/shared/components/add-popups/add-popups.component';
import { GenericPopupComponentComponent } from 'src/app/shared/components/generic-popup-component/generic-popup-component.component';
import { PlaceholderDirective } from 'src/app/shared/directives/appPlaceholder.directive';
import { ValidationUtils } from 'src/app/utils/Validators';
import { Images } from 'src/app/utils/images-enum-utils';
import { TextEnums } from 'src/app/utils/text-enum-utils';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public triggerTheAddFormData = new BehaviorSubject('');

  public get TextEnums(): typeof TextEnums {
    return TextEnums;
  }

  public get Images(): typeof Images {
    return Images;
  }

  openPopuop(
    loadPopup: PlaceholderDirective,
    typePopup: string,
    cancleText: string,
    submitText: string,
    formGroup: FormGroup,
    heading: string,
    methodName?: any,
    id?: number
  ) {
    const hostViewContainerRef = loadPopup.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef =
      hostViewContainerRef.createComponent(AddPopupsComponent);
    componentRef.instance.type = typePopup;
    componentRef.instance.cancleBtn = cancleText;
    componentRef.instance.submitBtn = submitText;
    componentRef.instance.form = formGroup;
    componentRef.instance.popupHeading = heading;
    componentRef.instance.id = id;
    const closeSubscription = componentRef.instance.close.subscribe(() => {
      closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
    const closeSubscriptions = componentRef.instance.isAdded.subscribe(
      (el: any) => {
        if (el) {
          methodName.call(this);
        }
        closeSubscriptions.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }

  openGenericPopup(loadPopup: PlaceholderDirective, type: string) {
    const hostViewContainerRef = loadPopup.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(
      GenericPopupComponentComponent
    );
    componentRef.instance.type = type;

    const closeSubscription = componentRef.instance.isClose.subscribe(() => {
      closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
    const closeSubscriptions = componentRef.instance.isAdded.subscribe(
      (el: any) => {
        closeSubscriptions.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }

  encrypt(value: string) {
    if (!ValidationUtils.isStringNull(value)) {
      return btoa(value);
    }
    return "";
  }
  decrypt(value: string) {
    if (!ValidationUtils.isStringNull(value)) {
      return atob(value);
    }
    return "";
  }
}
