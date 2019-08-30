import { Action } from '@ngrx/store';
import { IngresoEgresoModel } from './ingreso-egreso.model';

export const SET_ITEMS = '[IE] Set Items';
export const UNSET_ITEMS = '[IE] Unset Items';


export class SetItemsAction implements Action {

  readonly type = SET_ITEMS;

  constructor( public items: IngresoEgresoModel[] ) { }
}

export class UnsetItemsAction implements Action {

  readonly type = UNSET_ITEMS;
}

export type IEActions = SetItemsAction | UnsetItemsAction;
