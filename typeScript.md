# TYPESCRIPT

```ts
/** EXTENDS METHOD */
interface ISearchBoxProps extends IChangeHandlerProps {
    className: string;
    placeholder?: string;
}

interface IChangeHandlerProps {
    onChangeHandler: (a: string) => void;
}

/** OVERLOAD METHOD */
interface ISearchBoxProps {
    className: string;
    placeholder?: string;
}

interface ISearchBoxProps {
    // ChangeEventHandler est la manière rapide d'écrire ChangeEvent
    // la différence est qu'elle retourne obligatoirement void
    onChangeHandlerFunc: ChangeEventHandler<HTMLInputElement>;
    // La méthode ChangeEvent permet de retourner autre chose que void (string, boolean ...)
    // ou d'ajouter d'autre paramètre => elle permet de customiser la fonction
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

/** Union with type */
// Combination of types
type CanadianAdress = {
  street: string;
  province: string;
}

type USAdress = {
    street: string;
    province: string;
}

type NorthAmericanAdress = CanadianAdress | USAdress;

const Adress: NorthAmericanAdress = {
    ...
}

```
## Intersection type

C'est l'union de 2 types différents. Comme merger 2 types ensemble.

exemple:

```ts
type Human = {
    name: string;
}

type Alien = {
    fly: () => void;
}

type Hybrid = Human & Alien;

const Josh: Hybrid = {
    name: 'Josh',
    fly: () => {}
}

```

## Return type

Permet de récupérer le type de retour d'une fonction.

```ts
type MyFunc = () => string;

type MyReturn = ReturnType<MyFunc>;

```

## Descriminating Union Pattern

The reducer responds only to the types given by the action