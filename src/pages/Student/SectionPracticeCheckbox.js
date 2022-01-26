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
    borderBottom:`1px solid #cccccc`
  },
  subjectName: {
    color: theme.palette.text.secondary,
    fontSize: 13,
  },
  subjectContainer: {
    padding: 8,
  },
}));

const SectionPracticeCheckbox = (props) => {
  const styles = useStyles();
  const { Q8, Q9, Q10, Q11, Q12 } = props.defaultVal;
  return (
    <div style={{ backgroundColor: props.BG }}>
      <div className={styles.subjectContainer}>
        <Typography
          variant="body1"
          display="block"
          gutterBottom
          color="primary"
        >
          <u>
            {props.subject} {props.teacher}
          </u>
        </Typography>
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={Q8}
              name={`answer.${props.ID}.Q8`}
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                  disabled={props.SUBMIT_FORM}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              มีปัญหาการฝึกปฏิบัติงานในสถานประกอบการที่ไม่สามารถฝึกได้ต้องย้ายที่ฝึกงาน
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={Q9}
              name={`answer.${props.ID}.Q9`}
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                  disabled={props.SUBMIT_FORM}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              มีปัญหาการฝึกปฏิบัติงานในสถานประกอบการที่ฝึกได้บางงาน
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={Q10}
              name={`answer.${props.ID}.Q10`}
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                  disabled={props.SUBMIT_FORM}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              มีปัญหาเรื่องที่พักหรือการเดินทางที่ไม่สะดวกในช่วงสถานะการณ์โควิด
              19
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={Q11}
              name={`answer.${props.ID}.Q11`}
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                  disabled={props.SUBMIT_FORM}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              มีปัญหาการสื่อสารกับความเข้าใจกับพี่เลี้ยงที่ดูแลระหว่างฝึกงาน
            </Typography>
          }
        />
      </div>
      <div className={styles.checkBoxContainer}>
        <FormControlLabel
          control={
            <Controller
              control={props.control}
              defaultValue={Q12}
              name={`answer.${props.ID}.Q12`}
              render={({ onChange, value }) => (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                  disabled={props.SUBMIT_FORM}
                />
              )}
            />
          }
          label={
            <Typography variant="body2" display="block" color="textPrimary">
              มีปัญหาการรับการนิเทศจากอาจารย์นิเทศระหว่างฝึกงาน
            </Typography>
          }
        />
      </div>
    </div>
  );
};
export default SectionPracticeCheckbox;
