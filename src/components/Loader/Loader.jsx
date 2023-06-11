import React from 'react';
import { LineWave } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className="Loader">
      <LineWave type="Oval" color="#3f51b5" height={50} width={50} />
    </div>
  );
};

export default Spinner;
