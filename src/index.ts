import * as t from "io-ts";
const _J = <U extends object>(
  input: unknown,
  u: t.Type<U, U>
): input is JSSTEmpty<U> =>
  typeof input === "object" &&
  !Object.getPrototypeOf(input) &&
  Object.getOwnPropertyNames(<object>input).length === 0 &&
  u.is(input);
export const JSSTEmpty = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTEmpty<U>, JSSTEmpty<U>> =>
  //t.intersection([
    new t.Type<JSSTEmpty<U>, JSSTEmpty<U>, unknown>(
      "JSSTEmpty",
      (input: unknown): input is JSSTEmpty<U> => _J(input, u),
      (input, context) =>
        _J(input, u) ? t.success(input) : t.failure(input, context),
      t.identity
    )//,
    //u
  //]);
export const JSSTEmpty_ = JSSTEmpty(t.type({}));

export const JSSTList = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTList<T, U>, JSSTList<T, U>> =>
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
export const JSSTList_ = JSSTList(JSSTEmpty_, t.type({}));
export const JSSTAnything = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTAnything<T, U>, JSSTAnything<T, U>> =>
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
export const JSSTTuple = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTTuple<T, U>, JSSTTuple<T, U>> =>
  t.recursion("JSSTTuple", () =>
    t.intersection([
      JSSTProtoArray,
      t.type({
        items: t.array(JSSTAnything(c, u))
      }),
      u
    ])
  );
export const JSSTTuple_ = JSSTTuple(JSSTEmpty_, t.type({}));
export const JSSTObject = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTObject<T, U>, JSSTObject<T, U>> =>
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
export const JSSTObject_ = JSSTObject(JSSTEmpty_, t.type({}));
export const JSSTOneOf = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTOneOf<T, U>, JSSTOneOf<T, U>> =>
  t.recursion("JSSTOneOf", () =>
    t.intersection([
      t.type({
        oneOf: t.array(JSSTAnything(c, u))
      }),
      u
    ])
  );
export const JSSTOneOf_ = JSSTOneOf(JSSTEmpty_, t.type({}));
export const JSSTAnyOf = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTAnyOf<T, U>, JSSTAnyOf<T, U>> =>
  t.recursion("JSSTAnyOf", () =>
    t.intersection([
      t.type({
        anyOf: t.array(JSSTAnything(c, u))
      }),
      u
    ])
  );
export const JSSTAnyOf_ = JSSTAnyOf(JSSTEmpty_, t.type({}));
export const JSSTAllOf = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTAllOf<T, U>, JSSTAllOf<T, U>> =>
  t.recursion("JSSTAllOf", () =>
    t.intersection([
      t.type({
        allOf: t.array(JSSTAnything(c, u))
      }),
      u
    ])
  );
export const JSSTAllOf_ = JSSTAllOf(JSSTEmpty_, t.type({}));
export const JSSTNot = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTNot<T, U>, JSSTNot<T, U>> =>
  t.recursion("JSSTNot", () =>
    t.intersection([
      t.type({
        not: JSSTAnything(c, u)
      }),
      u
    ])
  );
export const JSSTNot_ = JSSTNot(JSSTEmpty_, t.type({}));

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

export const JSSTConst = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTConst<U>, JSSTConst<U>> =>
  t.recursion("JSSTConst", () =>
    t.intersection([t.type({ const: JSONValue }), u])
  );
export const JSSTConst_ = JSSTConst(t.type({}));
export const JSSTReference = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTReference<U>, JSSTReference<U>> =>
  t.intersection([
    t.type({
      $ref: t.string
    }),
    u
  ]);
export const JSSTReference_ = JSSTReference(t.type({}));
export const JSSTNull = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTNull<U>, JSSTNull<U>> =>
  t.intersection([
    t.type({
      type: t.literal("null")
    }),
    u
  ]);
export const JSSTNull_ = JSSTNull(t.type({}));
export const JSSTBoolean = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTBoolean<U>, JSSTBoolean<U>> =>
  t.intersection([
    t.type({
      type: t.literal("boolean")
    }),
    u
  ]);
export const JSSTBoolean_ = JSSTBoolean(t.type({}));
export const JSSTProtoInteger = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTProtoInteger<U>, JSSTProtoInteger<U>> =>
  t.intersection([
    t.type({
      type: t.literal("integer")
    }),
    u
  ]);
