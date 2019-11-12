[![CircleCI](https://circleci.com/gh/unmock/json-schema-fast-check.svg?style=svg)](https://circleci.com/gh/unmock/json-schema-fast-check)
[![codecov](https://codecov.io/gh/unmock/json-schema-fast-check/branch/master/graph/badge.svg)](https://codecov.io/gh/unmock/json-schema-fast-check)

# json-schema-strictly-typed

[JSON Schema](https://json-schema.org) is a useful way to define input and output schemas.

Typescript is a useful way to verify the types of JavaScript objects.

`json-schema-strictly-typed` implements a strict flavor of the JSON Schema 7 specification for typing. By strict, we mean that it is organized into logical types that represent real usage, disallowing certain "nonsense" combinations of fields.

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

## Contributing

Thanks for wanting to contribute! We will soon have a contributing page
detaling how to contribute. Meanwhile, there are plenty of features that haven't been implemented yet. Please check out our [open issues](https://github.com/unmock/json-schema-strictly-typed/issues). We'd really appreciate your help!


Please note that this project is governed by the [Unmock Community Code of Conduct](https://github.com/unmock/code-of-conduct). By participating in this project, you agree to abide by its terms.
