import type {StateCreator} from 'zustand'
import AIService from '../services/AIService'

export type AISliceType = {
    recipe: string
    generateRecipe: (prompt: string) => Promise<void>,
    isGenerating: boolean
}

export const createAISlice : StateCreator<AISliceType, [], [], AISliceType> = (set) => ({
    recipe: '',
    isGenerating: false,
    generateRecipe: async (prompt) => {
        set({recipe: '', isGenerating: true})
        //El primer await solo asegura que tienes ese iterable (ej: conexión lista).
        // Luego for await va recibiendo cada fragmento del texto generado por la IA de manera progresiva.
        const data = await AIService.generateRecipe(prompt)
        for await (const textPart of data){
            set(state => ({
                recipe: state.recipe + textPart
            }))
        }
        set({isGenerating: false})
    }
})