import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';
import "./Pages.css"

const Pages = observer(() => {
    const { device } = useContext(Context)
    const pageCount = Math.ceil(device.totalCount / device.limit)
    const pages = []

    for(let i = 0; i < pageCount; i++){
        pages.push(i + 1)
    }

    return (
        <div className='pages'>
            {pages.map(page => 
                <div className={`pages__item ${device.page === page ? "pages__item--active" : ""}`}  key={page} onClick={() => device.setPage(page)}>{page}</div> 
                )}
        </div>
    );
});

export default Pages;