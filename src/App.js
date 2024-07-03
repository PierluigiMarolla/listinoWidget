import React, { useState } from 'react';
import './App.scss';

import ListinoTab from './components/widgets/listinoTab/ListinoTab';
import ComputoTab from './components/widgets/computoTab/ComputoTab';
import SettingMenu from './components/widgets/settingMenu/SettingMenu';


const App = () => {
  const [listinoOpen, setListinoOpen] = useState(true);
  const [computoOpen, setcomputoOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);


  function closeListino(newValue) {
    setListinoOpen(newValue)
  }

  function openListino(newValue) {
    setListinoOpen(newValue)
  }

  function closeComputo(newValue) {
    setcomputoOpen(newValue)
  }

  function openComputo(newValue) {
    setcomputoOpen(newValue)
  }

  function openSetting(newValue) {
    setSettingOpen(newValue)
  }

  return (
    <>
      <div className='container-grid'>
        <div className={`ancor ${listinoOpen ? "" : "closed"}`}>
          <ListinoTab close={closeListino} open={openComputo} openSet={openSetting} setValue={settingOpen} ></ListinoTab>
        </div>
  
        <div className={`ancor ${computoOpen ? "" : "closed"}`}>
          <ComputoTab close={closeComputo} open={openListino} openSet={openSetting} setValue={settingOpen}></ComputoTab>
        </div>

        <div className={`ancor-set ${settingOpen ? "" : "closed"}`}>
          <SettingMenu></SettingMenu>
        </div>
      </div>
    </>
  );
}

export default App;
