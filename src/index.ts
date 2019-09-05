import * as t from "io-ts";
const _J = <U>(input: unknown, u: t.Type<U, U>): input is JSSTEmpty<U> =>
  typeof input === "object" &&
  !Object.getPrototypeOf(input) &&
  Object.getOwnPropertyNames(<object>input).length === 0 &&
  u.is(input);
export const JSSTEmpty = <U = any>(u: t.Type<U, U>) =>
  t.intersection([
    new t.Type<JSSTEmpty<U>, JSSTEmpty<U>, unknown>(
      "JSSTEmpty",
      (input: unknown): input is JSSTEmpty<U> => _J(input, u),
      (input, context) =>
        _J(input, u) ? t.success(input) : t.failure(input, context),
      t.identity
    ),
    u
  ]);
const JSSTEmpty_ = JSSTEmpty(t.any);

export const JSSTList = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTList<T, U>, JSSTListOutput<T, U>> =>
  t.recursion("JSSTList", () =>
    t.intersection([
      JSSTProtoArray,
      t.intersection([
        t.type({
          items: JSSTAnything(c, u)
        }),
        t.partial({
          uniqueItems: t.boolean,
          minItems: t.number,
          maxItems: t.number
        })
      ]),
      u
    ])
  );
export const JSSTList_ = JSSTList(JSSTEmpty_, t.any);
export const JSSTAnything = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTAnything<T, U>, JSSTAnythingOutput<T, U>> =>
  t.recursion("JSSTAnything", () =>
    t.union([
      JSSTEmpty(u),
      JSSTConst(u),
      JSSTReference(u),
      JSSTNull(u),
      JSSTBoolean(u),
      JSSTInteger(u),
      JSSTNumber(u),
      JSSTString(u),
      JSSTArray(c, u),
      JSSTObject(c, u),
      JSSTOneOf(c, u),
      JSSTAnyOf(c, u),
      JSSTAllOf(c, u),
      JSSTNot(c, u),
      c
    ])
  );
export const JSSTTuple = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTTuple<T, U>, JSSTTupleOutput<T, U>> =>
  t.recursion("JSSTTuple", () =>
    t.intersection([
      JSSTProtoArray,
      t.type({
        items: t.array(JSSTAnything(c, u))
      }),
      u
    ])
  );
export const JSSTTuple_ = JSSTTuple(JSSTEmpty_, t.any);
export const JSSTObject = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTObject<T, U>, JSSTObjectOutput<T, U>> =>
  t.recursion("JSSTObject", () =>
    t.intersection([
      t.type({
        type: t.literal("object")
      }),
      t.partial({
        required: t.array(t.string),
        dependencies: t.record(t.string, t.array(t.string)),
        additionalProperties: t.union([t.boolean, JSSTAnything(c, u)]),
        patternProperties: t.record(t.string, JSSTAnything(c, u)),
        properties: t.record(t.string, JSSTAnything(c, u))
      }),
      u
    ])
  );
export const JSSTObject_ = JSSTObject(JSSTEmpty_, t.any);
export const JSSTOneOf = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTOneOf<T, U>, JSSTOneOfOutput<T, U>> =>
  t.recursion("JSSTOneOf", () =>
    t.intersection([
      t.type({
        oneOf: t.array(JSSTAnything(c, u))
      }),
      u
    ])
  );
export const JSSTOneOf_ = JSSTOneOf(JSSTEmpty_, t.any);
export const JSSTAnyOf = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTAnyOf<T, U>, JSSTAnyOfOutput<T, U>> =>
  t.recursion("JSSTAnyOf", () =>
    t.intersection([
      t.type({
        anyOf: t.array(JSSTAnything(c, u))
      }),
      u
    ])
  );
export const JSSTAnyOf_ = JSSTAnyOf(JSSTEmpty_, t.any);
export const JSSTAllOf = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTAllOf<T, U>, JSSTAllOfOutput<T, U>> =>
  t.recursion("JSSTAllOf", () =>
    t.intersection([
      t.type({
        allOf: t.array(JSSTAnything(c, u))
      }),
      u
    ])
  );
export const JSSTAllOf_ = JSSTAllOf(JSSTEmpty_, t.any);
export const JSSTNot = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTNot<T, U>, JSSTNotOutput<T, U>> =>
  t.recursion("JSSTNot", () =>
    t.intersection([
      t.type({
        not: JSSTAnything(c, u)
      }),
      u
    ])
  );
export const JSSTNot_ = JSSTNot(JSSTEmpty_, t.any);

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

