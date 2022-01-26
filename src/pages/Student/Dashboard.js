import React, { useReducer } from "react";
import { useQuery, useMutation } from "react-query";
import {
  Box,
  Container,
  Grid,
  Button,
  Paper,
  Typography,
  TextField,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import _ from "lodash";
import { Helmet } from "react-helmet";
import axios from "../../axios/axios-api";
import BreadcrumbItem from "../../components/BreadcrumbItem/BreadcrumbItem";
import ErrorPage from "../../components/UI/Error/ErrorPage";
import Loading from "../../components/UI/Loading/Loading";

import Title from "../../components/UI/Title/Title";
import SectionCheckbox from "./SectionCheckbox";
import SectionCheckboxGeneral from "./SectionCheckboxGeneral";
import SectionOperateCheckbox from "./SectionOperateCheckbox";
import SectionTheoryCheckbox from "./SectionTheoryCheckbox";
import SectionPracticeCheckbox from "./SectionPracticeCheckbox";
import SectionOperateTheoryCheckbox from "./SectionOperateTheoryCheckbox";

const fetchDataRegister = async (txtSearch, rowsPerPage, page) => {
  const res = await axios.get(`effect-covid-learner-survey/survey/register`);
  return res.data;
};

const update = async (data) => {
  const endPoint = `effect-covid-learner-survey/survey/submit-form`;
  const res = await axios.post(endPoint, data);
  return res.data;
};

const Dashboard = () => {
  const alert = useAlert();
  const studentData = useSelector((state) => state.auth.studentData);
  const resDataRegister = useQuery(
    ["dataDataRegister"],
    () => fetchDataRegister(),
    {
      refetchOnWindowFocus: false,
    }
  );

  const schema = Yup.object().shape({
    ETC_A18: Yup.string()
      .when("A18", {
        is: true,
        then: Yup.string(),
        otherwise: Yup.string().notRequired().nullable(),
      })
      .nullable(),
  });

  const { register, handleSubmit, watch, setValue, errors, control, reset } =
    useForm({
      resolver: yupResolver(schema),
    });

  const resSubmitForm = useMutation(update, {
    onSuccess: () => {
      resDataRegister.refetch();
      alert.success("บันทึกข้อมูลเรียบร้อยแล้ว");
    },
    onError: (err) => {
      alert.error("มีบางอย่างผิดพลาด");
      console.log(err);
    },
  });

  const onToggleA18Handler = (event, index) => {
    setValue("ETC_A18", "");
  };

  const onSubmit = (data) => {
    resSubmitForm.mutate(data);
  };

  const checkSubjectType = (T, P, S) => {
    const TT = parseInt(T);
    const PP = parseInt(P);
    const SS = parseInt(S);

    if (PP > 100) {
      return 4; //ฝึกงาน
    } else if (PP === 0) {
      return 1; //บรรยาย
    } else if (TT != 0 && PP < 100 && SS != 0) {
      return 2; //ปฏิบัติ ทฤษฎี
    } else if (TT == 0 && PP < 100 && SS != 0) {
      return 3; //ปฏิบัติ
    } else {
      return 1;
    }
  };

  const link = [
    { label: "หน้าหลัก", href: "/" },
    {
      label: "แบบสอบถาม",
      href: "/manage-subject-from-pcru",
    },
  ];

  let content = <Loading />;
  if (!resDataRegister.isLoading) {
    if (resDataRegister.isError) {
      content = (
        <ErrorPage
          msgError={
            resDataRegister.error
              ? resDataRegister.error.response
                ? resDataRegister.error.response.data
                : JSON.stringify(resDataRegister.error.message)
              : ""
          }
        />
      );
    } else {
      const { registers, answer } = resDataRegister.data;
      const { ETC, SUBMIT_FORM } = answer;
      content = (
        <div>
          <Title title="แบบสํารวจสภาพปัญหาการจัดเรียนการสอนออนไลน์ในสถานการณ์การแพร่ระบาดของ โรคติดเชื้อไวรัสโคโรนา 19" />
          <Typography
            variant="button"
            display="block"
            gutterBottom
            color="secondary"
          >
            ในการเรียนภาคเรียนที่ 1/64 นักศึกษาเรียนทฤษฎี ฝึกปฏิบัติ
            สังเกตการณ์สอน ฝึกสอน ฝึกงาน รับการนิเทศ จากอาจารย์ผู้สอน
            ผ่านระบบอะไรบ้าง ตอบได้มากกว่า 1 ข้อ
          </Typography>
          <SectionCheckboxGeneral
            watch={watch("A18")}
            control={control}
            answer={answer}
            errors={errors}
            onchange={onToggleA18Handler}
            SUBMIT_FORM={SUBMIT_FORM}
          />
          <Typography
            variant="button"
            display="block"
            gutterBottom
            color="secondary"
          >
            ให้ นศ.ตอบโดยเลือกข้อที่ตรงสถานการณ์ที่ท่านมีปัญหา
            <u>
              <b>ในภาพรวม</b>
            </u>
            ข้อใดไม่มีปัญหาให้เว้นไว้
          </Typography>
          <SectionCheckbox
            control={control}
            answer={answer}
            SUBMIT_FORM={SUBMIT_FORM}
          />
          <Typography
            variant="button"
            display="block"
            gutterBottom
            color="secondary"
          >
            ให้ นศ. ตอบโดยเลือกข้อที่ตรงสถานการณ์ที่ท่านมีปัญหา
            <u>
              <b>ในแต่ละ รายวิชา</b>
            </u>
            ทุกวิชาข้อใดไม่มีปัญหาให้เว้นไว้
          </Typography>
          {registers.map((val, index) => {
            const bg = index % 2 == 0 ? "#EEEEEE" : "#FFFFFF";
            const subject = `${index + 1}. ${val.SUBJECT_CODE} ${
              val.SUBJECT_NAME
            } ${val.CREDIT}  ${val.DAY_NAME} ${val.TIME_FROM} - ${
              val.TIME_TO
            } น.`;
            const teacher = `ผู้สอน ${val.TEACHER}`;
            const defaultVal = {
              Q1: val.Q1,
              Q2: val.Q2,
              Q3: val.Q3,
              Q4: val.Q4,
              Q5: val.Q5,
              Q6: val.Q6,
              Q7: val.Q7,
              Q8: val.Q8,
              Q9: val.Q9,
              Q10: val.Q10,
              Q11: val.Q11,
              Q12: val.Q12,
            };
            return (
              <div key={index}>
                {checkSubjectType(val.T_HOUR, val.P_HOUR, val.S_HOUR) === 1 && (
                  <SectionTheoryCheckbox
                    BG={bg}
                    ID={val.F_ROWID_REGIS_D}
                    control={control}
                    teacher={teacher}
                    subject={subject}
                    defaultVal={defaultVal}
                    SUBMIT_FORM={SUBMIT_FORM}
                  />
                )}
                {checkSubjectType(val.T_HOUR, val.P_HOUR, val.S_HOUR) === 2 && (
                  <SectionOperateTheoryCheckbox
                    BG={bg}
                    ID={val.F_ROWID_REGIS_D}
                    control={control}
                    teacher={teacher}
                    subject={subject}
                    defaultVal={defaultVal}
                    SUBMIT_FORM={SUBMIT_FORM}
                  />
                )}
                {checkSubjectType(val.T_HOUR, val.P_HOUR, val.S_HOUR) === 3 && (
                  <SectionOperateCheckbox
                    BG={bg}
                    ID={val.F_ROWID_REGIS_D}
                    control={control}
                    teacher={teacher}
                    subject={subject}
                    defaultVal={defaultVal}
                    SUBMIT_FORM={SUBMIT_FORM}
                  />
                )}
                {checkSubjectType(val.T_HOUR, val.P_HOUR, val.S_HOUR) === 4 && (
                  <SectionPracticeCheckbox
                    BG={bg}
                    ID={val.F_ROWID_REGIS_D}
                    control={control}
                    teacher={teacher}
                    subject={subject}
                    defaultVal={defaultVal}
                    SUBMIT_FORM={SUBMIT_FORM}
                  />
                )}
              </div>
            );
          })}
          <div style={{ marginTop: 32 }}>
            <Controller
              as={
                <TextField
                  size={"small"}
                  variant="outlined"
                  style={{ width: 400 }}
                  margin="none"
                  multiline
                  rows={2}
                  disabled={SUBMIT_FORM}
                />
              }
              label={
                <Typography variant="body2" display="block" color="textPrimary">
                  ให้นักศึกษากรอกปัญหาอื่น ๆ (ถ้ามี)
                </Typography>
              }
              name="ETC"
              control={control}
              defaultValue={ETC}
            />
          </div>
          <Box sx={{ py: 2 }}>
            <Button
              disabled={
                SUBMIT_FORM === false && studentData.OPEN === true
                  ? false
                  : true
              }
              type="submit"
              variant="contained"
              color="primary"
            >
              ส่งคำตอบ
            </Button>
          </Box>
        </div>
      );
    }
  }

  return (
    <>
      <Helmet>
        <title>STUDENT | ตอบแบบสอบถาม</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <BreadcrumbItem links={link} />
          <Grid container>
            <Grid item xs={12} sm={12}>
              <form onSubmit={handleSubmit(onSubmit)}>{content}</form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
