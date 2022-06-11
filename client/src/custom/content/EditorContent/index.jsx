/* React imports */
import React, { useEffect, useMemo } from 'react';
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
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td className="content-editor-cell" {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
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