export const JSSTConst = <U>(
  u: t.Type<U, U>
): t.Type<JSSTConst<U>, JSSTConst<U>> =>
  t.recursion("JSSTConst", () =>
    t.intersection([t.type({ const: JSONValue }), u])
  );
export const JSSTReference = <U>(u: t.Type<U, U>) =>
  t.intersection([
    t.type({
      $ref: t.string
    }),
    u
  ]);
export const JSSTNull = <U>(u: t.Type<U, U>) =>
  t.intersection([
    t.type({
      type: t.literal("null")
    }),
    u
  ]);
export const JSSTBoolean = <U>(u: t.Type<U, U>) =>
  t.intersection([
    t.type({
      type: t.literal("boolean")
    }),
    u
  ]);
export const JSSTProtoInteger = <U>(u: t.Type<U, U>) =>
  t.intersection([
    t.type({
      type: t.literal("integer")
    }),
    u
  ]);
export const JSSTSimpleInteger = <U>(u: t.Type<U, U>) =>
  t.intersection([
    JSSTProtoInteger(u),
    t.partial({
      multipleOf: t.number
    })
  ]);
export const JSSTIntegerWithMinimum = <U>(u: t.Type<U, U>) =>
  t.intersection([
    JSSTSimpleInteger(u),
    t.intersection([
      t.type({
        minimum: t.number
      }),
      t.partial({
        exclusiveMinimum: t.boolean
      })
    ])
  ]);
export const JSSTIntegerWithMaximum = <U>(u: t.Type<U, U>) =>
  t.intersection([
    JSSTSimpleInteger(u),
    t.intersection([
      t.type({
        maximum: t.number
      }),
      t.partial({
        exclusiveMaximum: t.boolean
      })
    ])
  ]);
