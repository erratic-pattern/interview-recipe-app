import { Request, Response, NextFunction } from "express"
import * as mongoose from 'mongoose'
import { Recipe, Ingredient, RecipeModel } from "../models"

const { ObjectId } = mongoose.Types

interface RecipeResponse {
  id: string,
  name: string,
  instructions: string,
  ingredients: IngredientResponse[]
}

interface IngredientResponse {
  name: string
  unit: string
  amount: number
}

// clean up ingredient response before sending
const ingredientCleaner = (ingredient: Ingredient): IngredientResponse => {
  const { name, unit, amount } = ingredient
  return { name, unit, amount }
}

// clean up recipe response before sending
const recipeCleaner = (recipe: Recipe): RecipeResponse => {
  const { _id, name, instructions, ingredients } = recipe
  return { 
    id: _id,
    name,
    instructions,
    ingredients: ingredients.map(ingredientCleaner) 
  }
}

//error handler for 404
const recipeNotFound = (id: string, res: Response) => {
  res.status(400).json({
    error: `Bad Recipe ID ${id}`,
    code: 400
  })
}

//error handler for 400
const recipeBadRequest = (id: string, res: Response) => {
  res.status(400).json({
    error: `Bad Recipe ID ${id}`,
    code: 400
  })
}

//TODO: generic API error handler middleware/utilities for 404, 400, 500, etc 

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // get request params
  const { id } = req.params
  // validate params and return 400 if invalid
  if(!id || !ObjectId.isValid(id)) {
    recipeBadRequest(id, res)
    return
  }
  // fetch recipe from mongo by ID
  // TODO: catch mongoose error with generic middleware handler and respond with 500 and JSON error response
  const recipe = await RecipeModel.findById(id)

  // return recipe as JSON if found
  if (recipe) {
    res.json(recipeCleaner(recipe))
  }
  // return 404 if not found
  else { 
    recipeNotFound(id, res)
  }
}
