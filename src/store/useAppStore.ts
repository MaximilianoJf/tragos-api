import {create} from 'zustand'
import { createRecipiesSlice, type RecipesSliceType } from './recipeSlice'
import { devtools } from 'zustand/middleware';
import { type FavoritesSliceType , createFavoritesSlice } from './favoriteSlice';
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice';
import { createAISlice, type AISliceType } from './aiSlider';
// el a se refiere a todos los argumentos rest parameters significa que la función puede recibir cualquier número de argumentos, y a será un array con todos ellos.


type AppStoreType = RecipesSliceType & FavoritesSliceType & NotificationSliceType & AISliceType;

export const useAppStore = create<AppStoreType>()(devtools((...a) => ({
    ...createRecipiesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a)
})))
