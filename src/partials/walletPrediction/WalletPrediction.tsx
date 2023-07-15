import React from 'react';

interface GridItemProps {
  label: string;
  value: string;
}

const GridItem: React.FC<GridItemProps> = ({ label, value }) => {
  return (
    <div className="flex border border-gray-300 p-4">
      <div className="text-gray-600 font-medium mr-2">{label}</div>
      <div className="text-gray-800">{value}</div>
    </div>
  );
};

interface GridProps {
  data: Record<string, string>;
}

const Grid: React.FC<GridProps> = ({ data }) => {
  return (
    <div className="space-x-4">
      {Object.entries(data).map(([key, value]) => (
        <GridItem key={key} label={key} value={value} />
      ))}
    </div>
  );
};

const WalletPrediction = () => {
  const data: Record<string, string> = {
    status: 'approved',
    risk_score: '0.8',
    message: 'This is a fraud txn wallet',
    reason: 'loreum ipsum'
  };
  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">Prediction</h2>
      </header>
      <Grid data={data} />
    </div>
  );
};

export default WalletPrediction;
