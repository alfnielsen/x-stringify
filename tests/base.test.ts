import { stringify } from "../src/stringify"
import { largeDeepObjectExcept } from "./util/test-base-except"
import { largeDeepObject } from "./util/test-objects"
import { excectIgnoreIndention } from "./util/util"

test("no settgins", () => {
  let res = stringify(largeDeepObject)
  let expected = largeDeepObjectExcept
  expect(res).toBe(expected)
})

test("show undefind", () => {
  const input = {
    a: undefined,
    b: null,
    c: 1,
    d: "2",
    e: [undefined, null, 1, "2"],
  }
  let res1 = stringify(input, {
    showUndefined: true,
  })
  let expected1 = `{
        a: undefined,
        b: null,
        c: 1,
        d: "2",
        e: [
            undefined,
            null,
            1,
            "2"
        ]
    }`
  excectIgnoreIndention(res1, expected1)
  let res2 = stringify(input, {
    showUndefined: false,
  })
  let expected2 = `{
        b: null,
        c: 1,
        d: "2",
        e: [
            null,
            1,
            "2"
        ]
      }`
  excectIgnoreIndention(res2, expected2)
})

test("dont show null", () => {
  let res = stringify(
    {
      a: undefined,
      b: null,
      c: 1,
      d: "2",
      e: [undefined, null, 1, "2"],
    },
    {
      showNull: false,
    }
  )
  let expected = `{
        c: 1,
        d: "2",
        e: [
            1,
            "2"
        ]
    }
`
  excectIgnoreIndention(res, expected)
})

test("maxDepth", () => {
  let input = {
    l1: {
      l2: {
        l3: {
          l4: {
            l5: {
              l6: {},
            },
          },
        },
      },
    },
  }
  let res1 = stringify(input, {
    maxDepth: 1,
  })
  let expected1 = `{
        l1: [max depth]
      }
  `
  excectIgnoreIndention(res1, expected1)

  let res2 = stringify(input, {
    maxDepth: 2,
  })
  let expected2 = `{
        l1: {
            l2: [max depth]
        }
      }
  `
  excectIgnoreIndention(res2, expected2)

  let res3 = stringify(input, {
    maxDepth: 3,
  })
  let expected3 = `{
        l1: {
            l2: {
                l3: [max depth]
            }
        }
    }`
  excectIgnoreIndention(res3, expected3)
})

test("indent", () => {
  let input = {
    l1: {
      a: [
        1,
        {
          l4: {},
        },
      ],
      l2: {
        l3: {
          l4: {
            l5: {
              l6: {},
            },
          },
        },
      },
    },
  }
  let res1 = stringify(input, {
    indent: 0,
  })
  let expected1 = `{
l1: {
a: [
1,
{
l4: [max depth]
}
],
l2: {
l3: {
l4: [max depth]
}
}
}
}`

  expect(res1).toBe(expected1)

  let res2 = stringify(input, {
    indent: 1,
  })
  let expected2 = `{
 l1: {
  a: [
   1,
   {
    l4: [max depth]
   }
  ],
  l2: {
   l3: {
    l4: [max depth]
   }
  }
 }
}`

  expect(res2).toBe(expected2)

  let res3 = stringify(input, {
    indent: 2,
  })
  let expected3 = `{
  l1: {
    a: [
      1,
      {
        l4: [max depth]
      }
    ],
    l2: {
      l3: {
        l4: [max depth]
      }
    }
  }
}`

  expect(res3).toBe(expected3)
})

test("removeKeys", () => {
  let input = {
    l1: {
      a: [
        1,
        {
          l4: {},
        },
      ],
      l2: {
        l3: {
          l4: {
            l5: {
              l6: {},
            },
          },
        },
      },
    },
  }
  let res1 = stringify(input, {
    indent: 0,
    removeKeys: ["a", "l3"],
  })
  let expected1 = `{
l1: {
l2: {
}
}
}`

  expect(res1).toBe(expected1)
})