export const JSSTSimpleInteger = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTSimpleInteger<U>, JSSTSimpleInteger<U>> =>
  t.intersection([
    JSSTProtoInteger(u),
    t.partial({
      multipleOf: t.number
    })
  ]);
export const JSSTSimpleInteger_ = JSSTSimpleInteger(t.type({}));
export const JSSTIntegerWithMinimum = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTIntegerWithMinimum<U>, JSSTIntegerWithMinimum<U>> =>
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
export const JSSTIntegerWithMinimum_ = JSSTIntegerWithMinimum(t.type({}));
export const JSSTIntegerWithMaximum = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTIntegerWithMaximum<U>, JSSTIntegerWithMaximum<U>> =>
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
export const JSSTIntegerWithMaximum_ = JSSTIntegerWithMaximum(t.type({}));
export const JSSTIntegerWithBounds = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTIntegerWithBounds<U>, JSSTIntegerWithBounds<U>> =>
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
export const JSSTIntegerWithBounds_ = JSSTIntegerWithBounds(t.type({}));
export const JSSTIntegerWithNumericExclusiveMinimum = <U extends object>(
  u: t.Type<U, U>
): t.Type<
  JSSTIntegerWithNumericExclusiveMinimum<U>,
  JSSTIntegerWithNumericExclusiveMinimum<U>
> =>
  t.intersection([
    JSSTSimpleInteger(u),
    t.type({
      exclusiveMinimum: t.number
    })
  ]);
export const JSSTIntegerWithNumericExclusiveMinimum_ = JSSTIntegerWithNumericExclusiveMinimum(
  t.type({})
);
export const JSSTIntegerWithNumericExclusiveMinimumAndMaximum = <
  U extends object
>(
  u: t.Type<U, U>
): t.Type<
  JSSTIntegerWithNumericExclusiveMinimumAndMaximum<U>,
  JSSTIntegerWithNumericExclusiveMinimumAndMaximum<U>
> =>
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
export const JSSTIntegerWithNumericExclusiveMinimumAndMaximum_ = JSSTIntegerWithNumericExclusiveMinimumAndMaximum(
  t.type({})
);
export const JSSTIntegerWithNumericExclusiveMaximum = <U extends object>(
  u: t.Type<U, U>
): t.Type<
  JSSTIntegerWithNumericExclusiveMaximum<U>,
  JSSTIntegerWithNumericExclusiveMaximum<U>
> =>
  t.intersection([
    JSSTSimpleInteger(u),
    t.type({
      exclusiveMaximum: t.number
    })
  ]);
export const JSSTIntegerWithNumericExclusiveMaximum_ = JSSTIntegerWithNumericExclusiveMaximum(
  t.type({})
);
export const JSSTIntegerWithNumericExclusiveMaximumAndMinimum = <
  U extends object
>(
  u: t.Type<U, U>
): t.Type<
  JSSTIntegerWithNumericExclusiveMaximumAndMinimum<U>,
  JSSTIntegerWithNumericExclusiveMaximumAndMinimum<U>
> =>
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
export const JSSTIntegerWithNumericExclusiveMaximumAndMinimum_ = JSSTIntegerWithNumericExclusiveMaximumAndMinimum(
  t.type({})
);
export const JSSTIntegerWithNumericExclusiveBounds = <U extends object>(
  u: t.Type<U, U>
): t.Type<
  JSSTIntegerWithNumericExclusiveBounds<U>,
  JSSTIntegerWithNumericExclusiveBounds<U>
> =>
  t.intersection([
    JSSTSimpleInteger(u),
    t.type({
      exclusiveMinimum: t.number,
      exclusiveMaximum: t.number
    })
  ]);
export const JSSTIntegerWithNumericExclusiveBounds_ = JSSTIntegerWithNumericExclusiveBounds(
  t.type({})
);
export const JSSTIntegerEnum = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTIntegerEnum<U>, JSSTIntegerEnum<U>> =>
  t.intersection([
    JSSTProtoInteger(u),
    t.type({
      enum: t.array(t.number)
    })
  ]);
