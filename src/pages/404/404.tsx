import { useContext } from "react"
import { AppContext } from "../../contexts/AppContext"

export const NotFound = () => {
  
  const {error} = useContext(AppContext);

  return (
    <section className="top-sales">
        <h2 className="text-center">Страница не найдена</h2>
        {error !== undefined ? <p>Ошибка сервера!</p> : 
        <p>
            Извините, такая страница не найдена!
        </p>}
    </section>
  )
}
