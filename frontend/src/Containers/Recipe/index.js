import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { withRouter, Link } from "react-router-dom"
import { RecipeWrapper } from "./styles"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

import * as actions from "../../actions"


class Recipe extends Component {
  constructor(props) {
    super(props)
    //Dispatch fetch action if component is loaded with only ID and no recipe state
    const id = this.props.match?.params.id;
    if(id) {
      this.props.fetchRecipeById(id)
    }
  }

  render() {
    const { recipe, isLoading } = this.props
    return (
      <RecipeWrapper>
        {recipe && (
          <div>
            <h2>
              <Link to={`/recipe/${recipe.id}`}> {recipe.name} </Link>
              </h2>
            <h3>Ingredients</h3>
            <List>{
              recipe.ingredients.map(({name, amount, unit}, index) => (
                <ListItem key={`${name}-${index}`}>
                  <ListItemText>{amount} {unit} {name}</ListItemText>
                </ListItem>
              ))
            }</List>
            <h3>Instructions</h3>
            <p className="instructions">{recipe.instructions}</p>
          </div>
        )}
        {isLoading && <LinearProgress />}
      </RecipeWrapper>
    )
  }
}

const mapStateToProps = ({ recipe }) => {
  return { ...recipe } 
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchRecipeById: actions.fetchRecipeById
    },
    dispatch
  )

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipe))

