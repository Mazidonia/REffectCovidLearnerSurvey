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

const SectionTableDistrict = (props) => {
  const onSelectRowHandler = (DISTRICT_ID) => {
    props.onSelectRow(props.selected === DISTRICT_ID ? null : DISTRICT_ID);
  };
  return (
    <DataTable
      data={props.data}
      selected={props.selected}
      onSelectRow={onSelectRowHandler}
    />
  );
};

export default SectionTableDistrict;

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
              ตำบล
            </TableCell>
            <TableCell
              padding="none"
              align="center"
              style={{
                minWidth: "80px",
              }}
            >
              รหัสไปรษณีย์
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((value) => {
            return (
              <TableRow
                key={value.DISTRICT_ID}
                onClick={() => props.onSelectRow(value.DISTRICT_ID)}
                selected={props.selected === value.DISTRICT_ID}
                className={styles.tableRow}
                classes={{
                  selected: styles.selected,
                }}
              >
                <TableCell padding="none">{value.DISTRICT_ID}</TableCell>
                <TableCell padding="none">{`${value.DISTRICT_NAME}`}</TableCell>
                <TableCell padding="none" align="center">
                  <IconButton aria-label="edit" size="small">
                    <EditIcon fontSize="inherit" color="warning" />
                  </IconButton>
                  <IconButton aria-label="delete" size="small">
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
