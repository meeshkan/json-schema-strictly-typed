[![CircleCI](https://circleci.com/gh/unmock/json-schema-fast-check.svg?style=svg)](https://circleci.com/gh/unmock/json-schema-fast-check)
[![codecov](https://codecov.io/gh/unmock/json-schema-fast-check/branch/master/graph/badge.svg)](https://codecov.io/gh/unmock/json-schema-fast-check)

# json-schema-strictly-typed

[JSON Schema](https://json-schema.org) is a useful way to define input and output schemas.

Typescript is a useful way to verify the types of JavaScript objects.

`json-schema-strictly-typed` implements a strict flavor of the JSON Schema 6 specification for typing. By strict, we mean prohibiting certain ambiguous or problematic types in the Schema.

```json
{
    type: "integer",
    minimum: 0
    exclusiveMinimum: 5
}
```

This makes no sense, as you cannot have a number whose minimum bound is simultaneously 0 (minimum) and 6 (the exclusive minimum of five).

`json-schema-strictly-typed` aims to eliminate these types of nonsense values.

## Example

```typescript
import { JSSTInteger } from "json-schema-strictly-typed";

test("my schema is an integer", () => {
    JSSTInteger.is({ type: "integer" });
});
```

## API

Here are all of the types in the API.  Some of them also have sub-types for useful validation. In addition to canonical JSON Schema 6, we have added an optional `faker` field to the `string` type to use faker-like packages.

* `JSSTEmpty`
* `JSSTConst`
* `JSSTRefer`ence
* `JSSTNull`
* `JSSTBoolean`
* `JSSTInteger`
  * `JSSTSimpleInteger`
  * `JSSTIntegerWithMinimum`
  * `JSSTIntegerWithMaximum`
  * `JSSTIntegerWithBounds`
  * `JSSTIntegerWithNumericExclusiveBounds`
  * `JSSTIntegerWithNumericExclusiveMaximum`
  * `JSSTIntegerWithNumericExclusiveMinimum`
  * `JSSTIntegerEnum`
* `JSSTNumber`
  * `JSSTSimpleNumber`
  * `JSSTNumberEnum`
* `JSSTString`
  * `JSSTSimpleString`
  * `JSSTRegex`
  * `JSSTStringEnum`
* `JSSTArray`
  * `JSSTList`
  * `JSSTTuple`
* `JSSTObject`
* `JSSTOneOf`
* `JSSTAnyOf`
* `JSSTAllOf`
* `JSSTNot`

Additionally, top-level versions of all of these are available by adding `TopLevel` to the definition. Top-level JSON Schema objects contain optional fields like `$id`, `$schema` and `definitions`.

## Todo

There is plenty of stuff that is not implemented yet.  I'd really appreciate your help!

* finish implementing the JSON Schema 7 Specification
* add various schema extensions