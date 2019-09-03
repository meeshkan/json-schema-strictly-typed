import * as t from "io-ts";
const _J = (input: unknown): input is JSSTEmpty =>
  typeof input === "object" &&
  !Object.getPrototypeOf(input) &&
  Object.getOwnPropertyNames(<object>input).length === 0;
export const JSSTEmpty = new t.Type<JSSTEmpty, JSSTEmpty, unknown>(
  "JSSTEmpty",
  (input: unknown): input is JSSTEmpty => _J(input),
  (input, context) =>
    _J(input) ? t.success(input) : t.failure(input, context),
  t.identity
);
export const JSSTList = <T = JSSTEmpty>(
  c: t.Type<T, T>
): t.Type<JSSTList<T>, JSSTListOutput<T>> =>
  t.recursion("JSSTList", () =>
    t.intersection([
      JSSTProtoArray,
      t.intersection([
        t.type({
          items: JSSTAnything(c)
        }),
        t.partial({
          uniqueItems: t.boolean,
          minItems: t.number,
          maxItems: t.number
        })
      ])
    ])
  );
export const JSSTList_ = JSSTList(JSSTEmpty);
export const JSSTAnything = <T = JSSTEmpty>(
  c: t.Type<T, T>
): t.Type<JSSTAnything<T>, JSSTAnythingOutput<T>> =>
  t.recursion("JSSTAnything", () =>
    t.union([
      JSSTEmpty,
      JSSTConst,
      JSSTReference,
      JSSTNull,
      JSSTBoolean,
      JSSTInteger,
      JSSTNumber,
      JSSTString,
      JSSTArray(c),
      JSSTObject(c),
      JSSTOneOf(c),
      JSSTAnyOf(c),
      JSSTAllOf(c),
      JSSTNot(c),
      c
    ])
  );
export const JSSTTuple = <T = JSSTEmpty>(
  c: t.Type<T, T>
): t.Type<JSSTTuple<T>, JSSTTupleOutput<T>> =>
  t.recursion("JSSTTuple", () =>
    t.intersection([
      JSSTProtoArray,
      t.type({
        items: t.array(JSSTAnything(c))
      })
    ])
  );
export const JSSTTuple_ = JSSTTuple(JSSTEmpty);
export const JSSTObject = <T = JSSTEmpty>(
  c: t.Type<T, T>
): t.Type<JSSTObject<T>, JSSTObjectOutput<T>> =>
  t.recursion("JSSTObject", () =>
    t.intersection([
      t.type({
        type: t.literal("object")
      }),
      t.partial({
        required: t.array(t.string),
        dependencies: t.record(t.string, t.array(t.string)),
        additionalProperties: t.union([t.boolean, JSSTAnything(c)]),
        patternProperties: t.record(t.string, JSSTAnything(c)),
        properties: t.record(t.string, JSSTAnything(c))
      })
    ])
  );
export const JSSTObject_ = JSSTObject(JSSTEmpty);
export const JSSTOneOf = <T = JSSTEmpty>(
  c: t.Type<T, T>
): t.Type<JSSTOneOf<T>, JSSTOneOfOutput<T>> =>
  t.recursion("JSSTOneOf", () =>
    t.type({
      oneOf: t.array(JSSTAnything(c))
    })
  );
export const JSSTOneOf_ = JSSTOneOf(JSSTEmpty);
export const JSSTAnyOf = <T = JSSTEmpty>(
  c: t.Type<T, T>
): t.Type<JSSTAnyOf<T>, JSSTAnyOfOutput<T>> =>
  t.recursion("JSSTAnyOf", () =>
    t.type({
      anyOf: t.array(JSSTAnything(c))
    })
  );
export const JSSTAnyOf_ = JSSTAnyOf(JSSTEmpty);
export const JSSTAllOf = <T = JSSTEmpty>(
  c: t.Type<T, T>
): t.Type<JSSTAllOf<T>, JSSTAllOfOutput<T>> =>
  t.recursion("JSSTAllOf", () =>
    t.type({
      allOf: t.array(JSSTAnything(c))
    })
  );
export const JSSTAllOf_ = JSSTAllOf(JSSTEmpty);
export const JSSTNot = <T = JSSTEmpty>(
  c: t.Type<T, T>
): t.Type<JSSTNot<T>, JSSTNotOutput<T>> =>
  t.recursion("JSSTNot", () =>
    t.type({
      not: JSSTAnything(c)
    })
  );
export const JSSTNot_ = JSSTNot(JSSTEmpty);

export const JSONPrimitive = t.union([t.number, t.boolean, t.string, t.null]);
export const JSONValue: t.Type<JSONValue> = t.recursion("JSONValue", () =>
  t.union([JSONPrimitive, JSONObject, JSONArray])
);
export const JSONObject: t.Type<JSONObject> = t.recursion("JSONObject", () =>
  t.record(t.string, JSONValue)
);
export const JSONArray: t.Type<JSONArray> = t.recursion("JSONArray", () =>
  t.array(JSONValue)
);

