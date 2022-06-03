import { Request, Response, NextFunction } from "express"
import * as mongoose from 'mongoose';
import { RecipeModel } from "../models"

const { ObjectId } = mongoose.Types

//TODO: generic API error handler middleware/utilities for 404, 400, 500, etc 

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // get request params
  const { id } = req.params
  // validate params
  if(!id || !ObjectId.isValid(id)) {
    res.status(400).json({
      error: `Bad Recipe ID ${id}`,
      code: 400
    })
    return
  }
  // fetch recipe from mongo by ID
  // TODO: catch mongoose error with generic middleware handler and respond with 500 and JSON error response
  const recipe = await RecipeModel.findById(id);
  
  // return recipe as JSON if found
  if (recipe) {
    res.json(recipe);
  }
  // return 404 if not found
  else { 
    res.status(404).json({
      error: `Recipe ID ${id} not found`,
      code: 404
    })
  }
}
