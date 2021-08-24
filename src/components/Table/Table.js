import React from "react";
import styled from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useTable, useBlockLayout } from "react-table";
import { useSticky } from "react-table-sticky";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <MaUTable size="small" {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()} padding="none">
                {column.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          const bg = i % 2 === 0 ? "#ffffff" : "#eeeeee";
          prepareRow(row);
          return (
            <TableRow
              {...row.getRowProps()}
              style={{
                backgroundColor: bg,
              }}
            >
              {row.cells.map((cell) => {
                return (
                  <TableCell {...cell.getCellProps()} padding="none">
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
}

const TableComponent = (props) => {
  return <Table columns={props.columns} data={props.data} />;
};

export default TableComponent;