export const JSSTConst: t.Type<JSSTConst, JSSTConst> = t.recursion(
  "JSSTConst",
  () => t.type({ const: JSONValue })
);
export const JSSTReference = t.type({
  $ref: t.string
});
export const JSSTNull = t.type({
  type: t.literal("null")
});
export const JSSTBoolean = t.type({
  type: t.literal("boolean")
});
export const JSSTProtoInteger = t.type({
  type: t.literal("integer")
});
export const JSSTSimpleInteger = t.intersection([
  JSSTProtoInteger,
  t.partial({
    multipleOf: t.number
  })
]);
export const JSSTIntegerWithMinimum = t.intersection([
  JSSTSimpleInteger,
  t.intersection([
    t.type({
      minimum: t.number
    }),
    t.partial({
      exclusiveMinimum: t.boolean
    })
  ])
]);
export const JSSTIntegerWithMaximum = t.intersection([
  JSSTSimpleInteger,
  t.intersection([
    t.type({
      maximum: t.number
    }),
    t.partial({
      exclusiveMaximum: t.boolean
    })
  ])
]);
export const JSSTIntegerWithBounds = t.intersection([
  JSSTSimpleInteger,
  t.intersection([
    t.type({
      minimum: t.number,
      maximum: t.number
    }),
    t.partial({
      exclusiveMinimum: t.boolean,
      exclusiveMaximum: t.boolean
    })
  ])
]);
export const JSSTIntegerWithNumericExclusiveMinimum = t.intersection([
  JSSTSimpleInteger,
  t.type({
    exclusiveMinimum: t.number
  })
]);
export const JSSTIntegerWithNumericExclusiveMinimumAndMaximum = t.intersection([
  JSSTSimpleInteger,
  t.intersection([
    t.type({
      exclusiveMinimum: t.number,
      maximum: t.number
    }),
    t.partial({
      exclusiveMaximum: t.boolean
    })
  ])
]);
export const JSSTIntegerWithNumericExclusiveMaximum = t.intersection([
  JSSTSimpleInteger,
  t.type({
    exclusiveMaximum: t.number
  })
]);
export const JSSTIntegerWithNumericExclusiveMaximumAndMinimum = t.intersection([
  JSSTSimpleInteger,
  t.intersection([
    t.type({
      exclusiveMaximum: t.number,
      minimum: t.number
    }),
    t.partial({
      exclusiveMinimum: t.boolean
    })
  ])
]);
export const JSSTIntegerWithNumericExclusiveBounds = t.intersection([
  JSSTSimpleInteger,
  t.type({
    exclusiveMinimum: t.number,
    exclusiveMaximum: t.number
  })
]);
export const JSSTIntegerEnum = t.intersection([
  JSSTProtoInteger,
  t.type({
    enum: t.array(t.number)
  })
]);
export const JSSTInteger = t.union([
  JSSTSimpleInteger,
  JSSTIntegerWithMinimum,
  JSSTIntegerWithMaximum,
  JSSTIntegerWithBounds,
  JSSTIntegerWithNumericExclusiveMinimum,
  JSSTIntegerWithNumericExclusiveMinimumAndMaximum,
  JSSTIntegerWithNumericExclusiveMaximum,
  JSSTIntegerWithNumericExclusiveMaximumAndMinimum,
  JSSTIntegerWithNumericExclusiveBounds,
  JSSTIntegerEnum
]);
export const JSSTProtoNumber = t.type({
  type: t.literal("number")
});
export const JSSTSimpleNumber = t.intersection([
  JSSTProtoNumber,
  t.partial({
    minimum: t.number,
    maximum: t.number,
    multipleOf: t.number
  })
]);
export const JSSTNumberEnum = t.intersection([
  JSSTProtoNumber,
  t.type({
    enum: t.array(t.number)
  })
]);
export const JSSTNumber = t.union([JSSTSimpleNumber, JSSTNumberEnum]);
export const JSSTProtoString = t.type({
  type: t.literal("string")
});
export const JSSTFaker = t.union([
  t.literal("address.zipCode"),
  t.literal("address.city"),
  t.literal("address.cityPrefix"),
  t.literal("address.citySuffix"),
  t.literal("address.streetName"),
  t.literal("address.streetAddress"),
  t.literal("address.streetSuffix"),
  t.literal("address.streetPrefix"),
  t.literal("address.secondaryAddress"),
  t.literal("address.county"),
  t.literal("address.country"),
  t.literal("address.countryCode"),
  t.literal("address.state"),
  t.literal("address.stateAbbr"),
  t.literal("address.latitude"),
  t.literal("address.longitude"),
  t.literal("commerce.color"),
  t.literal("commerce.department"),
  t.literal("commerce.productName"),
  t.literal("commerce.price"),
  t.literal("commerce.productAdjective"),
  t.literal("commerce.productMaterial"),
  t.literal("commerce.product"),
  t.literal("company.suffixes"),
  t.literal("company.companyName"),
  t.literal("company.companySuffix"),
  t.literal("company.catchPhrase"),
  t.literal("company.bs"),
  t.literal("company.catchPhraseAdjective"),
  t.literal("company.catchPhraseDescriptor"),
  t.literal("company.catchPhraseNoun"),
  t.literal("company.bsAdjective"),
  t.literal("company.bsBuzz"),
  t.literal("company.bsNoun"),
  t.literal("database.column"),
  t.literal("database.type"),
  t.literal("database.collation"),
  t.literal("database.engine"),
  t.literal("date.past"),
  t.literal("date.future"),
  t.literal("date.between"),
  t.literal("date.recent"),
  t.literal("date.soon"),
  t.literal("date.month"),
  t.literal("date.weekday"),
  t.literal("finance.account"),
  t.literal("finance.accountName"),
  t.literal("finance.mask"),
  t.literal("finance.amount"),
  t.literal("finance.transactionType"),
  t.literal("finance.currencyCode"),
  t.literal("finance.currencyName"),
  t.literal("finance.currencySymbol"),
  t.literal("finance.bitcoinAddress"),
  t.literal("finance.ethereumAddress"),
  t.literal("finance.iban"),
  t.literal("finance.bic"),
  t.literal("hacker.abbreviation"),
  t.literal("hacker.adjective"),
  t.literal("hacker.noun"),
  t.literal("hacker.verb"),
  t.literal("hacker.ingverb"),
  t.literal("hacker.phrase"),
  t.literal("helpers.randomize"),
  t.literal("helpers.slugify"),
  t.literal("helpers.replaceSymbolWithNumber"),
  t.literal("helpers.replaceSymbols"),
  t.literal("helpers.shuffle"),
  t.literal("helpers.mustache"),
  t.literal("helpers.createCard"),
  t.literal("helpers.contextualCard"),
  t.literal("helpers.userCard"),
  t.literal("helpers.createTransaction"),
  t.literal("image.image"),
  t.literal("image.avatar"),
  t.literal("image.imageUrl"),
  t.literal("image.abstract"),
  t.literal("image.animals"),
  t.literal("image.business"),
  t.literal("image.cats"),
  t.literal("image.city"),
  t.literal("image.food"),
  t.literal("image.nightlife"),
  t.literal("image.fashion"),
  t.literal("image.people"),
  t.literal("image.nature"),
  t.literal("image.sports"),
  t.literal("image.technics"),
  t.literal("image.transport"),
  t.literal("image.dataUri"),
  t.literal("internet.avatar"),
  t.literal("internet.email"),
  t.literal("internet.exampleEmail"),
  t.literal("internet.userName"),
  t.literal("internet.protocol"),
  t.literal("internet.url"),
  t.literal("internet.domainName"),
  t.literal("internet.domainSuffix"),
  t.literal("internet.domainWord"),
  t.literal("internet.ip"),
  t.literal("internet.ipv6"),
  t.literal("internet.userAgent"),
  t.literal("internet.color"),
  t.literal("internet.mac"),
  t.literal("internet.password"),
  t.literal("lorem.word"),
  t.literal("lorem.words"),
  t.literal("lorem.sentence"),
  t.literal("lorem.slug"),
  t.literal("lorem.sentences"),
  t.literal("lorem.paragraph"),
  t.literal("lorem.paragraphs"),
  t.literal("lorem.text"),
  t.literal("lorem.lines"),
  t.literal("name.firstName"),
  t.literal("name.lastName"),
  t.literal("name.findName"),
  t.literal("name.jobTitle"),
  t.literal("name.prefix"),
  t.literal("name.suffix"),
  t.literal("name.title"),
  t.literal("name.jobDescriptor"),
  t.literal("name.jobArea"),
  t.literal("name.jobType"),
  t.literal("phone.phoneNumber"),
  t.literal("phone.phoneNumberFormat"),
  t.literal("phone.phoneFormats"),
  t.literal("random.number"),
  t.literal("random.float"),
  t.literal("random.arrayElement"),
  t.literal("random.objectElement"),
  t.literal("random.uuid"),
  t.literal("random.boolean"),
  t.literal("random.word"),
  t.literal("random.words"),
  t.literal("random.image"),
  t.literal("random.locale"),
  t.literal("random.alphaNumeric"),
  t.literal("random.hexaDecimal"),
  t.literal("system.fileName"),
  t.literal("system.commonFileName"),
  t.literal("system.mimeType"),
  t.literal("system.commonFileType"),
  t.literal("system.commonFileExt"),
  t.literal("system.fileType"),
  t.literal("system.fileExt"),
  t.literal("system.directoryPath"),
  t.literal("system.filePath"),
  t.literal("system.semver")
]);
export const JSSTSimpleString = t.intersection([
  JSSTProtoString,
  t.partial({
    faker: JSSTFaker
  })
]);
export const JSSTRegex = t.intersection([
  JSSTProtoString,
  t.type({
    pattern: t.string
  })
]);
export const JSSTStringEnum = t.intersection([
  JSSTProtoString,
  t.type({
    enum: t.array(t.string)
  })
]);
export const JSSTString = t.union([
  JSSTSimpleString,
  JSSTRegex,
  JSSTStringEnum
]);
export const JSSTProtoArray = t.type({
  type: t.literal("array")
});
export const JSSTArray = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.union([JSSTList(c), JSSTTuple(c)]);
export const JSSTArray_ = JSSTArray(JSSTEmpty);
export const JSSTTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.partial({
    $schema: t.string,
    $id: t.string,
    definitions: t.record(t.string, JSSTAnything(c))
  });
