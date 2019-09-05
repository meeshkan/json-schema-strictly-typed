# CHANGELOG

## `v0.0.11`

Allows generic extension of all types.

## `v0.0.10`

* Allows generic toplevel type.

## `v0.0.9`

* Defines robust type checks for toplevel type.

## `v0.0.8`

* Exports JSON validators like `JSONValue`.

## `v0.0.7`

* More robust const type

## `v0.0.6`

* Introduces JSSTEmpty type as strictly empty.
* Exports `JSSTArray_`-like to complement `JSSTArray`, where `JSSTArray_` uses `JSSTEmpty` as a default generic. In general, if a method `{Foo}` exists for generic type verification, `{Foo}_` does the verification with the `JSSTEmpty` as a generic. 

## `v0.0.5`

* Allows for generic type to extend strict types.

## `v0.0.4`

* Fixes bug with multipleOf in integers.

## `v0.0.3`

* More robust integer types for blending min/max.

## `v0.0.2`

* Adds more top-level types.

## `v0.0.1`

* Top-level JSON Schema added.

## `v0.0.0`

* Initial release.