export const JSSTIntegerWithBounds = <U>(u: t.Type<U, U>) =>
  t.intersection([
    JSSTSimpleInteger(u),
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
export const JSSTIntegerWithNumericExclusiveMinimum = <U>(u: t.Type<U, U>) =>
  t.intersection([
    JSSTSimpleInteger(u),
    t.type({
      exclusiveMinimum: t.number
    })
  ]);
export const JSSTIntegerWithNumericExclusiveMinimumAndMaximum = <U>(
  u: t.Type<U, U>
) =>
  t.intersection([
    JSSTSimpleInteger(u),
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
export const JSSTIntegerWithNumericExclusiveMaximum = <U>(u: t.Type<U, U>) =>
  t.intersection([
    JSSTSimpleInteger(u),
    t.type({
      exclusiveMaximum: t.number
    })
  ]);
export const JSSTIntegerWithNumericExclusiveMaximumAndMinimum = <U>(
  u: t.Type<U, U>
) =>
  t.intersection([
    JSSTSimpleInteger(u),
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
export const JSSTIntegerWithNumericExclusiveBounds = <U>(u: t.Type<U, U>) =>
  t.intersection([
    JSSTSimpleInteger(u),
    t.type({
      exclusiveMinimum: t.number,
      exclusiveMaximum: t.number
    })
  ]);
export const JSSTIntegerEnum = <U>(u: t.Type<U, U>) =>
  t.intersection([
    JSSTProtoInteger(u),
    t.type({
      enum: t.array(t.number)
    })
  ]);
export const JSSTInteger = <U>(u: t.Type<U, U>) =>
  t.union([
    JSSTSimpleInteger(u),
    JSSTIntegerWithMinimum(u),
    JSSTIntegerWithMaximum(u),
    JSSTIntegerWithBounds(u),
    JSSTIntegerWithNumericExclusiveMinimum(u),
    JSSTIntegerWithNumericExclusiveMinimumAndMaximum(u),
    JSSTIntegerWithNumericExclusiveMaximum(u),
    JSSTIntegerWithNumericExclusiveMaximumAndMinimum(u),
    JSSTIntegerWithNumericExclusiveBounds(u),
    JSSTIntegerEnum(u)
  ]);
export const JSSTProtoNumber = <U>(u: t.Type<U, U>) =>
  t.intersection([
    t.type({
      type: t.literal("number")
    }),
    u
  ]);
export const JSSTSimpleNumber = <U>(u: t.Type<U, U>) =>
  t.intersection([
    JSSTProtoNumber(u),
    t.partial({
      minimum: t.number,
      maximum: t.number,
      multipleOf: t.number
    })
  ]);
export const JSSTNumberEnum = <U>(u: t.Type<U, U>) =>
  t.intersection([
    JSSTProtoNumber(u),
    t.type({
      enum: t.array(t.number)
    })
  ]);
export const JSSTNumber = <U>(u: t.Type<U, U>) =>
  t.union([JSSTSimpleNumber(u), JSSTNumberEnum(u)]);
export const JSSTProtoString = <U>(u: t.Type<U, U>) =>
  t.intersection([
    t.type({
      type: t.literal("string")
    }),
    u
  ]);
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
export const JSSTSimpleString = <U>(u: t.Type<U, U>) =>
  t.intersection([
    JSSTProtoString(u),
    t.partial({
      faker: JSSTFaker
    })
  ]);
export const JSSTRegex = <U>(u: t.Type<U, U>) =>
  t.intersection([
    JSSTProtoString(u),
    t.type({
      pattern: t.string
    })
  ]);
export const JSSTStringEnum = <U>(u: t.Type<U, U>) =>
  t.intersection([
    JSSTProtoString(u),
    t.type({
      enum: t.array(t.string)
    })
  ]);
export const JSSTString = <U>(u: t.Type<U, U>) =>
  t.union([JSSTSimpleString(u), JSSTRegex(u), JSSTStringEnum(u)]);
export const JSSTProtoArray = t.type({
  type: t.literal("array")
});
export const JSSTArray = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.union([JSSTList(c, u), JSSTTuple(c, u)]);
export const JSSTArray_ = JSSTArray(JSSTEmpty_, t.any);
export const JSSTTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) =>
  t.partial({
    $schema: t.string,
    $id: t.string,
    definitions: t.record(t.string, JSSTAnything(c, u))
  });
export const JSSTTopLevel_ = JSSTTopLevel(JSSTEmpty_, t.any);
export const JSSTEmptyTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTEmpty(u), JSSTTopLevel(c, u)]);
export const JSSTEmptyTopLevel_ = JSSTEmptyTopLevel(JSSTEmpty_, t.any);
export const JSSTConstTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTConst(u), JSSTTopLevel(c, u)]);
export const JSSTConstTopLevel_ = JSSTConstTopLevel(JSSTEmpty_, t.any);
export const JSSTReferenceTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTReference(u), JSSTTopLevel(c, u)]);
export const JSSTReferenceTopLevel_ = JSSTReferenceTopLevel(JSSTEmpty_, t.any);
export const JSSTNullTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTNull(u), JSSTTopLevel(c, u)]);
export const JSSTNullTopLevel_ = JSSTNullTopLevel(JSSTEmpty_, t.any);
export const JSSTBooleanTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTBoolean(u), JSSTTopLevel(c, u)]);
export const JSSTBooleanTopLevel_ = JSSTBooleanTopLevel(JSSTEmpty_, t.any);
export const JSSTIntegerTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTInteger(u), JSSTTopLevel(c, u)]);
export const JSSTIntegerTopLevel_ = JSSTIntegerTopLevel(JSSTEmpty_, t.any);
export const JSSTSimpleIntegerTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTSimpleInteger(u), JSSTTopLevel(c, u)]);
export const JSSTSimpleIntegerTopLevel_ = JSSTSimpleIntegerTopLevel(
  JSSTEmpty_,
  t.any
);
export const JSSTIntegerWithMinimumTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTIntegerWithMinimum(u), JSSTTopLevel(c, u)]);
export const JSSTIntegerWithMinimumTopLevelTopLevel_ = JSSTIntegerWithMinimumTopLevel(
  JSSTEmpty_,
  t.any
);
export const JSSTIntegerWithMaximumTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTIntegerWithMaximum(u), JSSTTopLevel(c, u)]);
export const JSSTIntegerWithMaximumTopLevel_ = JSSTIntegerWithMaximumTopLevel(
  JSSTEmpty_,
  t.any
);
export const JSSTIntegerWithBoundsTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTIntegerWithBounds(u), JSSTTopLevel(c, u)]);
export const JSSTIntegerWithBoundsTopLevel_ = JSSTIntegerWithBoundsTopLevel(
  JSSTEmpty_,
  t.any
);
export const JSSTIntegerWithNumericExclusiveMinimumTopLevel = <
  T = JSSTEmpty<any>,
  U = any
>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) =>
  t.intersection([
    JSSTIntegerWithNumericExclusiveMinimum(u),
    JSSTTopLevel(c, u)
  ]);
export const JSSTIntegerWithNumericExclusiveMinimumTopLevel_ = JSSTIntegerWithNumericExclusiveMinimumTopLevel(
  JSSTEmpty_,
  t.any
);
export const JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel = <
  T = JSSTEmpty<any>,
  U = any