export const JSSTTopLevel_ = JSSTTopLevel(JSSTEmpty);
export const JSSTEmptyTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTEmpty, JSSTTopLevel(c)]);
export const JSSTEmptyTopLevel_ = JSSTEmptyTopLevel(JSSTEmpty);
export const JSSTConstTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTConst, JSSTTopLevel(c)]);
export const JSSTConstTopLevel_ = JSSTConstTopLevel(JSSTEmpty);
export const JSSTReferenceTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTReference, JSSTTopLevel(c)]);
export const JSSTReferenceTopLevel_ = JSSTReferenceTopLevel(JSSTEmpty);
export const JSSTNullTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTNull, JSSTTopLevel(c)]);
export const JSSTNullTopLevel_ = JSSTNullTopLevel(JSSTEmpty);
export const JSSTBooleanTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTBoolean, JSSTTopLevel(c)]);
export const JSSTBooleanTopLevel_ = JSSTBooleanTopLevel(JSSTEmpty);
export const JSSTIntegerTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTInteger, JSSTTopLevel(c)]);
export const JSSTIntegerTopLevel_ = JSSTIntegerTopLevel(JSSTEmpty);
export const JSSTSimpleIntegerTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTSimpleInteger, JSSTTopLevel(c)]);
export const JSSTSimpleIntegerTopLevel_ = JSSTSimpleIntegerTopLevel(JSSTEmpty);
export const JSSTIntegerWithMinimumTopLevel = <T = JSSTEmpty>(
  c: t.Type<T, T>
) => t.intersection([JSSTIntegerWithMinimum, JSSTTopLevel(c)]);
export const JSSTIntegerWithMinimumTopLevelTopLevel_ = JSSTIntegerWithMinimumTopLevel(
  JSSTEmpty
);
export const JSSTIntegerWithMaximumTopLevel = <T = JSSTEmpty>(
  c: t.Type<T, T>
) => t.intersection([JSSTIntegerWithMaximum, JSSTTopLevel(c)]);
export const JSSTIntegerWithMaximumTopLevel_ = JSSTIntegerWithMaximumTopLevel(
  JSSTEmpty
);
export const JSSTIntegerWithBoundsTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTIntegerWithBounds, JSSTTopLevel(c)]);
export const JSSTIntegerWithBoundsTopLevel_ = JSSTIntegerWithBoundsTopLevel(
  JSSTEmpty
);
export const JSSTIntegerWithNumericExclusiveMinimumTopLevel = <T = JSSTEmpty>(
  c: t.Type<T, T>
) => t.intersection([JSSTIntegerWithNumericExclusiveMinimum, JSSTTopLevel(c)]);
export const JSSTIntegerWithNumericExclusiveMinimumTopLevel_ = JSSTIntegerWithNumericExclusiveMinimumTopLevel(
  JSSTEmpty
);
export const JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel = <
  T = JSSTEmpty
