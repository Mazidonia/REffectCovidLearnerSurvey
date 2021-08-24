import React, { useReducer } from "react";
import { useQuery, useMutation } from "react-query";
import {
  Box,
  Container,
  Grid,
  Button,
  Paper,
  Typography,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { useAlert } from "react-alert";
import _ from "lodash";
import { Helmet } from "react-helmet";
import axios from "../../axios/axios-api";
import { makeStyles } from "@material-ui/styles";
import BreadcrumbItem from "../../components/BreadcrumbItem/BreadcrumbItem";
import ErrorPage from "../../components/UI/Error/ErrorPage";
import Loading from "../../components/UI/Loading/Loading";

import Title from "../../components/UI/Title/Title";
import SectionCheckbox from "./SectionCheckbox";
import SectionOperateCheckbox from "./SectionOperateCheckbox";
import SectionTheoryCheckbox from "./SectionTheoryCheckbox";
import SectionPracticeCheckbox from "./SectionPracticeCheckbox";
import SectionOperateTheoryCheckbox from "./SectionOperateTheoryCheckbox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //color: theme.main,
  },
  inputSearch: {
    marginLeft: 8,
    flex: 1,
  },
  subjectName: {
    color: theme.palette.text.secondary,
    fontSize: 13,
  },
  btnContainer: {
    "& > *": {
      margin: "4px !important",
    },
    textAlign: "right",
  },
  checkBoxContainer: {
    marginLeft: 8,
  },
  subjectContainer: {
    padding: 8,
  },
  hover: {},
  selected: {},
}));

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

  const resDataRegister = useQuery(
    ["dataDataRegister"],
    () => fetchDataRegister(),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { register, handleSubmit, watch, setValue, errors, control, reset } =
    useForm({
      //resolver: yupResolver(schema),
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

  const onSubmit = (data) => {
    console.log(data);
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

  const question = [{}];

  let countPage = 1;
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
      content = (
        <Paper className={"responsive"}>
          <Title title="แบบสํารวจสภาพปัญหาการจัดเรียนการสอนออนไลน์ในสถานการณ์การแพร่ระบาดของ โรคติดเชื้อไวรัสโคโรนา 19" />
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
          <SectionCheckbox control={control} />{" "}
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
          {resDataRegister.data.map((val, index) => {
            const bg = index % 2 == 0 ? "#EEEEEE" : "#FFFFFF";
            const subject = `${index + 1}. ${val.SUBJECT_CODE} ${
              val.SUBJECT_NAME
            } ${val.CREDIT}  ${val.DAY_NAME} ${val.TIME_FROM} - ${
              val.TIME_TO
            } น.`;
            const teacher = `ผู้สอน ${val.TEACHER}`;

            return (
              <div key={index}>
                {checkSubjectType(val.T_HOUR, val.P_HOUR, val.S_HOUR) === 1 && (
                  <SectionTheoryCheckbox
                    BG={bg}
                    ID={val.F_ROWID_REGIS_D}
                    control={control}
                    teacher={teacher}
                    subject={subject}
                  />
                )}
                {checkSubjectType(val.T_HOUR, val.P_HOUR, val.S_HOUR) === 2 && (
                  <SectionOperateTheoryCheckbox
                    BG={bg}
                    ID={val.F_ROWID_REGIS_D}
                    control={control}
                    teacher={teacher}
                    subject={subject}
                  />
                )}
                {checkSubjectType(val.T_HOUR, val.P_HOUR, val.S_HOUR) === 3 && (
                  <SectionOperateCheckbox
                    BG={bg}
                    ID={val.F_ROWID_REGIS_D}
                    control={control}
                    teacher={teacher}
                    subject={subject}
                  />
                )}
                {checkSubjectType(val.T_HOUR, val.P_HOUR, val.S_HOUR) === 4 && (
                  <SectionPracticeCheckbox
                    BG={bg}
                    ID={val.F_ROWID_REGIS_D}
                    control={control}
                    teacher={teacher}
                    subject={subject}
                  />
                )}
              </div>
            );
          })}
        </Paper>
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
              <form onSubmit={handleSubmit(onSubmit)}>
                {content}
                <Box sx={{ py: 2 }}>
                  <Button
                    // disabled={
                    //   checkDisableButtonSubmit() || resQ.isLoading || !teacherData.Q
                    // }
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    ส่งคำตอบ
                  </Button>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