>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) =>
  t.intersection([
    JSSTIntegerWithNumericExclusiveMinimumAndMaximum(u),
    JSSTTopLevel(c, u)
  ]);
export const JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel_ = JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel(
  JSSTEmpty_,
  t.any
);
export const JSSTIntegerWithNumericExclusiveMaximumTopLevel = <
  T = JSSTEmpty<any>,
  U = any
>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) =>
  t.intersection([
    JSSTIntegerWithNumericExclusiveMaximum(u),
    JSSTTopLevel(c, u)
  ]);
export const JSSTIntegerWithNumericExclusiveMaximumTopLevel_ = JSSTIntegerWithNumericExclusiveMaximumTopLevel(
  JSSTEmpty_,
  t.any
);
export const JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel = <
  T = JSSTEmpty<any>,
  U = any
>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) =>
  t.intersection([
    JSSTIntegerWithNumericExclusiveMaximumAndMinimum(u),
    JSSTTopLevel(c, u)
  ]);
export const JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel_ = JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel(
  JSSTEmpty_,
  t.any
);
export const JSSTIntegerWithNumericExclusiveBoundsTopLevel = <
  T = JSSTEmpty<any>,
  U = any
>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) =>
  t.intersection([
    JSSTIntegerWithNumericExclusiveBounds(u),
    JSSTTopLevel(c, u)
  ]);
export const JSSTIntegerWithNumericExclusiveBoundsTopLevel_ = JSSTIntegerWithNumericExclusiveBoundsTopLevel(
  JSSTEmpty_,
  t.any
);
export const JSSTIntegerEnumTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTIntegerEnum(u), JSSTTopLevel(c, u)]);
export const JSSTIntegerEnumTopLevel_ = JSSTIntegerEnumTopLevel(
  JSSTEmpty_,
  t.any
);
export const JSSTNumberTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTNumber(u), JSSTTopLevel(c, u)]);
export const JSSTNumberTopLevel_ = JSSTNumberTopLevel(JSSTEmpty_, t.any);
export const JSSTSimpleNumberTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTSimpleNumber(u), JSSTTopLevel(c, u)]);
export const JSSTSimpleNumberTopLevel_ = JSSTSimpleNumberTopLevel(
  JSSTEmpty_,
  t.any
);
export const JSSTNumberEnumTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTNumberEnum(u), JSSTTopLevel(c, u)]);
export const JSSTNumberEnumTopLevel_ = JSSTNumberEnumTopLevel(
  JSSTEmpty_,
  t.any
);
export const JSSTAnyOfTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTAnyOf(c, u), JSSTTopLevel(c, u)]);
export const JSSTAnyOfTopLevel_ = JSSTAnyOfTopLevel(JSSTEmpty_, t.any);
export const JSSTAllOfTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTAllOf(c, u), JSSTTopLevel(c, u)]);
export const JSSTAllOfTopLevel_ = JSSTAllOfTopLevel(JSSTEmpty_, t.any);
export const JSSTNotTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTNot(c, u), JSSTTopLevel(c, u)]);
export const JSSTNotTopLevel_ = JSSTNotTopLevel(JSSTEmpty_, t.any);
export const JSSTOneOfTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTOneOf(c, u), JSSTTopLevel(c, u)]);
export const JSSTOneOfTopLevel_ = JSSTOneOfTopLevel(JSSTEmpty_, t.any);
export const JSSTStringTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTString(u), JSSTTopLevel(c, u)]);
export const JSSTStringTopLevel_ = JSSTStringTopLevel(JSSTEmpty_, t.any);
export const JSSTSimpleStringTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTSimpleString(u), JSSTTopLevel(c, u)]);
export const JSSTSimpleStringTopLevel_ = JSSTSimpleStringTopLevel(
  JSSTEmpty_,
  t.any
);
export const JSSTRegexTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTRegex(u), JSSTTopLevel(c, u)]);
export const JSSTRegexTopLevel_ = JSSTRegexTopLevel(JSSTEmpty_, t.any);
export const JSSTStringEnumTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTStringEnum(u), JSSTTopLevel(c, u)]);
export const JSSTStringEnumTopLevel_ = JSSTStringEnumTopLevel(
  JSSTEmpty_,
  t.any
);
export const JSSTArrayTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTArray(c, u), JSSTTopLevel(c, u)]);
export const JSSTArrayTopLevel_ = JSSTArrayTopLevel(JSSTEmpty_, t.any);
export const JSSTListTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTList(c, u), JSSTTopLevel(c, u)]);
export const JSSTListTopLevel_ = JSSTListTopLevel(JSSTEmpty_, t.any);
export const JSSTTupleTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTTuple(c, u), JSSTTopLevel(c, u)]);
export const JSSTTupleTopLevel_ = JSSTTupleTopLevel(JSSTEmpty_, t.any);
export const JSSTObjectTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([JSSTObject(c, u), JSSTTopLevel(c, u)]);
export const JSSTObjectTopLevel_ = JSSTObjectTopLevel(JSSTEmpty_, t.any);
export const JSSTGenericTopLevel = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
) => t.intersection([c, JSSTTopLevel(c, u)]);
export const JSSTGenericTopLevel_ = JSSTGenericTopLevel(JSSTEmpty_, t.any);
export const JSONSchemaObject = <T = JSSTEmpty<any>, U = any>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSONSchemaObject<T, U>> =>
  t.recursion("JSONSchemaObject", () =>
    t.union([
      JSSTEmptyTopLevel(c, u),
      JSSTConstTopLevel(c, u),
      JSSTReferenceTopLevel(c, u),
      JSSTNullTopLevel(c, u),
      JSSTBooleanTopLevel(c, u),
      JSSTIntegerTopLevel(c, u),
      JSSTSimpleIntegerTopLevel(c, u),
      JSSTIntegerWithMinimumTopLevel(c, u),
      JSSTIntegerWithMaximumTopLevel(c, u),
      JSSTIntegerWithBoundsTopLevel(c, u),
      JSSTIntegerWithNumericExclusiveMinimumTopLevel(c, u),
      JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel(c, u),
      JSSTIntegerWithNumericExclusiveMaximumTopLevel(c, u),
      JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel(c, u),
      JSSTIntegerWithNumericExclusiveBoundsTopLevel(c, u),
      JSSTIntegerEnumTopLevel(c, u),
      JSSTNumberTopLevel(c, u),
      JSSTSimpleNumberTopLevel(c, u),
      JSSTNumberEnumTopLevel(c, u),
      JSSTAnyOfTopLevel(c, u),
      JSSTAllOfTopLevel(c, u),
      JSSTNotTopLevel(c, u),
      JSSTOneOfTopLevel(c, u),
      JSSTStringTopLevel(c, u),
      JSSTSimpleStringTopLevel(c, u),
      JSSTRegexTopLevel(c, u),
      JSSTStringEnumTopLevel(c, u),
      JSSTArrayTopLevel(c, u),
      JSSTListTopLevel(c, u),
      JSSTTupleTopLevel(c, u),
      JSSTObjectTopLevel(c, u),
      JSSTGenericTopLevel(c, u)
    ])
  );

