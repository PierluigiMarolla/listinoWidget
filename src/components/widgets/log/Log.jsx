import React from 'react'
import PropTypes from "prop-types"
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from './../../../firebase';


const Log = ({ openLog, logValue }) => {

    const handleXClick = () => {
        openLog(false)
    }

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'listinoLog', 'CRRef7VlF5hnW2Xy0Fq'); // ID del documento
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document: ", error);
      }
    };

    fetchData();
  }, [logValue]);

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
                    data={data.log}
                >
                    <GridColumn field="Tariffa" title="Tariffa" width="120px" />
                    <GridColumn field="Modifica" title="Modifica" width="300x" />
                    <GridColumn field="Utente" title="Utente" />
                    <GridColumn field="Orario" title="Orario" />
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