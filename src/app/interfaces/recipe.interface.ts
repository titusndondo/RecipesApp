export interface Recipe {
  id: number,
  name: string,
  ingredients: [{name: string, quantity: string, type: string}],
  steps: string[],
  imageURL: string,

}