export type JSSTList<T = JSSTEmpty<any>, U = any> = JSSTProtoArray & {
  items: JSSTAnything<T, U>;
  uniqueItems?: boolean;
  minItems?: number;
  maxItems?: number;
} & U;
type JSSTListOutput<T = JSSTEmpty<any>, U = any> = JSSTProtoArray & {
  items: JSSTAnythingOutput<T, U>;
  uniqueItems?: boolean;
  minItems?: number;
  maxItems?: number;
};
export type JSSTAnything<T = JSSTEmpty<any>, U = any> =
  | JSSTEmpty<U>
  | JSSTConst<U>
  | JSSTReference<U>
  | JSSTNull<U>
  | JSSTBoolean<U>
  | JSSTInteger<U>
  | JSSTNumber<U>
  | JSSTString<U>
  | JSSTArray<T, U>
  | JSSTObject<T, U>
  | JSSTOneOf<T, U>
  | JSSTAnyOf<T, U>
  | JSSTAllOf<T, U>
  | JSSTNot<T, U>
  | T;
type JSSTAnythingOutput<T = JSSTEmpty<any>, U = any> =
  | JSSTEmpty<U>
  | JSSTConst<U>
  | JSSTReference<U>
  | JSSTNull<U>
  | JSSTBoolean<U>
  | JSSTInteger<U>
  | JSSTNumber<U>
  | JSSTString<U>
  | JSSTArrayOutput<T, U>
  | JSSTObjectOutput<T, U>
  | JSSTOneOfOutput<T, U>
  | JSSTAnyOfOutput<T, U>
  | JSSTAllOfOutput<T, U>
  | JSSTNotOutput<T, U>
  | T;
