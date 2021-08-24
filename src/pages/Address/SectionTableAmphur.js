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

const SectionTableAmphur = (props) => {
  const onSelectRowHandler = (AMPHUR_ID) => {
    props.onSelectRow(props.selected === AMPHUR_ID ? null : AMPHUR_ID);
  };
  return (
    <DataTable
      data={props.data}
      selected={props.selected}
      onSelectRow={onSelectRowHandler}
    />
  );
};

export default SectionTableAmphur;

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
                minWidth: "20px",
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
              อำเภอ
            </TableCell>
            <TableCell
              padding="none"
              align="center"
              style={{
                minWidth: "60px",
              }}
            >
              รหัสไปรษณีย์
            </TableCell>
            <TableCell
              padding="none"
              align="center"
              style={{
                minWidth: "40px",
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
                key={value.AMPHUR_ID}
                onClick={() => props.onSelectRow(value.AMPHUR_ID)}
                selected={props.selected === value.AMPHUR_ID}
                className={styles.tableRow}
                classes={{
                  selected: styles.selected,
                }}
              >
                <TableCell padding="none">{value.AMPHUR_ID}</TableCell>
                <TableCell padding="none">{`${value.AMPHUR_NAME}`}</TableCell>
                <TableCell
                  align="center"
                  padding="none"
                >{`${value.POSTCODE}`}</TableCell>
                <TableCell align="center" padding="none">
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
