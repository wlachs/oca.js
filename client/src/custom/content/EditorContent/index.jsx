/* React imports */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';

/* Custom imports */
import { useTable } from 'react-table';
import { Col } from 'react-bootstrap';

/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { getValueForPath } from '../../redux/selectors';
import { CUSTOM_LIST } from '../../redux/paths';
import { getCustomList } from '../../redux/thunks';

function prepareData({ params }) {
  return params.reduce((data, row) => ({
    ...data,
    [row.key]: row.value,
  }), {});
}

function EditorRowContent({ row }) {
  const originalRowValues = row.cells.map((cell) => ({
    key: cell.column.Header,
    value: cell.value,
  }));

  const [rowValues, setRowValues] = useState(originalRowValues);
  const getValue = (key) => rowValues.find((rw) => rw.key === key).value;
  const setValue = (key, value) => {
    setRowValues([...rowValues.filter((rw) => rw.key !== key), { key, value }]);
  };

  return (
    <tr {...row.getRowProps()}>
      {row.cells.map((cell) => (
        <td className="content-editor-cell" {...cell.getCellProps()}>
          <input
            className="w-100"
            type="text"
            value={getValue(cell.column.Header)}
            onChange={(e) => setValue(cell.column.Header, e.target.value)}
          />
        </td>
      ))}
      <td className="content-editor-cell-buttons">
        Save | Delete
      </td>
    </tr>
  );
}

EditorRowContent.propTypes = {
  row: PropTypes.shape({
    getRowProps: PropTypes.func,
    cells: PropTypes.arrayOf(PropTypes.shape({
      getCellProps: PropTypes.func,
      render: PropTypes.func,
    })),
  }).isRequired,
};

function EditorContent({ attributes }) {
  const { value: modelKey } = attributes.find(({ key }) => key === 'modelKey');
  const data = useSelector(getValueForPath(CUSTOM_LIST)) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomList(modelKey));
  }, [modelKey]);

  const columns = useMemo(
    () => attributes
      .filter(({ key }) => key === 'field')
      .map(({ value }) => value)
      .map((field) => ({
        Header: field,
        accessor: field,
      })),
    [attributes],
  );

  const parsedData = useMemo(() => data.map(prepareData), [data]);
  const tableInstance = useTable({ columns, data: parsedData });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <Col xs={12} lg={10} className="mx-auto">
      <table className="w-100" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="content-editor-header" {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return <EditorRowContent key={row} row={row} />;
          })}
        </tbody>
      </table>
    </Col>
  );
}

EditorContent.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })),
};

EditorContent.defaultProps = {
  attributes: [],
};

export default EditorContent;
