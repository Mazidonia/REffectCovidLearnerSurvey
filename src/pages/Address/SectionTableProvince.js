import React, { useMemo } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    "&$selected, &$selected:hover": {
      backgroundColor: theme.palette.action.selected,
    },
  },
  hover: {},
  selected: {},
}));

const SectionTableProvince = (props) => {
  const onSelectRowHandler = (PROVINCE_ID) => {
    props.onSelectRow(props.selected === PROVINCE_ID ? null : PROVINCE_ID);
  };
  return (
    <DataTable
      data={props.data}
      selected={props.selected}
      onSelectRow={onSelectRowHandler}
      onDelete={props.onDelete}
    />
  );
};

export default SectionTableProvince;

const DataTable = (props) => {
  const styles = useStyles();
  const content = useMemo(() => {
    return (
      <Table className={styles.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell
              padding="none"
              style={{
                minWidth: "40px",
              }}
            >
              ID
            </TableCell>
            <TableCell
              padding="none"
              align="center"
              style={{
                minWidth: "80px",
              }}
            >
              จังหวัด
            </TableCell>
            <TableCell
              padding="none"
              align="center"
              style={{
                minWidth: "80px",
              }}
            >
              #
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((value) => {
            return (
              <TableRow
                key={value.PROVINCE_ID}
                selected={props.selected === value.PROVINCE_ID}
                className={styles.tableRow}
                classes={{
                  selected: styles.selected,
                }}
              >
                <TableCell
                  onClick={() => props.onSelectRow(value.PROVINCE_ID)}
                  padding="none"
                >
                  {value.PROVINCE_ID}
                </TableCell>
                <TableCell
                  onClick={() => props.onSelectRow(value.PROVINCE_ID)}
                  padding="none"
                >{`${value.PROVINCE_NAME}`}</TableCell>
                <TableCell padding="none" align="center">
                  <IconButton aria-label="edit" size="small">
                    <EditIcon fontSize="inherit" color="warning" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => props.onDelete(value.PROVINCE_ID)}
                  >
                    <DeleteIcon fontSize="inherit" color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }, [props.data, props.selected]);
  return content;
};
