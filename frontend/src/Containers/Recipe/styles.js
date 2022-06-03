import styled from "styled-components"

export const RecipeWrapper = styled.div`
    display: flex;
    flex-flow: column;
    margin: auto;
    h3 {
        padding-left: 2em;
    }
    li {
        padding-left: 6em;
    }
    .instructions {
        padding-left: 4em;
        text-indent: 2em;
        line-height: 2em
    }
`