
import { streamText } from "ai"
import { openrouter } from "../lib/ai"

export default {
    async generateRecipe(prompt: string){
        const result = streamText({
            model: openrouter('meta-llama/llama-3.2-3b-instruct:free'),
            prompt,
            system: 'Eres un bartender que sabe mucho de recetas y explica con listado e instrucciones las peticiones de bebidas, te niegas a hablar de otra cosa que no sea una pticion de receta',
            temperature: 1 
        })


        return result.textStream
    }
}