>(
  c: t.Type<T, T>
) =>
  t.intersection([
    JSSTIntegerWithNumericExclusiveMinimumAndMaximum,
    JSSTTopLevel(c)
  ]);
export const JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel_ = JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel(
  JSSTEmpty
);
export const JSSTIntegerWithNumericExclusiveMaximumTopLevel = <T = JSSTEmpty>(
  c: t.Type<T, T>
) => t.intersection([JSSTIntegerWithNumericExclusiveMaximum, JSSTTopLevel(c)]);
export const JSSTIntegerWithNumericExclusiveMaximumTopLevel_ = JSSTIntegerWithNumericExclusiveMaximumTopLevel(
  JSSTEmpty
);
export const JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel = <
  T = JSSTEmpty
>(
  c: t.Type<T, T>
) =>
  t.intersection([
    JSSTIntegerWithNumericExclusiveMaximumAndMinimum,
    JSSTTopLevel(c)
  ]);
export const JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel_ = JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel(
  JSSTEmpty
);
export const JSSTIntegerWithNumericExclusiveBoundsTopLevel = <T = JSSTEmpty>(
  c: t.Type<T, T>
) => t.intersection([JSSTIntegerWithNumericExclusiveBounds, JSSTTopLevel(c)]);
export const JSSTIntegerWithNumericExclusiveBoundsTopLevel_ = JSSTIntegerWithNumericExclusiveBoundsTopLevel(
  JSSTEmpty
);
export const JSSTIntegerEnumTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTIntegerEnum, JSSTTopLevel(c)]);
export const JSSTIntegerEnumTopLevel_ = JSSTIntegerEnumTopLevel(JSSTEmpty);
export const JSSTNumberTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTNumber, JSSTTopLevel(c)]);
export const JSSTNumberTopLevel_ = JSSTNumberTopLevel(JSSTEmpty);
export const JSSTSimpleNumberTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTSimpleNumber, JSSTTopLevel(c)]);
export const JSSTSimpleNumberTopLevel_ = JSSTSimpleNumberTopLevel(JSSTEmpty);
export const JSSTNumberEnumTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTNumberEnum, JSSTTopLevel(c)]);
export const JSSTNumberEnumTopLevel_ = JSSTNumberEnumTopLevel(JSSTEmpty);
export const JSSTAnyOfTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTAnyOf(c), JSSTTopLevel(c)]);
export const JSSTAnyOfTopLevel_ = JSSTAnyOfTopLevel(JSSTEmpty);
export const JSSTAllOfTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTAllOf(c), JSSTTopLevel(c)]);
export const JSSTAllOfTopLevel_ = JSSTAllOfTopLevel(JSSTEmpty);
export const JSSTNotTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTNot(c), JSSTTopLevel(c)]);
export const JSSTNotTopLevel_ = JSSTNotTopLevel(JSSTEmpty);
export const JSSTOneOfTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTOneOf(c), JSSTTopLevel(c)]);
export const JSSTOneOfTopLevel_ = JSSTOneOfTopLevel(JSSTEmpty);
export const JSSTStringTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTString, JSSTTopLevel(c)]);
export const JSSTStringTopLevel_ = JSSTStringTopLevel(JSSTEmpty);
export const JSSTSimpleStringTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTSimpleString, JSSTTopLevel(c)]);
export const JSSTSimpleStringTopLevel_ = JSSTSimpleStringTopLevel(JSSTEmpty);
export const JSSTRegexTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTRegex, JSSTTopLevel(c)]);
export const JSSTRegexTopLevel_ = JSSTRegexTopLevel(JSSTEmpty);
export const JSSTStringEnumTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTStringEnum, JSSTTopLevel(c)]);
export const JSSTStringEnumTopLevel_ = JSSTStringEnumTopLevel(JSSTEmpty);
export const JSSTArrayTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTArray(c), JSSTTopLevel(c)]);
export const JSSTArrayTopLevel_ = JSSTArrayTopLevel(JSSTEmpty);
export const JSSTListTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTList(c), JSSTTopLevel(c)]);
export const JSSTListTopLevel_ = JSSTListTopLevel(JSSTEmpty);
export const JSSTTupleTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTTuple(c), JSSTTopLevel(c)]);
export const JSSTTupleTopLevel_ = JSSTTupleTopLevel(JSSTEmpty);
export const JSSTObjectTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([JSSTObject(c), JSSTTopLevel(c)]);
export const JSSTObjectTopLevel_ = JSSTObjectTopLevel(JSSTEmpty);
export const JSSTGenericTopLevel = <T = JSSTEmpty>(c: t.Type<T, T>) =>
  t.intersection([c, JSSTTopLevel(c)]);