export type JSSTTuple<T = JSSTEmpty<any>, U = any> = JSSTProtoArray & {
  items: Array<JSSTAnything<T, U>>;
} & U;
type JSSTTupleOutput<T = JSSTEmpty<any>, U = any> = JSSTProtoArray & {
  items: Array<JSSTAnythingOutput<T, U>>;
} & U;
export type JSSTObject<T = JSSTEmpty<any>, U = any> = {
  type: "object";
  required?: Array<string>;
  dependencies?: Record<string, Array<string>>;
  additionalProperties?: boolean | JSSTAnything<T, U>;
  patternProperties?: Record<string, JSSTAnything<T, U>>;
  properties?: Record<string, JSSTAnything<T, U>>;
} & U;
type JSSTObjectOutput<T = JSSTEmpty<any>, U = any> = {
  type: "object";
  required?: Array<string>;
  dependencies?: Record<string, Array<string>>;
  additionalProperties?: boolean | JSSTAnythingOutput<T, U>;
  patternProperties?: Record<string, JSSTAnythingOutput<T, U>>;
  properties?: Record<string, JSSTAnythingOutput<T, U>>;
} & U;
export type JSSTOneOf<T = JSSTEmpty<any>, U = any> = {
  oneOf: Array<JSSTAnything<T, U>>;
} & U;
type JSSTOneOfOutput<T = JSSTEmpty<any>, U = any> = {
  oneOf: Array<JSSTAnythingOutput<T, U>>;
} & U;
export type JSSTAnyOf<T = JSSTEmpty<any>, U = any> = {
  anyOf: Array<JSSTAnything<T, U>>;
} & U;
type JSSTAnyOfOutput<T = JSSTEmpty<any>, U = any> = {
  anyOf: Array<JSSTAnythingOutput<T, U>>;
} & U;
export type JSSTAllOf<T = JSSTEmpty<any>, U = any> = {
  allOf: Array<JSSTAnything<T, U>>;
} & U;
type JSSTAllOfOutput<T = JSSTEmpty<any>, U = any> = {
  allOf: Array<JSSTAnythingOutput<T, U>>;
} & U;
export type JSSTNot<T = JSSTEmpty<any>, U = any> = {
  not: JSSTAnything<T, U>;
} & U;
type JSSTNotOutput<T = JSSTEmpty<any>, U = any> = {
  not: JSSTAnythingOutput<T, U>;
} & U;
export type JSSTEmpty<U> = {
  [k: string]: never;
  [z: number]: never;
} & U;

export type JSONPrimitive = number | boolean | string | null;
export type JSONValue = JSONPrimitive | JSONArray | JSONObject;
export type JSONObject = {
  [k: string]: JSONValue;
};
export interface JSONArray extends Array<JSONValue> {}

export type JSSTConst<U> = {
  const: JSONValue;
} & U;
export type JSSTReference<U> = {
  $ref: string;
} & U;
export type JSSTNull<U> = {
  type: "null";
} & U;
export type JSSTBoolean<U> = {
  type: "boolean";
} & U;
export type JSSTProtoInteger<U> = {
  type: "integer";
} & U;
export type JSSTSimpleInteger<U> = JSSTProtoInteger<U> & {
  multipleOf?: number;
};
export type JSSTIntegerWithMinimum<U> = JSSTSimpleInteger<U> & {
  minimum: number;
  exclusiveMinimum?: boolean;
};
export type JSSTIntegerWithMaximum<U> = JSSTSimpleInteger<U> & {
  maximum: number;
  exclusiveMaximum?: boolean;
};
export type JSSTIntegerWithBounds<U> = JSSTSimpleInteger<U> & {
  minimum: number;
  maximum: number;
  exclusiveMinimum?: boolean;
  exclusiveMaximum?: boolean;
};
export type JSSTIntegerWithNumericExclusiveMinimum<U> = JSSTSimpleInteger<U> & {
  exclusiveMinimum: number;
};
export type JSSTIntegerWithNumericExclusiveMinimumAndMaximum<
  U
> = JSSTSimpleInteger<U> & {
  exclusiveMinimum: number;
  maximum: number;
  exclusiveMaximum?: boolean;
};
export type JSSTIntegerWithNumericExclusiveMaximum<U> = JSSTSimpleInteger<U> & {
  exclusiveMaximum: number;
};
export type JSSTIntegerWithNumericExclusiveMaximumAndMinimum<
  U
