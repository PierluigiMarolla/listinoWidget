import React from 'react';
import './../listinoTab/listinoTab.css'
import '@progress/kendo-theme-default/dist/all.css';
import './../../../App.scss';
import AutoCompleteSelect from './../autoCompleteSelect/AutoCompleteSelect'
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
  getSelectedState,
} from '@progress/kendo-react-grid';
import { process } from "@progress/kendo-data-query";
/* import { GridPDFExport } from "@progress/kendo-react-pdf"; */
import { Input } from "@progress/kendo-react-inputs";
import { filterBy } from "@progress/kendo-data-query";
import { getter } from '@progress/kendo-react-common';
import { ContextMenu, MenuItem } from "@progress/kendo-react-layout";
import { mapTree } from '@progress/kendo-react-treelist';
import computo from './../../../json/listino_abruzzo_per_ticket.json'
import PropTypes from "prop-types"
import { db } from './../../../firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

const ListinoTab = ({ nomeUtente, close, open, openSet, setValue, openLog, logValue }) => {


/*   const [usaAnalisi, setUsaAnalisi] = React.useState(false) */
  const [toLog, setToLog] = React.useState(null)

  const addLogAnalisi = (value) => {
    setToLog(value)
  }

  let percorso = computo.PweElencoPrezzi.EPItem;



  const DATA_ITEM_KEY = 'Tariffa';
  const SELECTED_FIELD = 'selected';
  const idGetter = getter(DATA_ITEM_KEY);
  const initialDataState = {
    skip: 0,
    take: 400,
    sort: [
      {
        field: 'Tariffa',
        dir: 'desc',
      },
    ],
    group: [
      {
        field: "IDSupCap.DesSintetica"
      }
    ]
  };
  const [tabPropOpen, setTabPropOpen] = React.useState(true)
  const [tabAnalisiOpen, setTabAnalisiOpen] = React.useState(false)

  function openProp() {
    setTabAnalisiOpen(false)
    setTabPropOpen(true)
  }

  function openAnalisi() {
    setTabPropOpen(false)
    setTabAnalisiOpen(true)
  }

  const updateDataItem = (updatedItem) => {
    const updatedData = data.map(item =>
      item.Tariffa === updatedItem.Tariffa ? updatedItem : item
    );
    setData(updatedData);

    // Aggiorna anche l'array principale percorso
    percorso = percorso.map(item =>
      item.Tariffa === updatedItem.Tariffa ? updatedItem : item
    );
  };



  const DetailComponent = (props) => {

/*     let p1 = 0; */
    const dataItem = props.dataItem;
/*     const p1Originale = dataItem.Prezzo1 */

    const [sicurezza, setSicurezza] = React.useState(dataItem.IncSIC)
    const [manodopera, setManodopera] = React.useState(dataItem.IncMDO)
    const [attrezzature, setAttrezzature] = React.useState(dataItem.IncATTR)
    const [materiali, setMateriali] = React.useState(dataItem.IncMAT)
    const [tariffa, setTariffa] = React.useState(dataItem.Tariffa)
    const [articolo, setArticolo] = React.useState(dataItem.Articolo)
    const [desRidotta, setDesRidotta] = React.useState(dataItem.DesRidotta)
    const [desEstesa, setDesEstesa] = React.useState(dataItem.DesEstesa)
    const [unMisura, setUnMisura] = React.useState(dataItem.UnMisura)
    const [prezzo1, setPrezzo1] = React.useState(dataItem.Prezzo1)
    const [prezzo2, setPrezzo2] = React.useState(dataItem.Prezzo2)
    const [prezzo3, setPrezzo3] = React.useState(dataItem.Prezzo3)
    const [prezzo4, setPrezzo4] = React.useState(dataItem.Prezzo4)
    const [prezzo5, setPrezzo5] = React.useState(dataItem.Prezzo5)

    const handleTariffaChange = (event) => {
      const updatedTariffa = event.target.value;
      setTariffa(updatedTariffa);
    };

    const handleArticoloChange = (event) => {
      const updatedArticolo = event.target.value;
      setArticolo(updatedArticolo);
    };

    const handleDesRidottaChange = (event) => {
      const updatedDesRidotta = event.target.value;
      setDesRidotta(updatedDesRidotta);
    };

    const handleDesEstesaChange = (event) => {
      const updatedDesEstesa = event.target.value;
      setDesEstesa(updatedDesEstesa);
    };

    const handleUnMisuraChange = (event) => {
      const updatedUnMisura = event.target.value;
      setUnMisura(updatedUnMisura);
    };

    const handlePrezzo1Change = (event) => {
      const updatedPrezzo1 = event.target.value;
      setPrezzo1(updatedPrezzo1);
    };

    const handlePrezzo2Change = (event) => {
      const updatedPrezzo2Prezzo2 = event.target.value;
      setPrezzo2(updatedPrezzo2Prezzo2);
    };

    const handlePrezzo3Change = (event) => {
      const updatedPrezzo3 = event.target.value;
      setPrezzo3(updatedPrezzo3);
    };

    const handlePrezzo4Change = (event) => {
      const updatedPrezzo4 = event.target.value;
      setPrezzo4(updatedPrezzo4);
    };

    const handlePrezzo5Change = (event) => {
      const updated5 = event.target.value;
      setPrezzo5(updated5);
    };

    const handleSicurezzaChange = (event) => {
      const updatedSicurezza = event.target.value;
      setSicurezza(updatedSicurezza);
    };

    const handleManodoperaChange = (event) => {
      const updatedManodopera = event.target.value;
      setManodopera(updatedManodopera);
    };

    const handleAttrezzatureChange = (event) => {
      const updatedAttrezzature = event.target.value;
      setAttrezzature(updatedAttrezzature);
    };

    const handleMaterialiChange = (event) => {
      const updatedMateriali = event.target.value;
      setMateriali(updatedMateriali);
    };

    const p1Changer = (newValue) => {
/*       p1 = newValue */
      /* setUsaAnalisi(true); */
      updateDataItem({ ...dataItem, Prezzo1: newValue });
    }

    /* const p1Restore = () => {
      setUsaAnalisi(false)
    } */

    /* const stateChanger = () => {
      setUsaAnalisi(true)
    } */

    const updateLavorazioni = (newLavorazioni) => {
      const updatedItem = { ...dataItem, analisi: newLavorazioni };
      updateDataItem(updatedItem);  // Aggiorna l'array principale chiamando updateDataItem
    };

    return (
      <>
        <section className={tabPropOpen ? "tabOpen" : "tabClosed"}>
          <div>
            <button
            title='proprietà'
            className='k-button k-button-md k-button-solid k-button-solid-primary m-top'
            >Proprietà</button>
            <button 
            title='Analisi'
            className='k-button k-button-md k-button-solid k-button-solid-secondary m-top'
            onClick={openAnalisi}>Analisi</button>
          </div>
          {/* <p>
            <strong>Tariffa:</strong> {dataItem.Tariffa}
          </p>
          <p>
            <strong>Articolo:</strong> {dataItem.Articolo}
          </p>
          <p>
            <strong>DesRidotta:</strong> {dataItem.DesRidotta}
          </p>
          <p>
            <strong>DesEstesa:</strong> {dataItem.DesEstesa}
          </p>
          <p>
            <strong>UnMisura:</strong> {dataItem.UnMisura}
          </p>
          <p>
            <strong>Data:</strong> {dataItem.Data}
          </p>
          <p>
            <strong>Prezzo1:</strong> {!usaAnalisi ? p1Originale : p1}
          </p>
          <p>
            <strong>Prezzo2:</strong> {dataItem.Prezzo2}
          </p>
          <p>
            <strong>Prezzo3:</strong> {dataItem.Prezzo3}
          </p>
          <p>
            <strong>Prezzo4:</strong> {dataItem.Prezzo4}
          </p>
          <p>
            <strong>Prezzo5:</strong> {dataItem.Prezzo5}
          </p> */}
          <div className='proprety-tab-sections'>
            <div className='proprety-tab-first'>
              <label htmlFor='tar'>
                <strong>Tariffa:</strong>
              </label>
              <input
                type="text"
                id="tar"
                value={tariffa}
                onChange={handleTariffaChange}
              />
            </div>
            <div className='proprety-tab-first'>
              <label htmlFor='art'>
                <strong>Articolo:</strong>
              </label>
              <input
                type="text"
                id="art"
                value={articolo}
                onChange={handleArticoloChange}
              />
            </div>
            <div className='proprety-tab-first'>
              <label htmlFor='unMi'>
                <strong>UnMisura:</strong>
              </label>
              <input
                type="text"
                id="unMi"
                value={unMisura}
                onChange={handleUnMisuraChange}
              />
            </div>
          </div>
          <div className='proprety-tab-long'>
            <label htmlFor='dRid'>
              <strong>Descrizione Ridotta:</strong>
            </label>
            <textarea
              type="text"
              id="dRid"
              value={desRidotta}
              onChange={handleDesRidottaChange}
            />
          </div>
          <div className='proprety-tab-long'>
            <label htmlFor='dEst'>
              <strong>Descrizione Estesa:</strong>
            </label>
            <textarea
              type="text"
              id="dEst"
              value={desEstesa}
              onChange={handleDesEstesaChange}
            />
          </div>
          <div className='proprety-tab-sections'>
            <div className="proprety-tab-first">
              <label htmlFor='pr1'>
                <strong>Prezzo 1:</strong>
              </label>
              <input
                type="number"
                id="pr1"
                value={prezzo1}
                onChange={handlePrezzo1Change}
              />
            </div>
            <div className="proprety-tab-first">
              <label htmlFor='pr2'>
                <strong>Prezzo 2:</strong>
              </label>
              <input
                type="number"
                id="pr2"
                value={prezzo2}
                onChange={handlePrezzo2Change}
              />
            </div>
            <div className="proprety-tab-first">
              <label htmlFor='pr3'>
                <strong>Prezzo 3:</strong>
              </label>
              <input
                type="number"
                id="pr3"
                value={prezzo3}
                onChange={handlePrezzo3Change}
              />
            </div>
            <div className="proprety-tab-first">
              <label htmlFor='pr4'>
                <strong>Prezzo 4:</strong>
              </label>
              <input
                type="number"
                id="pr4"
                value={prezzo4}
                onChange={handlePrezzo4Change}
              />
            </div>
            <div className="proprety-tab-first">
              <label htmlFor='pr5'>
                <strong>Prezzo 5:</strong>
              </label>
              <input
                type="number"
                id="pr5"
                value={prezzo5}
                onChange={handlePrezzo5Change}
              />
            </div>
          </div>
          <div className='proprety-tab-sections'>
            <div className='proprety-tab-first'>
              <label htmlFor='sic'>
                <strong>Incidenza Sicurezza:</strong>
              </label>
              <input
                type="number"
                id="sic"
                value={sicurezza}
                onChange={handleSicurezzaChange}
              />
            </div>
            <div className='proprety-tab-first'>
              <label htmlFor='man'>
                <strong htmlFor='man'>Incidenza Manodopera:</strong>
              </label>
              <input
                type="number"
                id="man"
                value={manodopera}
                onChange={handleManodoperaChange}
              />
            </div>
            <div className='proprety-tab-first'>
              <label htmlFor='mat'>
                <strong>Incidenza Materiali:</strong>
              </label>
              <input
                type="number"
                id="mat"
                value={materiali}
                onChange={handleMaterialiChange}
              />
            </div>
            <div className='proprety-tab-first'>
              <label htmlFor='attr'>
                <strong>Incidenza Attrezzature:</strong>
              </label>
              <input
                type="number"
                id="attr"
                value={attrezzature}
                onChange={handleAttrezzatureChange}
              />
            </div>
          </div>
          {/* <div className="input-container closed">
            <button onClick={p1Restore}>Usa Listino</button>
            <button onClick={stateChanger}>Usa Analisi</button>
          </div> */}
        </section>
        <section className={tabAnalisiOpen ? "tabOpen" : "tabClosed"}>
          <div>
            <button 
            title='Proprietà'
            className='k-button k-button-md k-button-solid k-button-solid-secondary m-top'
            onClick={openProp}>Proprietà</button>
            <button
            className='k-button k-button-md k-button-solid k-button-solid-primary m-top'
            >Analisi</button>
          </div>
          <AutoCompleteSelect selectedRow={selectedRow} nomeUtente={nomeUtente} addLogAnalisi={addLogAnalisi} p1Changer={p1Changer} updateDetailComponent={updateLavorazioni} detProps={dataItem} />
        </section>
      </>
    );
  };

  const initialSort = [
    {
      field: "Tariffa",
      dir: "asc",
    },
  ];





  const [data, setData] = React.useState(
    percorso.map((dataItem) =>
      Object.assign(
        {
          selected: false,
        },
        dataItem
      )
    )
  );
  const [editID, setEditID] = React.useState(null);
  const [dataState, setDataState] = React.useState(initialDataState);

  const [selectedState, setSelectedState] = React.useState({});
  const [dataItemIndex, setDataItemIndex] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState();
  const offset = React.useRef({
    left: 0,
    top: 0,
  });
  const gridData = percorso;
  const [sort, setSort] = React.useState(initialSort);
  const [collapsedGroups, setCollapsedGroups] = React.useState([]);

  const onSelectionChange = (event) => {
    let targetEl = event.nativeEvent.target;
    let isDetail = false;
    while (targetEl.tagName !== 'BODY') {
      if (targetEl.tagName === 'TR') {
        if (targetEl.className.indexOf('k-detail-row') >= 0) {
          isDetail = true;
          break;
        }
      }
      targetEl = targetEl.parentNode;
    }
    if (!isDetail) {
      const newSelectedState = getSelectedState({
        event,
        selectedState: selectedState,
        dataItemKey: DATA_ITEM_KEY,
      });
      setSelectedState(newSelectedState);
      setSelectedState(newSelectedState);
      let newData = data.map((item) => ({
        ...item,
        [SELECTED_FIELD]: newSelectedState[idGetter(item)],
      }));
      setData(newData);
    };


  };

  const handleGroupState = (props) => {
    return {
      data: mapTree(props.data, 'items', (group) => {
        if (!group.aggregates) return group;
        let groupId = group.field + '_' + group.value;
        return { ...group, expanded: !collapsedGroups.includes(groupId) };
      }),
      total: props.total,
    };
  };

  const handleGroupChange = (event) => {
    const groupField = event.target.value;
    if (groupField === "none") {
      setDataState({ ...dataState, group: [] });
    } else {
      setDataState({ ...dataState, group: [{ field: groupField }] });
    }
  };

  const handleContextMenuOpen = (e, dataItem) => {
    e.preventDefault();
    setDataItemIndex(
      data.findIndex((p) => p.Tariffa === dataItem.Tariffa)
    );
    setSelectedRow(dataItem);
    offset.current = {
      left: e.pageX,
      top: e.pageY,
    };
    setShow(true);
  };

  const handleCloseMenu = () => {
    setShow(false);
  };

  const handleDeleteRow = () => {
    let data = [...gridData];
    data.splice(dataItemIndex, 1);
    setData(data);

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
      Tariffa: selectedRow.Tariffa,
      Modifica: `${selectedRow.Tariffa} è stata eliminata`,
      Utente: nomeUtente,
      Orario: formattedDate
    })
  };

  const handleAddRow = () => {
    const newRow = {
      Tariffa: data.length + 1,
      IDSupCap: {
        DesSintetica: "AGGIUNTA NUOVA VOCE",
        DesEstesa: "AGGIUNTA NUOVA VOCE",
      },
      IDCap:{
        DesSintetica: "AGGIUNTA NUOVA VOCE",
        DesEstesa: "AGGIUNTA NUOVA VOCE",
      },
      IDSbCap:{
        DesSintetica: "AGGIUNTA NUOVA VOCE",
        DesEstesa: "AGGIUNTA NUOVA VOCE",
      },
    };
    setData([newRow, ...data]);
    setEditID(newRow.Tariffa);

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
      Tariffa: `${data.length + 1}`,
      Modifica: `è stata aggiunta una riga`,
      Utente: nomeUtente,
      Orario: formattedDate
    })
  };

  const handleEditRow = () => {
    setEditID(selectedRow.Tariffa);

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
      Tariffa: selectedRow.Tariffa,
      Modifica: `${selectedRow.Tariffa} è stato editato`,
      Utente: nomeUtente,
      Orario: formattedDate
    })
  };



  const handleMoveUp = () => {
    let data = [...gridData];
    if (dataItemIndex !== 0) {
      data.splice(dataItemIndex, 1);
      data.splice(dataItemIndex - 1, 0, selectedRow);
      setData(data);
    }

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
      Tariffa: selectedRow.Tariffa,
      Modifica: `${selectedRow.Tariffa} è stato mandato su di una riga`,
      Utente: nomeUtente,
      Orario: formattedDate
    })
  };

  const handleMoveDown = () => {
    let data = [...gridData];
    if (dataItemIndex < data.length) {
      data.splice(dataItemIndex, 1);
      data.splice(dataItemIndex + 1, 0, selectedRow);
      setData(data);
    }

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
      Tariffa: selectedRow.Tariffa,
      Modifica: `${selectedRow.Tariffa} è stato mandato giù di una riga`,
      Utente: nomeUtente,
      Orario: formattedDate
    })
  };

  const handleOnSelect = (e) => {
    switch (e.item.data.action) {
      case "addRow":
        handleAddRow();
        break;
      case "editRow":
        handleEditRow();
        break;
      case "deleteRow":
        handleDeleteRow();
        break;
      case "moveUp":
        handleMoveUp();
        break;
      case "moveDown":
        handleMoveDown();
        break;
      default:
    }
    setShow(false);
  };

  const handleContextMenu = (event) => {
    handleContextMenuOpen(event.syntheticEvent, event.dataItem);
  };

  const itemChange = (event) => {
    const inEditID = event.dataItem.Tariffa;
    const field = event.field || "";
    const newData = data.map((item) =>
      item.Tariffa === inEditID
        ? {
          ...item,
          [field]: event.value,
        }
        : item
    );
    setData(newData);
  };

  const closeEdit = () => {
    setEditID(null)
  };

  const filterData = (e) => {
    let value = e.target.value;


    let filter = {
      logic: "or",
      filters: [
        { field: "Tariffa", operator: "contains", value: value },
        { field: "DesRidotta", operator: "contains", value: value },
        { field: "DesEstesa", operator: "contains", value: value },
        { field: "UnMisura", operator: "contains", value: value },
        { field: "Prezzo1", operator: "contains", value: value },
      ],
    };


    const filteredData = filterBy(percorso, filter);


    setData(filteredData);
  };

  const expandChange = (event) => {
    setSelectedRow(event.dataItem);
    if (!event.dataItem.aggregates) {
      let newData = data.map((item) => {
        if (item[DATA_ITEM_KEY] === event.dataItem[DATA_ITEM_KEY]) {
          item.expanded = !event.dataItem.expanded;
        }
        return item;
      });
      setData(newData);
    } else {
      let groupId = event.dataItem.field + '_' + event.dataItem.value;
      if (!collapsedGroups.includes(groupId)) {
        setCollapsedGroups([...collapsedGroups, groupId]);
      } else {
        setCollapsedGroups(collapsedGroups.filter((gr) => gr !== groupId));
      }
    }
  };

  /* let gridPDFExport;
  const exportPDF = () => {
    if (gridPDFExport !== null) {
      gridPDFExport.save();
    }
  }; */

  const dataStateChange = (event) => {
    setDataState(event.dataState);
  };

  const onRowDoubleClick = (event) => {
    if (!event.dataItem.aggregates) {
      let newData = data.map((item) => {
        if (item[DATA_ITEM_KEY] === event.dataItem[DATA_ITEM_KEY]) {
          item.expanded = !event.dataItem.expanded;
        }

        return item;
      });
      setData(newData);
    }
  };
  let larghezza = window.innerWidth;
  let altezza = window.innerHeight-40;

  console.log(larghezza)
  let larghezzaEffettiva = larghezza-10;
  const grid2 = (
    <>
      <Grid
        filterable={false}
        groupable={false}
        reorderable={true}
        style={{
          width: `${larghezzaEffettiva}px`,
          height: `${altezza}px`,
        }}
        resizable={true}
        data={handleGroupState(process(data.map((item) => ({
          ...item,
          inEdit: item.Tariffa === editID,
          [SELECTED_FIELD]: selectedState[idGetter(item)],
        })), dataState), sort)
        }
        {...dataState}
        onRowDoubleClick={onRowDoubleClick}
        detail={DetailComponent}
        expandField="expanded"
        onExpandChange={expandChange}
        pageable={{
          buttonCount: 4,
          pageSizes: true,
        }}
        dataItemKey={DATA_ITEM_KEY}
        selectedField={SELECTED_FIELD}
        selectable={true}
        navigatable={true}
        onSelectionChange={onSelectionChange}
        editField="inEdit"
        onItemChange={itemChange}
        onDataStateChange={dataStateChange}
        onContextMenu={handleContextMenu}
        sortable={true}
        sort={sort}
        onSortChange={(e) => {
          setSort(e.sort);
        }}
      >
        <Column field="Tariffa" title="Tariffa" width="150wpx" minResizableWidth={110} />
        <Column field="DesRidotta" title="Descrizione" width="1000px" minResizableWidth={600} />
        <Column field="UnMisura" title="Unità Misura" width="200px" minResizableWidth={50} />
        <Column field="Prezzo1" title="Prezzo" width="100px" minResizableWidth={80} />
        <GridToolbar>
          <div onClick={closeEdit}>
            <button
              title="Aggiungi Voce"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary margin"
              onClick={handleAddRow}
            >
              Aggiungi Voce
            </button>
            <button
              title='Salva Modifica'
              className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary margin'
              onClick={closeEdit}>
              Salva Modifica
            </button>
            {/* <button
              title="Export PDF"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary margin"
              onClick={exportPDF}
            >
              Export PDF
            </button> */}
          </div>
          <div className='proprety-tab-first'>
            <p>Cerca:</p>
            <Input onChange={filterData} />
          </div>
          <div className='proprety-tab-first'>
            <p>Raggruppamento:</p>
            <select onChange={handleGroupChange} defaultValue="IDSupCap.DesSintetica">
              <option value="none">Standard</option>
              <option value="IDSupCap.DesSintetica">Super Capitoli</option>
              <option value="IDCap.DesSintetica">Capitoli</option>
              <option value="IDSbCap.DesSintetica">SubCapitoli</option>
            </select>
          </div>
        </GridToolbar>
      </Grid>
      <ContextMenu
        show={show}
        offset={offset.current}
        onSelect={handleOnSelect}
        onClose={handleCloseMenu}
      >
        <MenuItem
          text="Aggiungi Voce"
          data={{
            action: "addRow",
          }}
          icon="plus"
        />
        <MenuItem
          text="Modifica Voce"
          data={{
            action: "editRow",
          }}
          icon="edit"
        />
        <MenuItem
          text="Cancella Voce"
          data={{
            action: "deleteRow",
          }}
          icon="delete"
        />
        <MenuItem
          text="Porta Voce Su"
          data={{
            action: "moveUp",
          }}
          icon="arrow-up"
        />
        <MenuItem
          text="Porta Voce Giù"
          data={{
            action: "moveDown",
          }}
          icon="arrow-down"
        />
      </ContextMenu>
    </>

  );

  /* function handleClick() {
    close(false)
    open(true)
    setEditID(null)
  } */

  /* function handleClickSet() {
    setValue === false ? openSet(true) : openSet(false);
  } */

  function handleClickLog() {
    openLog(true)
  }

  React.useEffect(() => {
    if (toLog) {
      const sendLogToFirestore = async () => {
        try {
          const logRef = doc(db, 'listinoLog', 'CRRef7VlF5hnW2Xy0Fq'); // ID del documento
          console.log('logRef:', logRef.path);  // Log the document reference path
          console.log('toLog:', toLog);    // Log the toLog value

          const docSnap = await getDoc(logRef);

          if (!docSnap.exists()) {
            console.log('Documento non esiste, creazione in corso...');
            await setDoc(logRef, { log: [toLog] });
          } else {
            await updateDoc(logRef, {
              log: arrayUnion(toLog)
            });
          }

          console.log('Log successfully written!');
        } catch (error) {
          console.error('Error writing log: ', error);
        }
      };
      sendLogToFirestore();
    }
  }, [toLog]);


  return (
    <div className='chiodo'>
      <div className='flex'>
        <div>
          <button
            title='Listino'
            className='k-button k-button-md k-button-solid k-button-solid-primary'>
            Listino
          </button>
          {/* <button
            title='Computo'
            className='k-button k-button-md k-button-solid k-button-solid-secondary'
            onClick={handleClick}>
            Computo
          </button> */}
        </div>
        {/* <button
          title='IMPOSTAZIONI'
          onClick={handleClickSet}
        >IMPOSTAZIONI</button> */}
        <button
        className='k-button k-button-md k-button-solid k-button-solid-info'
          title='Log'
          onClick={handleClickLog}
        >LOG</button>
      </div>
      {grid2}
      {/* <GridPDFExport ref={(pdfExport) => (gridPDFExport = pdfExport)}>
        {grid2}
      </GridPDFExport> */}
    </div>
  )
}

ListinoTab.propTypes = {
  close: PropTypes.func,
  open: PropTypes.func,
  openSet: PropTypes.func,
  openLog: PropTypes.func,
  setValue: PropTypes.bool,
  logValue: PropTypes.bool,
  nomeUtente: PropTypes.string,
};

ListinoTab.defaultProps = {
  close: () => { },
  open: () => { },
  openSet: () => { },
  openLog: () => { },

  setValue: false,
  logValue: false,

  nomeUtente: "",
};



export default ListinoTab