export const JSSTGenericTopLevel_ = JSSTGenericTopLevel(JSSTEmpty);
export const JSONSchemaObject = <T = JSSTEmpty>(
  c: t.Type<T, T>
): t.Type<JSONSchemaObject<T>> =>
  t.recursion("JSONSchemaObject", () =>
    t.union([
      JSSTEmptyTopLevel(c),
      JSSTConstTopLevel(c),
      JSSTReferenceTopLevel(c),
      JSSTNullTopLevel(c),
      JSSTBooleanTopLevel(c),
      JSSTIntegerTopLevel(c),
      JSSTSimpleIntegerTopLevel(c),
      JSSTIntegerWithMinimumTopLevel(c),
      JSSTIntegerWithMaximumTopLevel(c),
      JSSTIntegerWithBoundsTopLevel(c),
      JSSTIntegerWithNumericExclusiveMinimumTopLevel(c),
      JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel(c),
      JSSTIntegerWithNumericExclusiveMaximumTopLevel(c),
      JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel(c),
      JSSTIntegerWithNumericExclusiveBoundsTopLevel(c),
      JSSTIntegerEnumTopLevel(c),
      JSSTNumberTopLevel(c),
      JSSTSimpleNumberTopLevel(c),
      JSSTNumberEnumTopLevel(c),
      JSSTAnyOfTopLevel(c),
      JSSTAllOfTopLevel(c),
      JSSTNotTopLevel(c),
      JSSTOneOfTopLevel(c),
      JSSTStringTopLevel(c),
      JSSTSimpleStringTopLevel(c),
      JSSTRegexTopLevel(c),
      JSSTStringEnumTopLevel(c),
      JSSTArrayTopLevel(c),
      JSSTListTopLevel(c),
      JSSTTupleTopLevel(c),
      JSSTObjectTopLevel(c),
      JSSTGenericTopLevel(c)
    ])
  );

export type JSSTList<T = JSSTEmpty> = JSSTProtoArray & {
  items: JSSTAnything<T>;
  uniqueItems?: boolean;
  minItems?: number;
  maxItems?: number;
};
type JSSTListOutput<T = JSSTEmpty> = JSSTProtoArray & {
  items: JSSTAnythingOutput<T>;
  uniqueItems?: boolean;
  minItems?: number;
  maxItems?: number;
};
export type JSSTAnything<T = JSSTEmpty> =
  | JSSTEmpty
  | t.TypeOf<typeof JSSTConst>
  | t.TypeOf<typeof JSSTReference>
  | t.TypeOf<typeof JSSTNull>
  | t.TypeOf<typeof JSSTBoolean>
  | t.TypeOf<typeof JSSTInteger>
  | t.TypeOf<typeof JSSTNumber>
  | t.TypeOf<typeof JSSTString>
  | JSSTArray<T>
  | JSSTObject<T>
  | JSSTOneOf<T>
  | JSSTAnyOf<T>
  | JSSTAllOf<T>
  | JSSTNot<T>
  | T;
type JSSTAnythingOutput<T = JSSTEmpty> =
  | JSSTEmpty
  | t.OutputOf<typeof JSSTConst>
  | t.OutputOf<typeof JSSTReference>
  | t.OutputOf<typeof JSSTNull>
  | t.OutputOf<typeof JSSTBoolean>
  | t.OutputOf<typeof JSSTInteger>
  | t.OutputOf<typeof JSSTNumber>
  | t.OutputOf<typeof JSSTString>
  | JSSTArrayOutput<T>
  | JSSTObjectOutput<T>
  | JSSTOneOfOutput<T>
  | JSSTAnyOfOutput<T>
  | JSSTAllOfOutput<T>
  | JSSTNotOutput<T>
  | T;
export type JSSTTuple<T = JSSTEmpty> = JSSTProtoArray & {
  items: Array<JSSTAnything<T>>;
};
type JSSTTupleOutput<T = JSSTEmpty> = JSSTProtoArray & {
  items: Array<JSSTAnythingOutput<T>>;
};
export interface JSSTObject<T = JSSTEmpty> {
  type: "object";
  required?: Array<string>;
  dependencies?: Record<string, Array<string>>;
  additionalProperties?: boolean | JSSTAnything<T>;
  patternProperties?: Record<string, JSSTAnything<T>>;
  properties?: Record<string, JSSTAnything<T>>;
}
interface JSSTObjectOutput<T = JSSTEmpty> {
  type: "object";
  required?: Array<string>;
  dependencies?: Record<string, Array<string>>;
  additionalProperties?: boolean | JSSTAnythingOutput<T>;
  patternProperties?: Record<string, JSSTAnythingOutput<T>>;
  properties?: Record<string, JSSTAnythingOutput<T>>;
}
export interface JSSTOneOf<T = JSSTEmpty> {
  oneOf: Array<JSSTAnything<T>>;
}
interface JSSTOneOfOutput<T = JSSTEmpty> {
  oneOf: Array<JSSTAnythingOutput<T>>;
}
export interface JSSTAnyOf<T = JSSTEmpty> {
  anyOf: Array<JSSTAnything<T>>;
}
interface JSSTAnyOfOutput<T = JSSTEmpty> {
  anyOf: Array<JSSTAnythingOutput<T>>;
}
export interface JSSTAllOf<T = JSSTEmpty> {
  allOf: Array<JSSTAnything<T>>;
}
interface JSSTAllOfOutput<T = JSSTEmpty> {
  allOf: Array<JSSTAnythingOutput<T>>;
}
export interface JSSTNot<T = JSSTEmpty> {
  not: JSSTAnything<T>;
}
interface JSSTNotOutput<T = JSSTEmpty> {
  not: JSSTAnythingOutput<T>;
}
export interface JSSTEmpty {
  [k: string]: never;
  [z: number]: never;
}

