import React from 'react';
import { MoleculeProvider } from '@dtinsight/molecule';

import { customExtensions } from './extensions';
import MyWorkbench from './myWorkbench/index';
import '@dtinsight/molecule/esm/style/mo.css';
import './App.css';

function App() {
  return (
    <MoleculeProvider extensions={customExtensions}>
        <MyWorkbench />
    </MoleculeProvider>
  );
}

export default App;
