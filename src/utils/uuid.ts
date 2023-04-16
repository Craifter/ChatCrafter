/** Generates a UUID v4 */
export function uuid (): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  // @ts-expect-error based on https://stackoverflow.com/a/2117523
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
