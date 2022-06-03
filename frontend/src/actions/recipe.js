export const GET_RECIPE = "GET_RECIPE"
export const RECEIVE_RECIPE = "RECEIVE_RECIPE"
export const FAIL_RECIPE = "FAIL_RECIPE"

const fetchingRecipe = () => ({
  type: GET_RECIPE,
})

const fetchedRecipe = (payload) => ({
  type: RECEIVE_RECIPE,
  payload,
})

const failedFetchRecipe = (payload) => ({
  type: FAIL_RECIPE,
  payload,
})

export const executeFetchRecipe = async (id) => {
  const response = await fetch(`/api/recipe/${id}`)
  const recipe = await response.json()
  return recipe
}

export const fetchRecipeById = (id) => {
  return (dispatch) => {
    dispatch(fetchingRecipe())
    return executeFetchRecipe(id)
      .then((res) => dispatch(fetchedRecipe(res)))
      .catch((err) => dispatch(failedFetchRecipe(err)))
  }
}

