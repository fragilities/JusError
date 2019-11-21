function insertIngredients(data) {
  let ingredients = []
    
  for(let key in data) {
    let ingredientTemp = key.split('-')
    if(ingredientTemp.length > 1) {
      if(ingredientTemp[1] == 'radio') {
        if(data[key] == 1) {
          let amountKey = ingredientTemp[0] + '-amount'
          ingredients.push([data[ingredientTemp[0]], data[amountKey]])
        }
      }
    }
  }

  return ingredients
}

module.exports = insertIngredients