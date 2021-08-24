import React from "react";

import { Typography } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  checkBoxContainer: {
    marginLeft: 8,
  },
}));

const SectionCheckbox = (props) => {
  const styles = useStyles();
  return (
    <>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={false}
              name="A1"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              1. ที่บ้านพัก
              <u>
                <b>ไม่มี</b>
              </u>
              สัญญาณอินเทอร์เน็ต
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={false}
              name="A2"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              2. ที่บ้านพักสัญญาณอินเทอร์เน็ต
              <u>
                <b>ไม่แรง</b>
              </u>
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={false}
              name="A3"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                />
              )}
            />
          }
          label={
            <Typography variant="body4" display="block" color="textPrimary">
              3. ขณะเรียนสัญญาณอินเทอร์เน็ตหลุดเป็นระยะ
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={false}
              name="A4"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              4. ขณะเรียนเสียงหรือภาพ
              <u>
                <b>ไม่ชัดเจน</b>
              </u>
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={false}
              name="A5"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              5. สภาพแวดล้อมที่บ้านพักขณะเรียน
              <u>
                <b>ไม่เหมาะสม</b>
              </u>
              มีสิ่งรบกวนทำให้ขาดสมาธิ
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={false}
              name="A6"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              6. มีปัญหาค่าใช้จ่ายที่เพิ่มขึ้นจากการเรียนออนไลน์
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={false}
              name="A7"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              7. มีปัญหาความไม่พร้อมของอุปกรณ์ที่ใช้ในการเรียนเช่น สมาร์ทโฟน
              แท๊บเล็ต โน๊ตบุ๊ต คอมพิวเตอร์ ฯลฯ
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={false}
              name="A8"
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              8.
              มีปัญหาความเมื่อยล้าและเครียดในการเรียนผ่านระบบออนไลน์กับหน้าจอสมาร์ทโฟนที่มีขนาดเล็ก
            </Typography>
          }
        />
      </div>
    </>
  );
};
export default SectionCheckbox;
