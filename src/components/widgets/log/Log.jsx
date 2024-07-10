import React from 'react'
import PropTypes from "prop-types"
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { orderBy } from "@progress/kendo-data-query";


const initialSort = [
    {
        field: "Tariffa",
        dir: "asc",
    },
];


const Log = ({ openLog, dataLog }) => {

    const handleXClick = () => {
        openLog(false)
    }

    const [data, setData] = React.useState(dataLog ? dataLog.log : []);
    const [sort, setSort] = React.useState(initialSort);
    
    React.useEffect(()=>{
        setData(dataLog ? dataLog.log : [])
    },[dataLog])



    return (
        <div className='log-background'>
            <div className='log-container'>
                <div className='log-title-section'>
                    <h2><strong>LOG DELLE MODIFICHE</strong></h2>
                    <button
                        title='Close Log'
                        onClick={handleXClick}
                        className='log-X-button'
                    >
                        X
                    </button>
                </div>

                <Grid
                    style={{
                        height: "400px",
                    }}
                    data={orderBy(data,sort)}
                    sortable={true}
                    sort={sort}
                    onSortChange={(e) => {
                        setSort(e.sort);
                    }}
                >
                    <Column field="Tariffa" title="Tariffa" width="120px" />
                    <Column field="Modifica" title="Modifica" width="300x" />
                    <Column field="Utente" title="Utente" />
                    <Column field="Orario" title="Orario" />
                </Grid>
            </div>
        </div>
    )
}

Log.propTypes = {
    openLog: PropTypes.func,
    logValue: PropTypes.bool,
};

Log.defaultProps = {
    openLog: () => { },
    logValue: true,
};

export default Log