import React, { useState } from 'react';
import AutoCompleteSelect from './../autoCompleteSelect/AutoCompleteSelect';

const DetailComponent = ({ dataItem, nomeUtente, selectedRow, setToLog, updateDataItem, openAnalisi, tabPropOpen, tabAnalisiOpen, openProp }) => {
  const [sicurezza, setSicurezza] = useState(dataItem.IncSIC);
  const [manodopera, setManodopera] = useState(dataItem.IncMDO);
  const [attrezzature, setAttrezzature] = useState(dataItem.IncATTR);
  const [materiali, setMateriali] = useState(dataItem.IncMAT);
  const [usaAnalisi, setUsaAnalisi] = useState(false);

  const p1Originale = dataItem.Prezzo1;
  let p1 = 0;

  const handleSicurezzaChange = (event) => {
    const updatedSicurezza = event.target.value;
    setSicurezza(updatedSicurezza);
    updateDataItem({ ...dataItem, IncSIC: updatedSicurezza });
    logChange('Incidenza Sicurezza', selectedRow.Tariffa);
  };

  const handleManodoperaChange = (event) => {
    const updatedManodopera = event.target.value;
    setManodopera(updatedManodopera);
    updateDataItem({ ...dataItem, IncMDO: updatedManodopera });
    logChange('Incidenza Manodopera', selectedRow.Tariffa);
  };

  const handleAttrezzatureChange = (event) => {
    const updatedAttrezzature = event.target.value;
    setAttrezzature(updatedAttrezzature);
    updateDataItem({ ...dataItem, IncATTR: updatedAttrezzature });
    logChange('Incidenza Attrezzature', selectedRow.Tariffa);
  };

  const handleMaterialiChange = (event) => {
    const updatedMateriali = event.target.value;
    setMateriali(updatedMateriali);
    updateDataItem({ ...dataItem, IncMAT: updatedMateriali });
    logChange('Incidenza Materiali', selectedRow.Tariffa);
  };

  const logChange = (field, tariffa) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }) + ' - ' + now.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setToLog({
      Tariffa: tariffa,
      Modifica: `${tariffa} è stato modificato ${field}`,
      Utente: nomeUtente,
      Orario: formattedDate,
    });
  };

  const p1Changer = (newValue) => {
    p1 = newValue;
    setUsaAnalisi(true);
    updateDataItem({ ...dataItem, Prezzo1: newValue });
  };

  const p1Restore = () => {
    setUsaAnalisi(false);
  };

  const stateChanger = () => {
    setUsaAnalisi(true);
  };

  const updateLavorazioni = (newLavorazioni) => {
    const updatedItem = { ...dataItem, analisi: newLavorazioni };
    updateDataItem(updatedItem);
  };

  return (
    <>
      <section className={tabPropOpen ? "tabOpen" : "tabClosed"}>
        <div>
          <button>Proprietà</button>
          <button onClick={openAnalisi}>Analisi</button>
        </div>
        <p><strong>Tariffa:</strong> {dataItem.Tariffa}</p>
        <p><strong>Articolo:</strong> {dataItem.Articolo}</p>
        <p><strong>DesRidotta:</strong> {dataItem.DesRidotta}</p>
        <p><strong>DesEstesa:</strong> {dataItem.DesEstesa}</p>
        <p><strong>UnMisura:</strong> {dataItem.UnMisura}</p>
        <p><strong>Data:</strong> {dataItem.Data}</p>
        <p><strong>Prezzo1:</strong> {!usaAnalisi ? p1Originale : p1}</p>
        <p><strong>Prezzo2:</strong> {dataItem.Prezzo2}</p>
        <p><strong>Prezzo3:</strong> {dataItem.Prezzo3}</p>
        <p><strong>Prezzo4:</strong> {dataItem.Prezzo4}</p>
        <p><strong>Prezzo5:</strong> {dataItem.Prezzo5}</p>
        <div>
          <label htmlFor='sic'>
            <strong>Incidenza Sicurezza:</strong>
          </label>
          <input type="number" id="sic" value={sicurezza} onChange={handleSicurezzaChange} />
        </div>
        <div>
          <label htmlFor='man'>
            <strong>Incidenza Manodopera:</strong>
          </label>
          <input type="number" id="man" value={manodopera} onChange={handleManodoperaChange} />
        </div>
        <div>
          <label htmlFor='mat'>
            <strong>Incidenza Materiali:</strong>
          </label>
          <input type="number" id="mat" value={materiali} onChange={handleMaterialiChange} />
        </div>
        <div>
          <label htmlFor='attr'>
            <strong>Incidenza Attrezzature:</strong>
          </label>
          <input type="number" id="attr" value={attrezzature} onChange={handleAttrezzatureChange} />
        </div>
        <div className="input-container">
          <button onClick={p1Restore}>Usa Listino</button>
          <button onClick={stateChanger}>Usa Analisi</button>
        </div>
      </section>
      <section className={tabAnalisiOpen ? "tabOpen" : "tabClosed"}>
        <div>
          <button onClick={openProp}>Proprietà</button>
          <button>Analisi</button>
        </div>
        <AutoCompleteSelect selectedRow={selectedRow} nomeUtente={nomeUtente} addLogAnalisi={setToLog} p1Changer={p1Changer} updateDetailComponent={updateLavorazioni} detProps={dataItem} />
      </section>
    </>
  );
};

export default DetailComponent;