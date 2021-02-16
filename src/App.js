import React from 'react';
import CardList from "./components/card-list";


export default function App () {


    return (
        <div className='container'>
            <div className="row mt1">
                <div className="col-12">
                    <h1 className='text-center'>React Portals</h1>
                </div>
            </div>
            <div className="row justify-content-center mt-2">
                <div className="col-8">
                    <CardList/>
                </div>
            </div>
        </div>
    );
}

