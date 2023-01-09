import { AnyAction } from "redux";

// A type predicat function is like a function who verifies whether a specific argument that it recieves
// is going to be a narrowing (more specific) type or not
type Matchable<AC extends ()=> AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>;
};

// function who return back an action Without parameter
export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

// function who return back an action With paramter
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
    // Ce que fait la fonction lorsqu'elle reçoit la fonction qui correspond
    // Il récupère la valeur du type du créateur d'action qui est invoqué
    // Ce qui permet d'obtenir l'action, puis la valeur du type
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        }
    })
}

export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
};

export type Action<T> = {
    type: T;
};

// If createAction get called with a type and a payload the return type of this function will be
// ActionWhithPayload
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

// If createAction get call with only a type then we return the Action type
// But since createAction needs a second parameter we give it a void so that it doesn't
// expect a value
export function createAction<T extends string>(type: T, payload: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload:P) {
    return { type, payload }
};
