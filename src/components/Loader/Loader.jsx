import React from 'react';
import { LineWave } from 'react-loader-spinner';
import './Loader.css';

const Spinner = () => {
  return (
    <div className="Loader">
      <LineWave type="Oval" color="#3f51b5" height={200} width={200} />
    </div>
  );
};

export default Spinner;