> = JSSTSimpleInteger<U> & {
  exclusiveMaximum: number;
  minimum: number;
  exclusiveMinimum?: boolean;
};
export type JSSTIntegerWithNumericExclusiveBounds<U> = JSSTSimpleInteger<U> & {
  exclusiveMinimum: number;
  exclusiveMaximum: number;
};
export type JSSTIntegerEnum<U> = JSSTProtoInteger<U> & {
  enum: Array<number>;
};
export type JSSTInteger<U> =
  | JSSTSimpleInteger<U>
  | JSSTIntegerWithMinimum<U>
  | JSSTIntegerWithMaximum<U>
  | JSSTIntegerWithBounds<U>
  | JSSTIntegerWithNumericExclusiveMinimum<U>
  | JSSTIntegerWithNumericExclusiveMinimumAndMaximum<U>
  | JSSTIntegerWithNumericExclusiveMaximum<U>
  | JSSTIntegerWithNumericExclusiveMaximumAndMinimum<U>
  | JSSTIntegerWithNumericExclusiveBounds<U>
  | JSSTIntegerEnum<U>;
export type JSSTProtoNumber<U> = {
  type: "number";
} & U;
export type JSSTSimpleNumber<U> = JSSTProtoNumber<U> & {
  minimum?: number;
  maximum?: number;
  multipleOf?: number;
};
export type JSSTNumberEnum<U> = JSSTProtoNumber<U> & {
  enum: Array<number>;
};
export type JSSTNumber<U> = JSSTSimpleNumber<U> | JSSTNumberEnum<U>;
export type JSSTProtoString<U> = {
  type: "string";
} & U;
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
export type JSSTSimpleString<U> = JSSTProtoString<U> & {
  faker?: JSSTFaker;
};
export type JSSTRegex<U> = JSSTProtoString<U> & {
  pattern: string;
};
export type JSSTStringEnum<U> = JSSTProtoString<U> & {
  enum: Array<string>;
};
export type JSSTString<U> =
  | JSSTSimpleString<U>
  | JSSTRegex<U>
  | JSSTStringEnum<U>;
export interface JSSTProtoArray {
  type: "array";
}
export type JSSTArray<T = JSSTEmpty<any>, U = any> =
  | JSSTList<T, U>
  | JSSTTuple<T, U>;
export type JSSTArrayOutput<T = JSSTEmpty<any>, U = any> =
  | JSSTListOutput<T, U>
  | JSSTTupleOutput<T, U>;
export interface JSSTTopLevel<T = JSSTEmpty<any>, U = any> {
  $schema?: string;
  $id?: string;
  definitions?: Record<string, JSSTAnything<T, U>>;
}
export type JSSTEmptyTopLevel<T = JSSTEmpty<any>, U = any> = JSSTEmpty<U> &
  JSSTTopLevel<T, U>;
export type JSSTConstTopLevel<T = JSSTEmpty<any>, U = any> = JSSTConst<U> &
  JSSTTopLevel<T, U>;
export type JSSTReferenceTopLevel<T = JSSTEmpty<any>, U = any> = JSSTReference<
  U
> &
  JSSTTopLevel<T, U>;
export type JSSTNullTopLevel<T = JSSTEmpty<any>, U = any> = JSSTNull<U> &
  JSSTTopLevel<T, U>;
export type JSSTBooleanTopLevel<T = JSSTEmpty<any>, U = any> = JSSTBoolean<U> &
  JSSTTopLevel<T, U>;
export type JSSTIntegerTopLevel<T = JSSTEmpty<any>, U = any> = JSSTInteger<U> &
  JSSTTopLevel<T, U>;
export type JSSTSimpleIntegerTopLevel<
  T = JSSTEmpty<any>,
  U = any
> = JSSTSimpleInteger<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerWithMinimumTopLevel<
  T = JSSTEmpty<any>,
  U = any
> = JSSTIntegerWithMinimum<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerWithMaximumTopLevel<
  T = JSSTEmpty<any>,
  U = any
> = JSSTIntegerWithMaximum<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerWithBoundsTopLevel<
  T = JSSTEmpty<any>,
  U = any
> = JSSTIntegerWithBounds<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerWithNumericExclusiveMinimumTopLevel<
  T = JSSTEmpty<any>,
  U = any
> = JSSTIntegerWithNumericExclusiveMinimum<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel<
  T = JSSTEmpty<any>,
  U = any
> = JSSTIntegerWithNumericExclusiveMinimumAndMaximum<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerWithNumericExclusiveMaximumTopLevel<
  T = JSSTEmpty<any>,
  U = any
> = JSSTIntegerWithNumericExclusiveMaximum<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel<
  T = JSSTEmpty<any>,
  U = any
> = JSSTIntegerWithNumericExclusiveMaximumAndMinimum<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerWithNumericExclusiveBoundsTopLevel<
  T = JSSTEmpty<any>,
  U = any
> = JSSTIntegerWithNumericExclusiveBounds<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerEnumTopLevel<
  T = JSSTEmpty<any>,
  U = any