export const JSSTIntegerEnum_ = JSSTIntegerEnum(t.type({}));
export const JSSTInteger = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTInteger<U>, JSSTInteger<U>> =>
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
export const JSSTInteger_ = JSSTInteger(t.type({}));
export const JSSTProtoNumber = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTProtoNumber<U>, JSSTProtoNumber<U>> =>
  t.intersection([
    t.type({
      type: t.literal("number")
    }),
    u
  ]);
export const JSSTProtoNumber_ = JSSTProtoNumber(t.type({}));
export const JSSTSimpleNumber = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTSimpleNumber<U>, JSSTSimpleNumber<U>> =>
  t.intersection([
    JSSTProtoNumber(u),
    t.partial({
      minimum: t.number,
      maximum: t.number,
      multipleOf: t.number
    })
  ]);
export const JSSTSimpleNumber_ = JSSTSimpleNumber(t.type({}));
export const JSSTNumberEnum = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTNumberEnum<U>, JSSTNumberEnum<U>> =>
  t.intersection([
    JSSTProtoNumber(u),
    t.type({
      enum: t.array(t.number)
    })
  ]);
export const JSSTNumberEnum_ = JSSTNumberEnum(t.type({}));
export const JSSTNumber = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTNumber<U>, JSSTNumber<U>> =>
  t.union([JSSTSimpleNumber(u), JSSTNumberEnum(u)]);
export const JSSTNumber_ = JSSTNumber(t.type({}));
export const JSSTProtoString = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTProtoString<U>, JSSTProtoString<U>> =>
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
export const JSSTProtoString_ = JSSTProtoString(t.type({}));
export const JSSTSimpleString = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTSimpleString<U>, JSSTSimpleString<U>> =>
  t.intersection([
    JSSTProtoString(u),
    t.partial({
      faker: JSSTFaker
    })
  ]);
export const JSSTSimpleString_ = JSSTSimpleString(t.type({}));
export const JSSTRegex = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTRegex<U>, JSSTRegex<U>> =>
  t.intersection([
    JSSTProtoString(u),
    t.type({
      pattern: t.string
    })
  ]);
export const JSSTRegex_ = JSSTRegex(t.type({}));
export const JSSTStringEnum = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTStringEnum<U>, JSSTStringEnum<U>> =>
  t.intersection([
    JSSTProtoString(u),
    t.type({
      enum: t.array(t.string)
    })
  ]);
export const JSSTStringEnum_ = JSSTStringEnum(t.type({}));
export const JSSTString = <U extends object>(
  u: t.Type<U, U>
): t.Type<JSSTString<U>, JSSTString<U>> =>
  t.union([JSSTSimpleString(u), JSSTRegex(u), JSSTStringEnum(u)]);
export const JSSTString_ = JSSTString(t.type({}));
export const JSSTProtoArray = t.type({
  type: t.literal("array")
});
export const JSSTArray = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTArray<T, U>, JSSTArray<T, U>> =>
  t.union([JSSTList(c, u), JSSTTuple(c, u)]);
export const JSSTArray_ = JSSTArray(JSSTEmpty_, t.type({}));
export const JSSTTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTTopLevel<T, U>, JSSTTopLevel<T, U>> =>
  t.partial({
    $schema: t.string,
    $id: t.string,
    definitions: t.record(t.string, JSSTAnything(c, u))
  });
export const JSSTTopLevel_ = JSSTTopLevel(JSSTEmpty_, t.type({}));
export const JSSTEmptyTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTEmptyTopLevel<T, U>, JSSTEmptyTopLevel<T, U>> =>
  t.intersection([JSSTEmpty(u), JSSTTopLevel(c, u)]);
export const JSSTEmptyTopLevel_ = JSSTEmptyTopLevel(JSSTEmpty_, t.type({}));
export const JSSTConstTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTConstTopLevel<T, U>, JSSTConstTopLevel<T, U>> =>
  t.intersection([JSSTConst(u), JSSTTopLevel(c, u)]);
export const JSSTConstTopLevel_ = JSSTConstTopLevel(JSSTEmpty_, t.type({}));
export const JSSTReferenceTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTReferenceTopLevel<T, U>, JSSTReferenceTopLevel<T, U>> =>
  t.intersection([JSSTReference(u), JSSTTopLevel(c, u)]);
