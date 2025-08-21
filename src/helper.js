export function checkHeading(str) {
  return /^\*{2}.+\*{1,2}$/.test(str);
}

export function replaceStar(str) {
  return str.replace(/^\*{2}|\*{1,2}$/g, '');
}