export type JSONPrimitive = number | boolean | string | null;
export type JSONValue = JSONPrimitive | JSONArray | JSONObject;
export type JSONObject = {
  [k: string]: JSONValue;
};
export interface JSONArray extends Array<JSONValue> {}

export interface JSSTConst {
  const: JSONValue;
}
export interface JSSTReference {
  $ref: string;
}
export interface JSSTNull {
  type: "null";
}
export interface JSSTBoolean {
  type: "boolean";
}
export interface JSSTProtoInteger {
  type: "integer";
}
export type JSSTSimpleInteger = t.TypeOf<typeof JSSTProtoInteger> & {
  multipleOf?: number;
};
export type JSSTIntegerWithMinimum = t.TypeOf<typeof JSSTSimpleInteger> & {
  minimum: number;
  exclusiveMinimum?: boolean;
};
export type JSSTIntegerWithMaximum = t.TypeOf<typeof JSSTSimpleInteger> & {
  maximum: number;
  exclusiveMaximum?: boolean;
};
export type JSSTIntegerWithBounds = t.TypeOf<typeof JSSTSimpleInteger> & {
  minimum: number;
  maximum: number;
  exclusiveMinimum?: boolean;
  exclusiveMaximum?: boolean;
};
export type JSSTIntegerWithNumericExclusiveMinimum = t.TypeOf<
  typeof JSSTSimpleInteger
> & {
  exclusiveMinimum: number;
};
export type JSSTIntegerWithNumericExclusiveMinimumAndMaximum = t.TypeOf<
  typeof JSSTSimpleInteger
> & {
  exclusiveMinimum: number;
  maximum: number;
  exclusiveMaximum?: boolean;
};
export type JSSTIntegerWithNumericExclusiveMaximum = t.TypeOf<
  typeof JSSTSimpleInteger
> & {
  exclusiveMaximum: number;
};
export type JSSTIntegerWithNumericExclusiveMaximumAndMinimum = t.TypeOf<
  typeof JSSTSimpleInteger
> & {
  exclusiveMaximum: number;
  minimum: number;
  exclusiveMinimum?: boolean;
};
export type JSSTIntegerWithNumericExclusiveBounds = t.TypeOf<
  typeof JSSTSimpleInteger
> & {
  exclusiveMinimum: number;
  exclusiveMaximum: number;
};
export type JSSTIntegerEnum = t.TypeOf<typeof JSSTProtoInteger> & {
  enum: Array<number>;
};
export type JSSTInteger =
  | t.TypeOf<typeof JSSTSimpleInteger>
  | t.TypeOf<typeof JSSTIntegerWithMinimum>
  | t.TypeOf<typeof JSSTIntegerWithMaximum>
  | t.TypeOf<typeof JSSTIntegerWithBounds>
  | t.TypeOf<typeof JSSTIntegerWithNumericExclusiveMinimum>
  | t.TypeOf<typeof JSSTIntegerWithNumericExclusiveMinimumAndMaximum>
  | t.TypeOf<typeof JSSTIntegerWithNumericExclusiveMaximum>
  | t.TypeOf<typeof JSSTIntegerWithNumericExclusiveMaximumAndMinimum>
  | t.TypeOf<typeof JSSTIntegerWithNumericExclusiveBounds>
  | t.TypeOf<typeof JSSTIntegerEnum>;
export interface JSSTProtoNumber {
  type: "number";
}
export type JSSTSimpleNumber = t.TypeOf<typeof JSSTProtoNumber> & {
  minimum?: number;
  maximum?: number;
  multipleOf?: number;
};
export type JSSTNumberEnum = t.TypeOf<typeof JSSTProtoNumber> & {
  enum: Array<number>;
};
export type JSSTNumber =
  | t.TypeOf<typeof JSSTSimpleNumber>
  | t.TypeOf<typeof JSSTNumberEnum>;