> = JSSTIntegerEnum<U> & JSSTTopLevel<T, U>;
export type JSSTNumberTopLevel<T = JSSTEmpty<any>, U = any> = JSSTNumber<U> &
  JSSTTopLevel<T, U>;
export type JSSTSimpleNumberTopLevel<
  T = JSSTEmpty<any>,
  U = any
> = JSSTSimpleNumber<U> & JSSTTopLevel<T, U>;
export type JSSTNumberEnumTopLevel<
  T = JSSTEmpty<any>,
  U = any
> = JSSTNumberEnum<U> & JSSTTopLevel<T, U>;
export type JSSTAnyOfTopLevel<T = JSSTEmpty<any>, U = any> = JSSTAnyOf<T, U> &
  JSSTTopLevel<T, U>;
export type JSSTAllOfTopLevel<T = JSSTEmpty<any>, U = any> = JSSTAllOf<T, U> &
  JSSTTopLevel<T, U>;
export type JSSTNotTopLevel<T = JSSTEmpty<any>, U = any> = JSSTNot<T, U> &
  JSSTTopLevel<T, U>;
export type JSSTOneOfTopLevel<T = JSSTEmpty<any>, U = any> = JSSTOneOf<T, U> &
  JSSTTopLevel<T, U>;
export type JSSTStringTopLevel<T = JSSTEmpty<any>, U = any> = JSSTString<U> &
  JSSTTopLevel<T, U>;
export type JSSTSimpleStringTopLevel<
  T = JSSTEmpty<any>,
  U = any
> = JSSTSimpleString<U> & JSSTTopLevel<T, U>;
export type JSSTRegexTopLevel<T = JSSTEmpty<any>, U = any> = JSSTRegex<U> &
  JSSTTopLevel<T, U>;
export type JSSTStringEnumTopLevel<
  T = JSSTEmpty<any>,
  U = any
> = JSSTStringEnum<U> & JSSTTopLevel<T, U>;
export type JSSTArrayTopLevel<T = JSSTEmpty<any>, U = any> = JSSTArray<T, U> &
  JSSTTopLevel<T, U>;
export type JSSTListTopLevel<T = JSSTEmpty<any>, U = any> = JSSTList<T, U> &
  JSSTTopLevel<T, U>;
export type JSSTTupleTopLevel<T = JSSTEmpty<any>, U = any> = JSSTTuple<T, U> &
  JSSTTopLevel<T, U>;
export type JSSTObjectTopLevel<T = JSSTEmpty<any>, U = any> = JSSTObject<T, U> &
  JSSTTopLevel<T, U>;
export type JSSTGenericTopLevel<T = JSSTEmpty<any>, U = any> = T &
  JSSTTopLevel<T, U>;
export type JSONSchemaObject<T, U> =
  | JSSTEmptyTopLevel<T, U>
  | JSSTConstTopLevel<T, U>
  | JSSTReferenceTopLevel<T, U>
  | JSSTNullTopLevel<T, U>
  | JSSTBooleanTopLevel<T, U>
  | JSSTIntegerTopLevel<T, U>
  | JSSTSimpleIntegerTopLevel<T, U>
  | JSSTIntegerWithMinimumTopLevel<T, U>
  | JSSTIntegerWithMaximumTopLevel<T, U>
  | JSSTIntegerWithBoundsTopLevel<T, U>
  | JSSTIntegerWithNumericExclusiveMinimumTopLevel<T, U>
  | JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel<T, U>
  | JSSTIntegerWithNumericExclusiveMaximumTopLevel<T, U>
  | JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel<T, U>
  | JSSTIntegerWithNumericExclusiveBoundsTopLevel<T, U>
  | JSSTIntegerEnumTopLevel<T, U>
  | JSSTNumberTopLevel<T, U>
  | JSSTSimpleNumberTopLevel<T, U>
  | JSSTNumberEnumTopLevel<T, U>
  | JSSTAnyOfTopLevel<T, U>
  | JSSTAllOfTopLevel<T, U>
  | JSSTNotTopLevel<T, U>
  | JSSTOneOfTopLevel<T, U>
  | JSSTStringTopLevel<T, U>
  | JSSTSimpleStringTopLevel<T, U>
  | JSSTRegexTopLevel<T, U>
  | JSSTStringEnumTopLevel<T, U>
  | JSSTArrayTopLevel<T, U>
  | JSSTListTopLevel<T, U>
  | JSSTTupleTopLevel<T, U>
  | JSSTObjectTopLevel<T, U>
  | JSSTGenericTopLevel<T, U>;
