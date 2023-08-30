import React from 'react';
import { convertToReadableFormat, getFormattedDateWithTime, toFixed } from '../../utils/Utils';

interface GridItemProps {
  label: string;
  value: string | boolean;
  isLast?: boolean;
  className?: string;
}

const GridItem: React.FC<GridItemProps> = ({ label, value, isLast, className }) => {
  const statusColor = (status: any) => {
    switch (!!status) {
      case true:
        return 'bg-rose-100 text-rose-500';
      case false:
        return 'bg-emerald-100 text-emerald-600';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };

  const statusLabel = (status: any) => {
    return status ? 'Suspended' : 'Approved';
  };
  return (
    <div key={label}>
      <div className="flex justify-between items-center">
        <div className="text-gray-600 font-medium mr-2">{label}</div>
        {label === 'Status' ? (
          <div
            className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${statusColor(
              value
            )}`}
          >
            {statusLabel(value)}
          </div>
        ) : (
          <div className={`text-sm text-gray-800 ${className}`}>{value}</div>
        )}
      </div>
      {!isLast && <div className="my-4 border-b"></div>}
    </div>
  );
};

interface GridProps {
  data: any;
}

const Grid: React.FC<GridProps> = ({ data }) => {
  return (
    <div className="border mx-6 p-4 lg:w-3/5">
      {data?.map(({ label, value, isLast, className }: any) => (
        <GridItem key={label} label={label} value={value} className={className} isLast={isLast} />
      ))}
    </div>
  );
};

const WalletPrediction: React.FC<any> = ({ walletInfo, loading }) => {

  const walletData = Object.keys(walletInfo).reduce((acc: any, curr) => {
    let className;
    switch (curr) {
      case 'is_blacklist':
        acc[0] = {
          label: 'Status',
          value: !!walletInfo?.is_blacklist || walletInfo.final_prediction == 1
        };
        break;
      case 'fraud_probability':
        className =
          toFixed(walletInfo?.fraud_probability) > 0.5 ? 'text-emerald-500' : 'text-rose-500';
        acc[1] = { label: 'Risk Score', value: toFixed(walletInfo?.fraud_probability), className };
        break;
      case 'fraud_message':
        acc[2] = {
          label: 'Message',
          value: walletInfo?.fraud_message,
          className: 'text-sm text-slate-600 italic'
        };
        break;
      case 'reason':
        acc[3] = {
          label: 'Reason',
          value: walletInfo?.fraud_message,
          className: 'text-sm text-slate-600 italic'
        };
        break;
      // case 'fraud_prediction':
      //   className =
      //     toFixed(walletInfo?.fraud_probability) > 0.5 ? 'text-emerald-500' : 'text-rose-500';
      //   acc[4] = {
      //     label: 'Fraud Prediction',
      //     value: toFixed(walletInfo?.fraud_prediction),
      //     className
      //   };
      //   break;
      case 'modified':
        acc[5] = { label: 'Last Viewed', value: getFormattedDateWithTime(walletInfo?.modified) };
        break;
      case 'created':
        acc[6] = {
          label: 'Created',
          value: getFormattedDateWithTime(walletInfo?.created)
        };
        break;
      case 'num_transactions':
        acc[7] = {
          label: 'Total Transactions',
          value: walletInfo?.num_transactions
        };
        break;
      case 'num_erc20_token_transfers':
        acc[8] = {
          label: 'Total Token Transfers',
          value: walletInfo?.num_erc20_token_transfers,
        };
        break;
      case 'is_bot':
        acc[9] = {
          label: 'Is Bot',
          value: walletInfo?.is_bot.toString().toUpperCase(),
        };
        break;
      case 'blockchain_name':
        acc[10] = {
          label: 'Blockchain',
          value: walletInfo?.blockchain_name,
          isLast: true
        };
        break;
    }

    return acc;
  }, []);

  const prediction = walletInfo?.predictions?.map((prediction: any, index: number) => {
    return {
      label: convertToReadableFormat(prediction?.model_name),
      value:
        prediction?.fraud_data?.fraud_probability ||
        toFixed(prediction?.bot_data?.fraud_probability),
      isLast: index === walletInfo?.predictions.length - 1
    };
  });

  if (loading) return <div>Loading...</div>;

  if (!Object.values(walletInfo || {}).length) return <div>No predictions found</div>;

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 pb-6 relative">
      <header className="px-6 py-4">
        <h2 className="font-semibold text-slate-800">Predictions</h2>
      </header>
      <Grid data={walletData} />
      <p className="font-semibold m-6 text-slate-800">Data</p>
      <Grid data={prediction} />
    </div>
  );
};

export default WalletPrediction;
