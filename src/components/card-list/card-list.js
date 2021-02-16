import React, {useEffect, useState} from 'react'
import SwapiService from "../../services/swapi-service";
import CardComponent from "../card";

const Swapi = new SwapiService();
export default function CardList() {
    const [state, setState] = useState({
        loading: false,
        data: null
    });
    useEffect(async () => {
        setState({...state, loading: true})
        await Swapi.getAllStarships()
            .then(res => {
                setState({
                    ...state,
                    loading: false,
                    data: res
                })
            })
    },[])

    return (
        <div className='row justify-content-center'>
            <div className="col-12 text-center mr-3 mb-3">
                {state.loading ? 'loading...' : (<h2>Star Wars</h2>)}
            </div>
            <div className="col-8">
                {state.data !== null ? state.data.map(item => {
                    const {id} = item;
                    const img = Swapi.getStarshipImage({id});
                    return (
                        <div key={id} style={{marginTop: '15px'}}>
                            <CardComponent {...item} img={img}/>
                        </div>
                    )
                }) : null }
            </div>
        </div>

    )
}