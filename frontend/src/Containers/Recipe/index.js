import React, { Component } from "react"
import { connect } from "react-redux"
import { RecipeWrapper } from "./styles"
import LinearProgress from "@material-ui/core/LinearProgress"
import Container from "@material-ui/core/Container"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"


class Recipe extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { recipe, isLoading } = this.props
    return (
      <RecipeWrapper>
        {recipe && (
          <div>
            <h2>{recipe.name}</h2>
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

export default connect(mapStateToProps)(Recipe)