export interface JSSTProtoString {
  type: "string";
}
export type JSSTFaker =
  | "address.zipCode"
  | "address.city"
  | "address.cityPrefix"
  | "address.citySuffix"
  | "address.streetName"
  | "address.streetAddress"
  | "address.streetSuffix"
  | "address.streetPrefix"
  | "address.secondaryAddress"
  | "address.county"
  | "address.country"
  | "address.countryCode"
  | "address.state"
  | "address.stateAbbr"
  | "address.latitude"
  | "address.longitude"
  | "commerce.color"
  | "commerce.department"
  | "commerce.productName"
  | "commerce.price"
  | "commerce.productAdjective"
  | "commerce.productMaterial"
  | "commerce.product"
  | "company.suffixes"
  | "company.companyName"
  | "company.companySuffix"
  | "company.catchPhrase"
  | "company.bs"
  | "company.catchPhraseAdjective"
  | "company.catchPhraseDescriptor"
  | "company.catchPhraseNoun"
  | "company.bsAdjective"
  | "company.bsBuzz"
  | "company.bsNoun"
  | "database.column"
  | "database.type"
  | "database.collation"
  | "database.engine"
  | "date.past"
  | "date.future"
  | "date.between"
  | "date.recent"
  | "date.soon"
  | "date.month"
  | "date.weekday"
  | "finance.account"
  | "finance.accountName"
  | "finance.mask"
  | "finance.amount"
  | "finance.transactionType"
  | "finance.currencyCode"
  | "finance.currencyName"
  | "finance.currencySymbol"
  | "finance.bitcoinAddress"
  | "finance.ethereumAddress"
  | "finance.iban"
  | "finance.bic"
  | "hacker.abbreviation"
  | "hacker.adjective"
  | "hacker.noun"
  | "hacker.verb"
  | "hacker.ingverb"
  | "hacker.phrase"
  | "helpers.randomize"
  | "helpers.slugify"
  | "helpers.replaceSymbolWithNumber"
  | "helpers.replaceSymbols"
  | "helpers.shuffle"
  | "helpers.mustache"
  | "helpers.createCard"
  | "helpers.contextualCard"
  | "helpers.userCard"
  | "helpers.createTransaction"
  | "image.image"
  | "image.avatar"
  | "image.imageUrl"
  | "image.abstract"
  | "image.animals"
  | "image.business"
  | "image.cats"
  | "image.city"
  | "image.food"
  | "image.nightlife"
  | "image.fashion"
  | "image.people"
  | "image.nature"
  | "image.sports"
  | "image.technics"
  | "image.transport"
  | "image.dataUri"
  | "internet.avatar"
  | "internet.email"
  | "internet.exampleEmail"
  | "internet.userName"
  | "internet.protocol"
  | "internet.url"
  | "internet.domainName"
  | "internet.domainSuffix"
  | "internet.domainWord"
  | "internet.ip"
  | "internet.ipv6"
  | "internet.userAgent"
  | "internet.color"
  | "internet.mac"
  | "internet.password"
  | "lorem.word"
  | "lorem.words"
  | "lorem.sentence"
  | "lorem.slug"
  | "lorem.sentences"
  | "lorem.paragraph"
  | "lorem.paragraphs"
  | "lorem.text"
  | "lorem.lines"
  | "name.firstName"
  | "name.lastName"
  | "name.findName"
  | "name.jobTitle"
  | "name.prefix"
  | "name.suffix"
  | "name.title"
  | "name.jobDescriptor"
  | "name.jobArea"
  | "name.jobType"
  | "phone.phoneNumber"
  | "phone.phoneNumberFormat"
  | "phone.phoneFormats"
  | "random.number"
  | "random.float"
  | "random.arrayElement"
  | "random.objectElement"
  | "random.uuid"
  | "random.boolean"
  | "random.word"
  | "random.words"
  | "random.image"
  | "random.locale"
  | "random.alphaNumeric"
  | "random.hexaDecimal"
  | "system.fileName"
  | "system.commonFileName"
  | "system.mimeType"
  | "system.commonFileType"
  | "system.commonFileExt"
  | "system.fileType"
  | "system.fileExt"
  | "system.directoryPath"
  | "system.filePath"
  | "system.semver";
export type JSSTSimpleString = t.TypeOf<typeof JSSTProtoString> & {
  faker?: JSSTFaker;
};
export type JSSTRegex = t.TypeOf<typeof JSSTProtoString> & {
  pattern: string;
};
export type JSSTStringEnum = t.TypeOf<typeof JSSTProtoString> & {
  enum: Array<string>;
};
export type JSSTString =
  | t.TypeOf<typeof JSSTSimpleString>
  | t.TypeOf<typeof JSSTRegex>
  | t.TypeOf<typeof JSSTStringEnum>;
export interface JSSTProtoArray {
  type: "array";
}
export type JSSTArray<T = JSSTEmpty> = JSSTList<T> | JSSTTuple<T>;
export type JSSTArrayOutput<T = JSSTEmpty> =
  | JSSTListOutput<T>
  | JSSTTupleOutput<T>;
export interface JSSTTopLevel<T = JSSTEmpty> {
  $schema?: string;
  $id?: string;
  definitions?: Record<string, JSSTAnything<T>>;
}
export type JSSTEmptyTopLevel<T = JSSTEmpty> = JSSTEmpty & JSSTTopLevel<T>;
export type JSSTConstTopLevel<T = JSSTEmpty> = t.TypeOf<typeof JSSTConst> &
  JSSTTopLevel<T>;
export type JSSTReferenceTopLevel<T = JSSTEmpty> = t.TypeOf<
  typeof JSSTReference
> &
  JSSTTopLevel<T>;
export type JSSTNullTopLevel<T = JSSTEmpty> = t.TypeOf<typeof JSSTNull> &
  JSSTTopLevel<T>;
export type JSSTBooleanTopLevel<T = JSSTEmpty> = t.TypeOf<typeof JSSTBoolean> &
  JSSTTopLevel<T>;
export type JSSTIntegerTopLevel<T = JSSTEmpty> = t.TypeOf<typeof JSSTInteger> &
  JSSTTopLevel<T>;
export type JSSTSimpleIntegerTopLevel<T = JSSTEmpty> = t.TypeOf<
  typeof JSSTSimpleInteger
> &
  JSSTTopLevel<T>;
export type JSSTIntegerWithMinimumTopLevel<T = JSSTEmpty> = t.TypeOf<
  typeof JSSTIntegerWithMinimum
> &
  JSSTTopLevel<T>;
