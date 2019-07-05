export function remove(array: number[], value: number) {
  array.forEach( (v, i) => {
    if (v === value) {
      array.splice(i, 1);
    }
  });
}

export function sortArray(array1: number[], array2: number[]) {
  array1.sort();
  array2.sort();
}

export function  selectOption(src: number[], des: number[], id: number) {
  des.push(id);
  this.remove(src, id);
  this.sortArray(src, des);
}

export function  findName(array: any[], id: number) {
  return array.find(e => e.id === id).name;
}
