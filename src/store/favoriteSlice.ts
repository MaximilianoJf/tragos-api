import type { StateCreator } from "zustand";
import type { Recipe } from "../types";
import { type RecipesSliceType } from "./recipeSlice";
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice";

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExist: (id: Recipe['idDrink']) => boolean
}


// esto se agrega cuando quiero conectar slices, & RecipesSliceType, [], [], FavoritesSliceType
export const createFavoritesSlice : StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set ,get,api) => ({
    favorites:[],
    handleClickFavorite: (recipe) => {
        if(get().favoriteExist(recipe.idDrink)){
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set,get,api).showNotification({
                    text: 'Se eliminó de favoritos',
                    error: false
            })
        }else{
            // set({
            //     favorites: [...get().favorites, recipe]
            // })
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))
              createNotificationSlice(set,get,api).showNotification({
                    text: 'Se agregó a favoritos',
                    error: false
            })
        }

        // createRecipiesSlice(set ,get, api).closeModal()

        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    }
})
