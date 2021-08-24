import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormControl";
import { TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  helperText: {
    color: "red",
    fontSize: 12,
  },
}));

const FormControlLabelPlacement = (props) => {
  const styles = useStyles();
  return (
    <Grid container>
      <Grid item>
        <Controller
          control={props.control}
          defaultValue={props.value}
          name={`answer.${props.name}.teach`}
          render={({ name, onBlur, onChange, value }) => (
            <div>
              <RadioGroup
                key={props.name}
                row
                value={value}
                defaultValue={props.value}
                onChange={(e) => {
                  onChange(e);
                  props.onchange();
                }}
              >
                <FormControlLabel
                  value="L"
                  control={
                    <Radio
                      color="secondary"
                      disabled={
                        props.check && props.submit === "N" ? false : true
                      }
                    />
                  }
                  label=""
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="S"
                  control={
                    <Radio
                      color="primary"
                      disabled={
                        props.check && props.submit === "N" ? false : true
                      }
                    />
                  }
                  label=""
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="B"
                  control={
                    <Radio
                      color="default"
                      disabled={
                        props.check && props.submit === "N" ? false : true
                      }
                    />
                  }
                  label=""
                  labelPlacement="end"
                />
              </RadioGroup>
              {props.errors.answer?.[props.name]?.teach ? (
                <FormHelperText className={styles.helperText}>
                  {props.errors.answer?.[props.name]?.teach?.message}
                </FormHelperText>
              ) : null}
            </div>
          )}
        />
      </Grid>
      <Grid item>
        <Controller
          as={
            <TextField
              size={"small"}
              variant="outlined"
              style={{ width: 250 }}
              margin="none"
              disabled={
                props.value === "B" &&
                props.watch === undefined &&
                props.submit === "N"
                  ? false
                  : props.watch?.[props.name]?.teach === "B" &&
                    props.submit === "N"
                  ? false
                  : true
              }
              error={!!props.errors.answer?.[props.name]?.note}
              helperText={props.errors.answer?.[props.name]?.note?.message}
            />
          }
          name={`answer.${props.name}.note`}
          control={props.control}
          defaultValue={props.note === null ? "" : props.note}
        />
        <Controller
          as={<input type="hidden" />}
          name={`answer.${props.name}.ID`}
          control={props.control}
          defaultValue={props.ID}
        />
        <Controller
          as={<input type="hidden" />}
          name={`answer.${props.name}.validate`}
          control={props.control}
          defaultValue={props.validation}
        />
      </Grid>
    </Grid>
  );
};
export default FormControlLabelPlacement;
