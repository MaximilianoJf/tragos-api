import type { StateCreator } from "zustand"
import { getCategories, getRecipes, getRecipeById } from "../services/RecipeService"
import type { Categories, Drinks,Drink, SearchFilter, Recipe } from "../types"
import type { FavoritesSliceType } from "./favoriteSlice"

export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: Recipe
    modal: boolean,
    fetchCategories: () => Promise<void>
    SearchRecipes: (searchFilters : SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void,
    loadFromStorage: () => void
}

// RecipesSliceType → define qué propiedades y métodos tendrá tu slice.
// StateCreator<RecipesSliceType> → asegura que la función que creas devuelva exactamente un objeto compatible con RecipesSliceType.

export const createRecipiesSlice : StateCreator<RecipesSliceType & FavoritesSliceType, [], [], RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    SearchRecipes: async (searchFilters) => {
        const drinks = await getRecipes(searchFilters)
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id)
       
        set({
            selectedRecipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal:false,
            selectedRecipe: {} as Recipe
        })
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})

