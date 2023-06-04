export function excectIgnoreIndention(v: string, expected: string, trim = true) {
  v = v.replace(/\n\s*/g, "\n");
  expected = expected.replace(/\n\s*/g, "\n");
  if (trim) {
    v = v.trim();
    expected = expected.trim();
  }
  expect(v).toBe(expected);
}