export const JSSTReferenceTopLevel_ = JSSTReferenceTopLevel(
  JSSTEmpty_,
  t.type({})
);
export const JSSTNullTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTNullTopLevel<T, U>, JSSTNullTopLevel<T, U>> =>
  t.intersection([JSSTNull(u), JSSTTopLevel(c, u)]);
export const JSSTNullTopLevel_ = JSSTNullTopLevel(JSSTEmpty_, t.type({}));
export const JSSTBooleanTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTBooleanTopLevel<T, U>, JSSTBooleanTopLevel<T, U>> =>
  t.intersection([JSSTBoolean(u), JSSTTopLevel(c, u)]);
export const JSSTBooleanTopLevel_ = JSSTBooleanTopLevel(JSSTEmpty_, t.type({}));
export const JSSTIntegerTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTIntegerTopLevel<T, U>, JSSTIntegerTopLevel<T, U>> =>
  t.intersection([JSSTInteger(u), JSSTTopLevel(c, u)]);
export const JSSTIntegerTopLevel_ = JSSTIntegerTopLevel(JSSTEmpty_, t.type({}));
export const JSSTSimpleIntegerTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTSimpleIntegerTopLevel<T, U>, JSSTSimpleIntegerTopLevel<T, U>> =>
  t.intersection([JSSTSimpleInteger(u), JSSTTopLevel(c, u)]);
export const JSSTSimpleIntegerTopLevel_ = JSSTSimpleIntegerTopLevel(
  JSSTEmpty_,
  t.type({})
);
export const JSSTIntegerWithMinimumTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<
  JSSTIntegerWithMinimumTopLevel<T, U>,
  JSSTIntegerWithMinimumTopLevel<T, U>
> => t.intersection([JSSTIntegerWithMinimum(u), JSSTTopLevel(c, u)]);
export const JSSTIntegerWithMinimumTopLevelTopLevel_ = JSSTIntegerWithMinimumTopLevel(
  JSSTEmpty_,
  t.type({})
);
export const JSSTIntegerWithMaximumTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<
  JSSTIntegerWithMaximumTopLevel<T, U>,
  JSSTIntegerWithMaximumTopLevel<T, U>
> => t.intersection([JSSTIntegerWithMaximum(u), JSSTTopLevel(c, u)]);
export const JSSTIntegerWithMaximumTopLevel_ = JSSTIntegerWithMaximumTopLevel(
  JSSTEmpty_,
  t.type({})
);
export const JSSTIntegerWithBoundsTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<
  JSSTIntegerWithBoundsTopLevel<T, U>,
  JSSTIntegerWithBoundsTopLevel<T, U>
> => t.intersection([JSSTIntegerWithBounds(u), JSSTTopLevel(c, u)]);
export const JSSTIntegerWithBoundsTopLevel_ = JSSTIntegerWithBoundsTopLevel(
  JSSTEmpty_,
  t.type({})
);
export const JSSTIntegerWithNumericExclusiveMinimumTopLevel = <
  T,
  U extends object
>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<
  JSSTIntegerWithNumericExclusiveMinimumTopLevel<T, U>,
  JSSTIntegerWithNumericExclusiveMinimumTopLevel<T, U>
> =>
  t.intersection([
    JSSTIntegerWithNumericExclusiveMinimum(u),
    JSSTTopLevel(c, u)
  ]);
export const JSSTIntegerWithNumericExclusiveMinimumTopLevel_ = JSSTIntegerWithNumericExclusiveMinimumTopLevel(
  JSSTEmpty_,
  t.type({})
);
export const JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel = <
  T,
  U extends object
>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<
  JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel<T, U>,
  JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel<T, U>
> =>
  t.intersection([
    JSSTIntegerWithNumericExclusiveMinimumAndMaximum(u),
    JSSTTopLevel(c, u)
  ]);
export const JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel_ = JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel(
  JSSTEmpty_,
  t.type({})
);
export const JSSTIntegerWithNumericExclusiveMaximumTopLevel = <
  T,
  U extends object
>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<
  JSSTIntegerWithNumericExclusiveMaximumTopLevel<T, U>,
  JSSTIntegerWithNumericExclusiveMaximumTopLevel<T, U>
> =>
  t.intersection([
    JSSTIntegerWithNumericExclusiveMaximum(u),
    JSSTTopLevel(c, u)
  ]);
