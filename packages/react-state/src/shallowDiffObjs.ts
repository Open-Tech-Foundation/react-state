export default function shallowDiffObjs(obj1: object, obj2: object): boolean {
  const keys = Object.keys(obj1);
  for (let i = 0; i < keys.length; i++) {
    if (
      obj1[keys[i] as keyof typeof obj1] !== obj2[keys[i] as keyof typeof obj2]
    ) {
      return false;
    }
  }
  return true;
}
