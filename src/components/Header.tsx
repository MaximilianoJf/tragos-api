
import {NavLink, useLocation} from "react-router-dom"
import { useMemo, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useAppStore } from "../store/useAppStore"

export default function Header() {


    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const [error, setError] = useState(false)

    const {pathname} = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])
    
    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const SearchRecipes = useAppStore((state) => state.SearchRecipes)
    const showNotification = useAppStore((state) => state.showNotification)
  
    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name] : e.target.value
        })
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        if(Object.values(searchFilters).includes('')){
            setError(true)
            showNotification({
                text: "Todos los Campos son Obligatorios",
                error:true,
            })
            return
        }

        setError(false)
        SearchRecipes(searchFilters)
    }

    

  return (
   <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                    <img className="w-32" src="/logo.svg" alt="logotipo"/>
                </div>
                <nav className="flex gap-4">
                    {/* navLink dispone de un callback para verificar si se encuentra en una pagina especifica */}
                    <NavLink to="/" className={({isActive}) => 
                        isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase'        
                    }>Inicio</NavLink>
                    <NavLink to="/favoritos" className={({isActive}) => 
                        isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase'        
                    }>Favoritos
                    </NavLink>

                    {/* <Link to="/favoritos" className="text-white uppercase font-bold">
                        Favoritos
                    </Link> */}
                </nav>
            </div>

            {isHome && (

                <form onSubmit={handleSubmit} className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6">
                    {error && (
                        <p className="font-bold text-white text-center bg-red-400 rounded-lg p-2">Debe completar todos los campos</p>
                    )}
                    <div className="space-y-4">
                        <label
                            htmlFor="ingredient"
                            className="block text-wrap uppercase font-extrabold text-lg"
                        >Nombre o Ingredientes</label>
                        <input
                            id='ingredient'
                            type='text'
                            name='ingredient'
                            className="p-3 w-full rounded-lg focus:outline-none"
                            placeholder="Nombre o Ingredientes. Ej. Vodka, Tequila, Café"
                            onChange={handleChange}
                             value={searchFilters.ingredient}
                        />
                    </div>
                    <div className="space-y-4">
                        <label
                            htmlFor="ingredient"
                            className="block text-wrap uppercase font-extrabold text-lg"
                        >Categoria
                        </label>
                        <select
                            id='category'
                            name='category'
                            className="p-3 w-full rounded-lg focus:outline-none"
                            onChange={handleChange}
                            value={searchFilters.category}
                        >
                            <option>--- Seleccione ---</option>
                            {categories.drinks.map((category) => (
                                <option key={category.strCategory}>{category.strCategory}</option>
                            ))}
                        </select>
                    </div>
                    <input 
                        type="submit" 
                        value="buscar Recetas" 
                        className="cursor-pointer bg-orange-800 w-full hover:bg-orange-900 text-white font-extrabold p-2 rounded-lg uppercase"
                    />
                </form>

            )}

        </div>
   </header>
  )
}
