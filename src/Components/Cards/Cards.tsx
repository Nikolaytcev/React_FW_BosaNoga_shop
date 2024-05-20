import { useContext } from "react"
import { Card, Icard } from "../Card/Card"
import { Loader } from "../Loader/Loader"
import { AppContext } from "../../contexts/AppContext"

interface Icards {
    data: Icard[],
    loading: boolean,
    isLoadedAll: boolean,
    onLoaded: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Cards = ({data, loading, isLoadedAll, onLoaded}: Icards) => {
  const { offset } = useContext(AppContext);
  
  return (
    <>
    <div className="text-center">
      {loading && offset === 6 ? <Loader/> : 
        <div className='row'>
            {data.map(card => 
            <div className='col-4' key={card.id}>
                <Card id={card.id} images={card.images} category={card.category} title={card.title} price={card.price}/>
            </div>)}
        </div>}
        {loading && offset !== 6 ? 
        <>
          <Loader/> 
          <button className='btn btn-outline-primary' disabled onClick={onLoaded}>Загрузить ещё</button>
        </> : ''}
        {!loading ? isLoadedAll ? <button className='btn btn-outline-primary' hidden onClick={onLoaded}>Загрузить ещё</button> : 
              <button className='btn btn-outline-primary' onClick={onLoaded}>Загрузить ещё</button>: ''}
    </div>
    </>
  )
}
