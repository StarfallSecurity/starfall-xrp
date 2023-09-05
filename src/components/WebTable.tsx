import React, { memo } from 'react';
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumnDef,
  MUIDataTableCustomHeadRenderer
} from 'mui-datatables';

import Spinner from '../pages/component/Spinner';

type WebTableProps = {
  data: Array<object | number[] | string[]>;
  columns: MUIDataTableColumnDef[];
  options: MUIDataTableOptions;
  title?: string | React.ReactNode;
  loading: boolean;
};

const customHeadLabelRender = (columnMeta: MUIDataTableCustomHeadRenderer) => (
  <p className="w-32 text-xs font-semibold uppercase text-slate-500 capitalize">
    {columnMeta.label}
  </p>
);

const buildColumns = (columns: MUIDataTableColumnDef[]) =>
  columns.map((c: MUIDataTableColumnDef) => {
    let cl: MUIDataTableColumnDef = c;
    if (typeof c === 'object' && !Array.isArray(c) && c !== null) {
      cl = {
        ...c
      };

      if (c.options) {
        cl['options'] = {
          customHeadLabelRender,
          ...c.options
        };
      } else {
        cl['options'] = {
          customHeadLabelRender
        };
      }

      cl.options.setCellHeaderProps = () => {
        return {
          style: {
            backgroundColor: '#f8fafc',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#edf2f7',
            //@ts-ignore
            ...cl.options.style
          }
        };
      };
    }

    return cl;
  });

function WebTable(props: WebTableProps) {
  const { data, columns, options, title, loading } = props;

  return (
    <MUIDataTable
      title={
        loading ? (
          <div className="flex w-100 justify-start">
            <Spinner />
          </div>
        ) : (
          title
        )
      }
      data={data}
      columns={buildColumns(columns)}
      options={options}
    />
  );
}

export default memo(WebTable);
