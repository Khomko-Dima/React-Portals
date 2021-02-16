import React, {useEffect, useState} from "react";
import MyWindowPortal from "../my-window-portal";
import {Button} from "@material-ui/core";

export default function CardComponent({name, model, passengers, manufacturer, crew, img}) {
    const [state, setState] = useState({
        showWindowPortal: false
    })
    const [button, setButton] = useState(true)
    const toggleWindowPortal = () => {
        setState({
            ...state,
            showWindowPortal: !state.showWindowPortal,
        });
    }

    const closeWindowPortal = () => {
        setState({ ...state, showWindowPortal: false })
    }
    useEffect(() => {
        window.addEventListener('beforeunload', closeWindowPortal)
        return () => {
            window.removeEventListener('beforeunload', closeWindowPortal)
        }
    }, [])

    const handler = () => {
        toggleWindowPortal()
        setButton(false)
    }
    const returnBtn = () => {
        setButton(true)
        closeWindowPortal();
    }

    return (
        <>
            {button && (
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handler}
                >{name}</button>
            )}

            {state.showWindowPortal && (
                <MyWindowPortal closeWindowPortal={closeWindowPortal} >
                    <div className="card" style={{width: '18rem'}}>
                        <img className="card-img-top" src={img} alt={name} />
                            <div className="card-body">
                                <h5 className="card-title">{name}</h5>
                                <ul>
                                    <li>model: {model}</li>
                                    <li>passengers: {passengers}</li>
                                    <li>manufacturer: {manufacturer}</li>
                                    <li>crew: {crew}</li>
                                </ul>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <Button variant="contained" color="primary" onClick={returnBtn}>
                                        Return
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={closeWindowPortal}>
                                        Close
                                    </Button>
                                </div>
                            </div>
                    </div>
                </MyWindowPortal>
            )}
        </>
    )
}