export const JSSTIntegerWithNumericExclusiveMaximumTopLevel_ = JSSTIntegerWithNumericExclusiveMaximumTopLevel(
  JSSTEmpty_,
  t.type({})
);
export const JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel = <
  T,
  U extends object
>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<
  JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel<T, U>,
  JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel<T, U>
> =>
  t.intersection([
    JSSTIntegerWithNumericExclusiveMaximumAndMinimum(u),
    JSSTTopLevel(c, u)
  ]);
export const JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel_ = JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel(
  JSSTEmpty_,
  t.type({})
);
export const JSSTIntegerWithNumericExclusiveBoundsTopLevel = <
  T,
  U extends object
>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<
  JSSTIntegerWithNumericExclusiveBoundsTopLevel<T, U>,
  JSSTIntegerWithNumericExclusiveBoundsTopLevel<T, U>
> =>
  t.intersection([
    JSSTIntegerWithNumericExclusiveBounds(u),
    JSSTTopLevel(c, u)
  ]);
export const JSSTIntegerWithNumericExclusiveBoundsTopLevel_ = JSSTIntegerWithNumericExclusiveBoundsTopLevel(
  JSSTEmpty_,
  t.type({})
);
export const JSSTIntegerEnumTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTIntegerEnumTopLevel<T, U>, JSSTIntegerEnumTopLevel<T, U>> =>
  t.intersection([JSSTIntegerEnum(u), JSSTTopLevel(c, u)]);
export const JSSTIntegerEnumTopLevel_ = JSSTIntegerEnumTopLevel(
  JSSTEmpty_,
  t.type({})
);
export const JSSTNumberTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTNumberTopLevel<T, U>, JSSTNumberTopLevel<T, U>> =>
  t.intersection([JSSTNumber(u), JSSTTopLevel(c, u)]);
export const JSSTNumberTopLevel_ = JSSTNumberTopLevel(JSSTEmpty_, t.type({}));
export const JSSTSimpleNumberTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTSimpleNumberTopLevel<T, U>, JSSTSimpleNumberTopLevel<T, U>> =>
  t.intersection([JSSTSimpleNumber(u), JSSTTopLevel(c, u)]);
export const JSSTSimpleNumberTopLevel_ = JSSTSimpleNumberTopLevel(
  JSSTEmpty_,
  t.type({})
);
export const JSSTNumberEnumTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTNumberEnumTopLevel<T, U>, JSSTNumberEnumTopLevel<T, U>> =>
  t.intersection([JSSTNumberEnum(u), JSSTTopLevel(c, u)]);
export const JSSTNumberEnumTopLevel_ = JSSTNumberEnumTopLevel(
  JSSTEmpty_,
  t.type({})
);
export const JSSTAnyOfTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTAnyOfTopLevel<T, U>, JSSTAnyOfTopLevel<T, U>> =>
  t.intersection([JSSTAnyOf(c, u), JSSTTopLevel(c, u)]);
export const JSSTAnyOfTopLevel_ = JSSTAnyOfTopLevel(JSSTEmpty_, t.type({}));
export const JSSTAllOfTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTAllOfTopLevel<T, U>, JSSTAllOfTopLevel<T, U>> =>
  t.intersection([JSSTAllOf(c, u), JSSTTopLevel(c, u)]);
export const JSSTAllOfTopLevel_ = JSSTAllOfTopLevel(JSSTEmpty_, t.type({}));
export const JSSTNotTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTNotTopLevel<T, U>, JSSTNotTopLevel<T, U>> =>
  t.intersection([JSSTNot(c, u), JSSTTopLevel(c, u)]);
export const JSSTNotTopLevel_ = JSSTNotTopLevel(JSSTEmpty_, t.type({}));
export const JSSTOneOfTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTOneOfTopLevel<T, U>, JSSTOneOfTopLevel<T, U>> =>
  t.intersection([JSSTOneOf(c, u), JSSTTopLevel(c, u)]);
export const JSSTOneOfTopLevel_ = JSSTOneOfTopLevel(JSSTEmpty_, t.type({}));
export const JSSTStringTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTStringTopLevel<T, U>, JSSTStringTopLevel<T, U>> =>
  t.intersection([JSSTString(u), JSSTTopLevel(c, u)]);
