import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MUIDataTableMeta } from 'mui-datatables';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { useRelatedAccounts } from '../hooks/useRelatedAccounts';
import { convertToReadableFormat, toFixed } from '../utils/Utils';
import WebTable from '../components/WebTable';
import Image01 from '../images/icon-01.svg';

let ignoreSignalColumns = ['flag'];

const RelatedAccounts = () => {
  const { data, walletAddress, blockchainName, isLoading } = useRelatedAccounts();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const tableData = useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      hash: item.hash,
      blockchain_name: item.blockchain_name,
      fraud_probability: toFixed(item.fraud_probability),
      is_bot: item.is_bot ? 'Yes' : 'No',
      ...item.signals.reduce((acc: any, signal) => {
        acc[`signal_${signal.name}`] = signal.data;
        return acc;
      }, {})
    }));
  }, [data]);

  const columns = useMemo(() => {
    const commonCol = [
      {
        name: 'hash',
        label: 'Wallet Address',
        options: {
          customBodyRender: (hash: string, tableMeta: MUIDataTableMeta) => {
            const blockchain = tableMeta.rowData[1];
            return (
              <div
                className="flex flex-row items-center -m-1.5 cursor-pointer"
                onClick={() => {
                  navigate(`/dashboard/wallet/${blockchain}/${hash}/`);
                }}
              >
                <div className="flex items-center text-slate-800">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-slate-100 rounded-full mr-2 sm:mr-3">
                    <img className="ml-1" src={Image01} width="20" height="20" />
                  </div>
                </div>
                <div className="text-left">
                  <span>{hash}</span>
                </div>
              </div>
            );
          }
        }
      },
      {
        name: 'blockchain_name',
        label: 'Blockchain',
        options: {
          customBodyRender: (value: string) => {
            return <div className="text-center">{value}</div>;
          }
        }
      },
      {
        name: 'fraud_probability',
        label: 'Fraud Probability',
        options: {
          customBodyRender: (value: number) => {
            return <div className="text-center">{value}</div>;
          }
        }
      },
      {
        name: 'is_bot',
        label: 'Is Bot',
        options: {
          customBodyRender: (value: string) => {
            return <div className="text-center">{value}</div>;
          }
        }
      }
    ];

    const signalColumns =
      data.length > 0
        ? data?.[0]?.signals.reduce((acc: any, signal: any) => {
            if (ignoreSignalColumns.includes(signal.name)) return acc;
            acc?.push({
              name: `signal_${signal.name}`,
              label: convertToReadableFormat(signal?.name),
              options: {
                customBodyRender: (value: string) => {
                  if (typeof value === 'object' && !Array.isArray(value) && value !== null) return;
                  return <div className="text-center">{toFixed(value)}</div>;
                }
              }
            });
            return acc;
          }, [])
        : [];

    return [...commonCol, ...signalColumns];
  }, [tableData]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                  Related Accounts ✨
                </h1>
              </div>
            </div>
            <WebTable
              columns={columns}
              data={tableData}
              loading={isLoading}
              options={{
                print: false,
                selectableRows: 'none',
                download: false,
                viewColumns: false
              }}
              title={walletAddress}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RelatedAccounts;
