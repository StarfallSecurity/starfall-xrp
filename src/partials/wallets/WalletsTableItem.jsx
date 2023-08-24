import React, { useState } from 'react';
import { getFormattedDate, toFixed, typeIcon } from '../../utils/Utils';
import { fetchWalletPrediction } from '../../services/network/wallet';
import { Link } from 'react-router-dom';

function WalletsTableItem(props) {
  const { address, isBlackList, created, handleClick, isChecked, blockchainName } = props || {};
  const [open, setOpen] = useState(false);
  const [predictionData, setPredictionData] = useState({});

  const statusColor = (status) => {
    switch (status) {
      case true:
        return 'bg-rose-100 text-rose-500';
      case false:
        return 'bg-emerald-100 text-emerald-600';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };

  const statusLabel = (status) => {
    return isBlackList ? 'Suspended' : 'Approved';
  };

  const handleViewMore = async () => {
    setOpen(!open);
    if (!open) {
      const response = await fetchWalletPrediction(address);
      setPredictionData(response);
    }
  };

  return (
    <>
      <tr>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="flex items-center">
            <label className="inline-flex">
              <span className="sr-only">Select</span>
              <input
                id={props.id}
                className="form-checkbox"
                type="checkbox"
                onChange={handleClick}
                checked={isChecked}
              />
            </label>
          </div>
        </td>
        {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="flex items-center text-slate-800">
            <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-slate-100 rounded-full mr-2 sm:mr-3">
              <img className="ml-1" src={props.image} width="20" height="20" alt={props.order} />
            </div>
          </div>
        </td> */}
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="flex flex-row items-center -m-1.5">
            <div className="flex items-center text-slate-800">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-slate-100 rounded-full mr-2 sm:mr-3">
                <img className="ml-1" src={props.image} width="20" height="20" alt={props.order} />
              </div>
            </div>
            <div className="text-left">
              <Link
                to={`/dashboard/wallet/${blockchainName}/${address}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>{address}</span>
              </Link>
            </div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left">{getFormattedDate(created)}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left">
            <div
              className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${statusColor(
                isBlackList
              )}`}
            >
              {statusLabel()}
            </div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-slate-500">{blockchainName}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="flex items-center -m-1.5">
            <div className="m-1.5">
              <button>{typeIcon('success')}</button>
            </div>
            <div className="m-1.5">
              <button>{typeIcon('warning')}</button>
            </div>
            <div className="m-1.5">
              <button>{typeIcon('error')}</button>
            </div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="flex items-center">
            <button
              className={`text-slate-400 hover:text-slate-500 ${open && 'rotate-180'}`}
              aria-expanded={open}
              onClick={handleViewMore}
              aria-controls={`description-${props.id}`}
            >
              <span className="sr-only">Menu</span>
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
              </svg>
            </button>
          </div>
        </td>
      </tr>

      <tr id={`description-${props.id}`} role="region" className={`${!open && 'hidden'}`}>
        <td colSpan="10" className="px-2 first:pl-5 last:pr-5 py-3">
          <div className="bg-slate-50 p-3 -mt-3">
            <div className="flex px-3">
              {predictionData ? (
                <>
                  <svg
                    className="w-4 h-4 fill-current text-slate-500 shrink-0 mr-2 mt-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                  </svg>
                  <div className="w-full justify-between text-sm text-slate-600 italic">
                    <div>Risk Score: {toFixed(predictionData?.fraud_probability)}</div>
                    <div className="mt-1">Message: {predictionData?.fraud_message}</div>
                    <div className="mt-1">Reason: {predictionData?.fraud_message}</div>
                  </div>
                </>
              ) : (
                <div className="w-full justify-between text-sm text-slate-600 italic">
                  No predictions found
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

export default WalletsTableItem;