export const JSSTStringTopLevel_ = JSSTStringTopLevel(JSSTEmpty_, t.type({}));
export const JSSTSimpleStringTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTSimpleStringTopLevel<T, U>, JSSTSimpleStringTopLevel<T, U>> =>
  t.intersection([JSSTSimpleString(u), JSSTTopLevel(c, u)]);
export const JSSTSimpleStringTopLevel_ = JSSTSimpleStringTopLevel(
  JSSTEmpty_,
  t.type({})
);
export const JSSTRegexTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTRegexTopLevel<T, U>, JSSTRegexTopLevel<T, U>> =>
  t.intersection([JSSTRegex(u), JSSTTopLevel(c, u)]);
export const JSSTRegexTopLevel_ = JSSTRegexTopLevel(JSSTEmpty_, t.type({}));
export const JSSTStringEnumTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTStringEnumTopLevel<T, U>, JSSTStringEnumTopLevel<T, U>> =>
  t.intersection([JSSTStringEnum(u), JSSTTopLevel(c, u)]);
export const JSSTStringEnumTopLevel_ = JSSTStringEnumTopLevel(
  JSSTEmpty_,
  t.type({})
);
export const JSSTArrayTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTArrayTopLevel<T, U>, JSSTArrayTopLevel<T, U>> =>
  t.intersection([JSSTArray(c, u), JSSTTopLevel(c, u)]);
export const JSSTArrayTopLevel_ = JSSTArrayTopLevel(JSSTEmpty_, t.type({}));
export const JSSTListTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTListTopLevel<T, U>, JSSTListTopLevel<T, U>> =>
  t.intersection([JSSTList(c, u), JSSTTopLevel(c, u)]);
export const JSSTListTopLevel_ = JSSTListTopLevel(JSSTEmpty_, t.type({}));
export const JSSTTupleTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTTupleTopLevel<T, U>, JSSTTupleTopLevel<T, U>> =>
  t.intersection([JSSTTuple(c, u), JSSTTopLevel(c, u)]);
export const JSSTTupleTopLevel_ = JSSTTupleTopLevel(JSSTEmpty_, t.type({}));
export const JSSTObjectTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTObjectTopLevel<T, U>, JSSTObjectTopLevel<T, U>> =>
  t.intersection([JSSTObject(c, u), JSSTTopLevel(c, u)]);
export const JSSTObjectTopLevel_ = JSSTObjectTopLevel(JSSTEmpty_, t.type({}));
export const JSSTGenericTopLevel = <T, U extends object>(
  c: t.Type<T, T>,
  u: t.Type<U, U>
): t.Type<JSSTGenericTopLevel<T, U>, JSSTGenericTopLevel<T, U>> =>
  t.intersection([c, JSSTTopLevel(c, u)]);
