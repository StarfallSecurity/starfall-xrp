import React, { useMemo, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { useRelatedAccounts } from '../hooks/useRelatedAccounts';
import { convertToReadableFormat, toFixed } from '../utils/Utils';
import WebTable from '../components/WebTable';

let ignoreSignalColumns = ['flag'];

const RelatedAccounts = () => {
  const { data, walletAddress, isLoading } = useRelatedAccounts();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const columns = useMemo(() => {
    const commonCol = [
      {
        name: 'fraud_probability',
        label: 'Fraud Probability',
        options: {
          customBodyRender: (value: number) => {
            return <div className="text">{toFixed(value)}</div>;
          }
        }
      },
      {
        name: 'is_bot',
        label: 'Is Bot',
        options: {
          customBodyRender: (value: boolean | null) => {
            return <div>{value ? 'Yes' : 'No'}</div>;
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
  }, [data]);

  const tableData = useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      fraud_probability: item.fraud_probability,
      is_bot: item.is_bot,
      ...item.signals.reduce((acc: any, signal) => {
        acc[`signal_${signal.name}`] = signal.data;
        return acc;
      }, {})
    }));
  }, [data]);

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