export type JSSTIntegerWithMaximumTopLevel<T = JSSTEmpty> = t.TypeOf<
  typeof JSSTIntegerWithMaximum
> &
  JSSTTopLevel<T>;
export type JSSTIntegerWithBoundsTopLevel<T = JSSTEmpty> = t.TypeOf<
  typeof JSSTIntegerWithBounds
> &
  JSSTTopLevel<T>;
export type JSSTIntegerWithNumericExclusiveMinimumTopLevel<
  T = JSSTEmpty
> = t.TypeOf<typeof JSSTIntegerWithNumericExclusiveMinimum> & JSSTTopLevel<T>;
export type JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel<
  T = JSSTEmpty
> = t.TypeOf<typeof JSSTIntegerWithNumericExclusiveMinimumAndMaximum> &
  JSSTTopLevel<T>;
export type JSSTIntegerWithNumericExclusiveMaximumTopLevel<
  T = JSSTEmpty
> = t.TypeOf<typeof JSSTIntegerWithNumericExclusiveMaximum> & JSSTTopLevel<T>;
export type JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel<
  T = JSSTEmpty
> = t.TypeOf<typeof JSSTIntegerWithNumericExclusiveMaximumAndMinimum> &
  JSSTTopLevel<T>;
export type JSSTIntegerWithNumericExclusiveBoundsTopLevel<
  T = JSSTEmpty
> = t.TypeOf<typeof JSSTIntegerWithNumericExclusiveBounds> & JSSTTopLevel<T>;
export type JSSTIntegerEnumTopLevel<T = JSSTEmpty> = t.TypeOf<
  typeof JSSTIntegerEnum
> &
  JSSTTopLevel<T>;
export type JSSTNumberTopLevel<T = JSSTEmpty> = t.TypeOf<typeof JSSTNumber> &
  JSSTTopLevel<T>;
export type JSSTSimpleNumberTopLevel<T = JSSTEmpty> = t.TypeOf<
  typeof JSSTSimpleNumber
> &
  JSSTTopLevel<T>;
export type JSSTNumberEnumTopLevel<T = JSSTEmpty> = t.TypeOf<
  typeof JSSTNumberEnum
> &
  JSSTTopLevel<T>;
export type JSSTAnyOfTopLevel<T = JSSTEmpty> = JSSTAnyOf<T> & JSSTTopLevel<T>;
export type JSSTAllOfTopLevel<T = JSSTEmpty> = JSSTAllOf<T> & JSSTTopLevel<T>;
export type JSSTNotTopLevel<T = JSSTEmpty> = JSSTNot<T> & JSSTTopLevel<T>;
export type JSSTOneOfTopLevel<T = JSSTEmpty> = JSSTOneOf<T> & JSSTTopLevel<T>;
export type JSSTStringTopLevel<T = JSSTEmpty> = t.TypeOf<typeof JSSTString> &
  JSSTTopLevel<T>;
export type JSSTSimpleStringTopLevel<T = JSSTEmpty> = t.TypeOf<
  typeof JSSTSimpleString
> &
  JSSTTopLevel<T>;
export type JSSTRegexTopLevel<T = JSSTEmpty> = t.TypeOf<typeof JSSTRegex> &
  JSSTTopLevel<T>;
export type JSSTStringEnumTopLevel<T = JSSTEmpty> = t.TypeOf<
  typeof JSSTStringEnum
> &
  JSSTTopLevel<T>;
export type JSSTArrayTopLevel<T = JSSTEmpty> = JSSTArray<T> & JSSTTopLevel<T>;
export type JSSTListTopLevel<T = JSSTEmpty> = JSSTList<T> & JSSTTopLevel<T>;
export type JSSTTupleTopLevel<T = JSSTEmpty> = JSSTTuple<T> & JSSTTopLevel<T>;
export type JSSTObjectTopLevel<T = JSSTEmpty> = JSSTObject<T> & JSSTTopLevel<T>;
export type JSSTGenericTopLevel<T = JSSTEmpty> = T & JSSTTopLevel<T>;
export type JSONSchemaObject<T> =
  | JSSTEmptyTopLevel<T>
  | JSSTConstTopLevel<T>
  | JSSTReferenceTopLevel<T>
  | JSSTNullTopLevel<T>
  | JSSTBooleanTopLevel<T>
  | JSSTIntegerTopLevel<T>
  | JSSTSimpleIntegerTopLevel<T>
  | JSSTIntegerWithMinimumTopLevel<T>
  | JSSTIntegerWithMaximumTopLevel<T>
  | JSSTIntegerWithBoundsTopLevel<T>
  | JSSTIntegerWithNumericExclusiveMinimumTopLevel<T>
  | JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel<T>
  | JSSTIntegerWithNumericExclusiveMaximumTopLevel<T>
  | JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel<T>
  | JSSTIntegerWithNumericExclusiveBoundsTopLevel<T>
  | JSSTIntegerEnumTopLevel<T>
  | JSSTNumberTopLevel<T>
  | JSSTSimpleNumberTopLevel<T>
  | JSSTNumberEnumTopLevel<T>
  | JSSTAnyOfTopLevel<T>
  | JSSTAllOfTopLevel<T>
  | JSSTNotTopLevel<T>
  | JSSTOneOfTopLevel<T>
  | JSSTStringTopLevel<T>
  | JSSTSimpleStringTopLevel<T>
  | JSSTRegexTopLevel<T>
  | JSSTStringEnumTopLevel<T>
  | JSSTArrayTopLevel<T>
  | JSSTListTopLevel<T>
  | JSSTTupleTopLevel<T>
  | JSSTObjectTopLevel<T>
  | JSSTGenericTopLevel<T>;