export const JSSTGenericTopLevel_ = JSSTGenericTopLevel(JSSTEmpty_, t.type({}));
export const JSONSchemaObject = <T, U extends object>(
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

export type JSSTList<T, U extends object> = JSSTProtoArray & {
  items: JSSTAnything<T, U>;
  uniqueItems?: boolean;
  minItems?: number;
  maxItems?: number;
} & U;
export type JSSTAnything<T, U extends object> =
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
export type JSSTTuple<T, U extends object> = JSSTProtoArray & {
  items: Array<JSSTAnything<T, U>>;
} & U;
export type JSSTObject<T, U extends object> = {
  type: "object";
  required?: Array<string>;
  dependencies?: Record<string, Array<string>>;
  additionalProperties?: boolean | JSSTAnything<T, U>;
  patternProperties?: Record<string, JSSTAnything<T, U>>;
  properties?: Record<string, JSSTAnything<T, U>>;
} & U;
export type JSSTOneOf<T, U extends object> = {
  oneOf: Array<JSSTAnything<T, U>>;
} & U;
export type JSSTAnyOf<T, U extends object> = {
  anyOf: Array<JSSTAnything<T, U>>;
} & U;
export type JSSTAllOf<T, U extends object> = {
  allOf: Array<JSSTAnything<T, U>>;
} & U;
export type JSSTNot<T, U extends object> = {
  not: JSSTAnything<T, U>;
} & U;
export type JSSTEmpty<U extends object> = {
  [k: string]: never;
  [z: number]: never;
} & U;

export type JSONPrimitive = number | boolean | string | null;
export type JSONValue = JSONPrimitive | JSONArray | JSONObject;
export type JSONObject = {
  [k: string]: JSONValue;
};
export interface JSONArray extends Array<JSONValue> {}

export type JSSTConst<U extends object> = {
  const: JSONValue;
} & U;
export type JSSTReference<U extends object> = {
  $ref: string;
} & U;
export type JSSTNull<U extends object> = {
  type: "null";
} & U;
export type JSSTBoolean<U extends object> = {
  type: "boolean";
} & U;
export type JSSTProtoInteger<U extends object> = {
  type: "integer";
} & U;
export type JSSTSimpleInteger<U extends object> = JSSTProtoInteger<U> & {
  multipleOf?: number;
};
export type JSSTIntegerWithMinimum<U extends object> = JSSTSimpleInteger<U> & {
  minimum: number;
  exclusiveMinimum?: boolean;
};
export type JSSTIntegerWithMaximum<U extends object> = JSSTSimpleInteger<U> & {
  maximum: number;
  exclusiveMaximum?: boolean;
};
export type JSSTIntegerWithBounds<U extends object> = JSSTSimpleInteger<U> & {
  minimum: number;
  maximum: number;
  exclusiveMinimum?: boolean;
  exclusiveMaximum?: boolean;
};
export type JSSTIntegerWithNumericExclusiveMinimum<
  U extends object
> = JSSTSimpleInteger<U> & {
  exclusiveMinimum: number;
};
export type JSSTIntegerWithNumericExclusiveMinimumAndMaximum<
  U extends object
> = JSSTSimpleInteger<U> & {
  exclusiveMinimum: number;
  maximum: number;
  exclusiveMaximum?: boolean;
};
export type JSSTIntegerWithNumericExclusiveMaximum<
  U extends object
> = JSSTSimpleInteger<U> & {
  exclusiveMaximum: number;
};
export type JSSTIntegerWithNumericExclusiveMaximumAndMinimum<
  U extends object
> = JSSTSimpleInteger<U> & {
  exclusiveMaximum: number;
  minimum: number;
  exclusiveMinimum?: boolean;
};
export type JSSTIntegerWithNumericExclusiveBounds<
  U extends object
> = JSSTSimpleInteger<U> & {
  exclusiveMinimum: number;
  exclusiveMaximum: number;
};
export type JSSTIntegerEnum<U extends object> = JSSTProtoInteger<U> & {
  enum: Array<number>;
};
export type JSSTInteger<U extends object> =
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
export type JSSTProtoNumber<U extends object> = {
  type: "number";
} & U;
export type JSSTSimpleNumber<U extends object> = JSSTProtoNumber<U> & {
  minimum?: number;
  maximum?: number;
  multipleOf?: number;
};
export type JSSTNumberEnum<U extends object> = JSSTProtoNumber<U> & {
  enum: Array<number>;
};
export type JSSTNumber<U extends object> =
  | JSSTSimpleNumber<U>
  | JSSTNumberEnum<U>;
export type JSSTProtoString<U extends object> = {
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
export type JSSTSimpleString<U extends object> = JSSTProtoString<U> & {
  faker?: JSSTFaker;
};
export type JSSTRegex<U extends object> = JSSTProtoString<U> & {
  pattern: string;
};
export type JSSTStringEnum<U extends object> = JSSTProtoString<U> & {
  enum: Array<string>;
};
export type JSSTString<U extends object> =
  | JSSTSimpleString<U>
  | JSSTRegex<U>
  | JSSTStringEnum<U>;
export interface JSSTProtoArray {
  type: "array";
}
export type JSSTArray<T, U extends object> = JSSTList<T, U> | JSSTTuple<T, U>;
export interface JSSTTopLevel<T, U extends object> {
  $schema?: string;
  $id?: string;
  definitions?: Record<string, JSSTAnything<T, U>>;
}
export type JSSTEmptyTopLevel<T, U extends object> = JSSTEmpty<U> &
  JSSTTopLevel<T, U>;
export type JSSTConstTopLevel<T, U extends object> = JSSTConst<U> &
  JSSTTopLevel<T, U>;
export type JSSTReferenceTopLevel<T, U extends object> = JSSTReference<U> &
  JSSTTopLevel<T, U>;
export type JSSTNullTopLevel<T, U extends object> = JSSTNull<U> &
  JSSTTopLevel<T, U>;
export type JSSTBooleanTopLevel<T, U extends object> = JSSTBoolean<U> &
  JSSTTopLevel<T, U>;
export type JSSTIntegerTopLevel<T, U extends object> = JSSTInteger<U> &
  JSSTTopLevel<T, U>;
export type JSSTSimpleIntegerTopLevel<T, U extends object> = JSSTSimpleInteger<
  U
> &
  JSSTTopLevel<T, U>;
export type JSSTIntegerWithMinimumTopLevel<
  T,
  U extends object
> = JSSTIntegerWithMinimum<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerWithMaximumTopLevel<
  T,
  U extends object
> = JSSTIntegerWithMaximum<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerWithBoundsTopLevel<
  T,
  U extends object
> = JSSTIntegerWithBounds<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerWithNumericExclusiveMinimumTopLevel<
  T,
  U extends object
> = JSSTIntegerWithNumericExclusiveMinimum<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerWithNumericExclusiveMinimumAndMaximumTopLevel<
  T,
  U extends object
> = JSSTIntegerWithNumericExclusiveMinimumAndMaximum<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerWithNumericExclusiveMaximumTopLevel<
  T,
  U extends object
> = JSSTIntegerWithNumericExclusiveMaximum<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerWithNumericExclusiveMaximumAndMinimumTopLevel<
  T,
  U extends object
> = JSSTIntegerWithNumericExclusiveMaximumAndMinimum<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerWithNumericExclusiveBoundsTopLevel<
  T,
  U extends object
> = JSSTIntegerWithNumericExclusiveBounds<U> & JSSTTopLevel<T, U>;
export type JSSTIntegerEnumTopLevel<T, U extends object> = JSSTIntegerEnum<U> &
  JSSTTopLevel<T, U>;
export type JSSTNumberTopLevel<T, U extends object> = JSSTNumber<U> &
  JSSTTopLevel<T, U>;
export type JSSTSimpleNumberTopLevel<T, U extends object> = JSSTSimpleNumber<
  U
> &
  JSSTTopLevel<T, U>;
export type JSSTNumberEnumTopLevel<T, U extends object> = JSSTNumberEnum<U> &
  JSSTTopLevel<T, U>;
export type JSSTAnyOfTopLevel<T, U extends object> = JSSTAnyOf<T, U> &
  JSSTTopLevel<T, U>;
export type JSSTAllOfTopLevel<T, U extends object> = JSSTAllOf<T, U> &
  JSSTTopLevel<T, U>;
export type JSSTNotTopLevel<T, U extends object> = JSSTNot<T, U> &
  JSSTTopLevel<T, U>;
export type JSSTOneOfTopLevel<T, U extends object> = JSSTOneOf<T, U> &
  JSSTTopLevel<T, U>;
export type JSSTStringTopLevel<T, U extends object> = JSSTString<U> &
  JSSTTopLevel<T, U>;
export type JSSTSimpleStringTopLevel<T, U extends object> = JSSTSimpleString<
  U
> &
  JSSTTopLevel<T, U>;
export type JSSTRegexTopLevel<T, U extends object> = JSSTRegex<U> &
  JSSTTopLevel<T, U>;
export type JSSTStringEnumTopLevel<T, U extends object> = JSSTStringEnum<U> &
  JSSTTopLevel<T, U>;
export type JSSTArrayTopLevel<T, U extends object> = JSSTArray<T, U> &
  JSSTTopLevel<T, U>;
export type JSSTListTopLevel<T, U extends object> = JSSTList<T, U> &
  JSSTTopLevel<T, U>;
export type JSSTTupleTopLevel<T, U extends object> = JSSTTuple<T, U> &
  JSSTTopLevel<T, U>;
export type JSSTObjectTopLevel<T, U extends object> = JSSTObject<T, U> &
  JSSTTopLevel<T, U>;
export type JSSTGenericTopLevel<T, U extends object> = T & JSSTTopLevel<T, U>;
export type JSONSchemaObject<T, U extends object> =
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
