import React, { useReducer, useMemo, useState } from "react";
import { useQuery, useMutation } from "react-query";
import {
  Box,
  Container,
  Grid,
  Button,
  IconButton,
  InputBase,
  Paper,
} from "@material-ui/core";
import _ from "lodash";
import { Helmet } from "react-helmet";
import axios from "../../axios/axios-api";
import { makeStyles } from "@material-ui/styles";
import { Search as SearchIcon, Add as AddIcon } from "@material-ui/icons";
import BreadcrumbItem from "../../components/BreadcrumbItem/BreadcrumbItem";
import ErrorPage from "../../components/UI/Error/ErrorPage";
import Loading from "../../components/UI/Loading/Loading";
import DialogConfirmWithLoading from "../../components/UI/Dialog/DialogConfirmWithLoading";
import { Pagination } from "@material-ui/lab";

import SectionAddProvinceForm from "./SectionAddProvinceForm";
import SectionAddDistrictForm from "./SectionAddDistrictForm";
import SectionAddAmphurForm from "./SectionAddAmphurForm";
import SectionTableProvince from "./SectionTableProvince";
import SectionTableAmphur from "./SectionTableAmphur";

import SectionTableDistrict from "./SectionTableDistrict";
import Title from "../../components/UI/Title/Title";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //color: theme.main,
  },

  //   container: {
  //     padding: 10,
  //     backgroundColor: theme.palette.background.paper,
  //   },
  margin: {
    margin: 8,
  },
  inputSearch: {
    marginLeft: 8,
    flex: 1,
  },
  paper: {
    backgroundColor: theme.palette.primary.main,
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  btnContainer: {
    "& > *": {
      margin: "4px !important",
    },
    textAlign: "right",
  },
  test: {
    backgroundColor: theme.palette.primary.main,
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  tableRow: {
    "&$selected, &$selected:hover": {
      //backgroundColor: theme.palette.action.selected,
    },
  },
  hover: {},
  selected: {},
}));

const reducer = (state, action) => {
  switch (action.type) {
    case "ON_SEARCH":
      return { ...state, ...{ page: 1 } };
    case "ON_CHANGE_ROW_PER_PAGE":
      return { ...state, ...{ rowsPerPage: action.rowsPerPage, page: 1 } };
    case "ON_CHANGE_PAGE":
      return { ...state, ...{ page: action.page } };
    case "ON_CHANGE_INPUT":
      return { ...state, ...{ txtSearch: action.txtSearch } };
    case "ON_OPEN_ADD_PROVINCE_FORM":
      return { ...state, ...{ openAddProvinceForm: true } };
    case "ON_CLOSE_ADD_PROVINCE_FORM":
      return { ...state, ...{ openAddProvinceForm: false } };
    case "ON_OPEN_ADD_AMPHUR_FORM":
      return { ...state, ...{ openAddAmphurForm: true } };
    case "ON_CLOSE_ADD_AMPHUR_FORM":
      return { ...state, ...{ openAddAmphurForm: false } };
    case "ON_OPEN_ADD_DISTRICT_FORM":
      return { ...state, ...{ openAddDistrictForm: true } };
    case "ON_CLOSE_ADD_DISTRICT_FORM":
      return { ...state, ...{ openAddDistrictForm: false } };
    case "ON_OPEN_DELETE_PROVINCE_CONFIRM":
      return {
        ...state,
        ...{ openDCDeleteProvince: true, PROVINCE_ID: action.PROVINCE_ID },
      };
    case "ON_CLOSE_DELETE_PROVINCE_CONFIRM":
      return {
        ...state,
        ...{ openDCDeleteProvince: false },
      };
    case "ON_RESET_PROVINCE_ID_FOR_DELETE":
      return {
        ...state,
        ...{ PROVINCE_ID: null },
      };

    case "ON_OPEN_DELETE_SUBJECT_FROM_PCRU_CONFIRM":
      return { ...state, ...{ openDeleteSubjectFromPcruConfirm: true } };
    case "ON_CLOSE_DELETE_SUBJECT_FROM_PCRU_CONFIRM":
      return {
        ...state,
        ...{ openDeleteSubjectFromPcruConfirm: false },
      };
    default:
      return state;
  }
};

const fetchDataProvince = async (txtSearch, rowsPerPage, page) => {
  const res = await axios.get(
    `lifelong/province/data-province?filter[PROVINCE_NAME]=${txtSearch}&results=${rowsPerPage}&sortBy=ASC&page=${page}`
  );
  return res.data;
};

const fetchDataAmphur = async (selectedRowTableProvince) => {
  const res = await axios.get(
    `lifelong/province/data-amphur/${selectedRowTableProvince}`
  );
  return res.data;
};

const fetchDataDistrict = async (selectedRowTableDistrict) => {
  const res = await axios.get(
    `lifelong/province/data-district/${selectedRowTableDistrict}`
  );
  return res.data;
};

const deleteProvince = async (data) => {
  const endPoint = `lifelong/province/delete-province`;
  const res = await axios.post(endPoint, data);
  return res.data;
};

const deleteSubjectFromPcruPaired = async (data) => {
  const endPoint = `except-subject/subject-from-pcru/delete-subject-from-pcru`;
  const res = await axios.post(endPoint, data);
  return res.data;
};

const Province = () => {
  const styles = useStyles();
  const initState = {
    txtSearch: "",
    page: 1,
    rowsPerPage: 20,
    openAddProvinceForm: false,
    openAddAmphurForm: false,
    openAddDistrictForm: false,
    openDCDeleteProvince: false,
    openDeleteSubjectFromPcruConfirm: false,
    PROVINCE_ID: null,
  };
  const [selectedRowTableProvince, setSelectedRowTableProvince] = useState(1);
  const [selectedRowTableAmphur, setSelectedRowTableAmphur] = useState(1);
  const [selectedRowTableDistrict, setSelectedRowTableDistrict] =
    useState(null);

  const [state, dispatchState] = useReducer(reducer, initState);

  const resDataProvince = useQuery(
    ["dataDataProvince", state.rowsPerPage, state.page],
    () => fetchDataProvince(state.txtSearch, state.rowsPerPage, state.page),
    {
      refetchOnWindowFocus: false,
    }
  );

  const resDataAmphur = useQuery(
    ["dataDataAmphur", selectedRowTableProvince],
    () => fetchDataAmphur(selectedRowTableProvince),
    {
      refetchOnWindowFocus: false,
    }
  );

  const resDataDistrict = useQuery(
    ["dataDataDistrict", selectedRowTableAmphur, selectedRowTableProvince],
    () => fetchDataDistrict(selectedRowTableAmphur),
    {
      refetchOnWindowFocus: false,
    }
  );

  const resDeleteProvince = useMutation(deleteProvince, {
    onSuccess: () => {
      resDataProvince.refetch();
      onCloseDCDeleteProvinceHandler();
      setSelectedRowTableAmphur(null);
      setSelectedRowTableDistrict(null);
      dispatchState({ type: "ON_RESET_PROVINCE_ID_FOR_DELETE" });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const resDeleteSubjectFromPcruPaired = useMutation(
    deleteSubjectFromPcruPaired,
    {
      onSuccess: () => {
        resDataAmphur.refetch();
        resDataProvince.refetch();
        onCloseDialogConfirmDeleteSubjectFromPcruPaired();
        setSelectedRowTableProvince(null);
        setSelectedRowTableAmphur(null);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const onSearchHandler = () => {
    dispatchState({
      type: "ON_SEARCH",
      page: 1,
    });
    resDataProvince.refetch();
    setSelectedRowTableAmphur(null);
    setSelectedRowTableProvince(null);
  };

  const onChangePageHandler = (event, newPage) => {
    setSelectedRowTableAmphur(null);
    setSelectedRowTableProvince(null);
    dispatchState({
      type: "ON_CHANGE_PAGE",
      page: newPage,
    });
  };

  const onChangeSearchInputHandler = (e) => {
    const { value } = e.target;
    dispatchState({
      type: "ON_CHANGE_INPUT",
      txtSearch: value,
    });
  };

  const onKeyPressSearchHandler = (e) => {
    if (e.keyCode === 13) {
      onSearchHandler();
      e.stopPropagation();
    }
  };

  const onSetSelectedRowTableProvinceHandler = (PROVINCE_ID) => {
    setSelectedRowTableProvince(
      selectedRowTableProvince === PROVINCE_ID ? null : PROVINCE_ID
    );
    setSelectedRowTableAmphur(null);
  };

  const onSetSelectedRowTableAmphurHandler = (AMPHUR_ID) => {
    setSelectedRowTableAmphur(
      selectedRowTableAmphur === AMPHUR_ID ? null : AMPHUR_ID
    );
  };

  const onSetSelectedRowTableDistrictHandler = (DISTRICT_ID) => {
    setSelectedRowTableDistrict(
      selectedRowTableDistrict === DISTRICT_ID ? null : DISTRICT_ID
    );
  };

  const onOpenProvinceForm = () => {
    dispatchState({
      type: "ON_OPEN_ADD_PROVINCE_FORM",
    });
  };

  const onCloseAddProvinceForm = () => {
    dispatchState({
      type: "ON_CLOSE_ADD_PROVINCE_FORM",
    });
  };

  const onOpenAddAmphurForm = () => {
    dispatchState({
      type: "ON_OPEN_ADD_AMPHUR_FORM",
    });
  };

  const onCloseAddAmphurForm = () => {
    dispatchState({
      type: "ON_CLOSE_ADD_AMPHUR_FORM",
    });
    setSelectedRowTableAmphur(null);
  };

  const onOpenAddDistrictForm = () => {
    dispatchState({
      type: "ON_OPEN_ADD_DISTRICT_FORM",
    });
  };

  const onCloseAddDistrictForm = () => {
    dispatchState({
      type: "ON_CLOSE_ADD_DISTRICT_FORM",
    });
    setSelectedRowTableDistrict(null);
  };

  const onDeleteProvinceHandler = async () => {
    resDeleteProvince.mutate({
      PROVINCE_ID: state.PROVINCE_ID,
    });
  };

  const onDeleteSubjectFromPcruPairedHandler = async () => {
    resDeleteSubjectFromPcruPaired.mutate({
      id: selectedRowTableProvince,
    });
  };

  const onOpenDCDeleteProvinceHandler = (PROVINCE_ID) => {
    dispatchState({
      type: "ON_OPEN_DELETE_PROVINCE_CONFIRM",
      PROVINCE_ID: PROVINCE_ID,
    });
  };

  const onCloseDCDeleteProvinceHandler = () => {
    dispatchState({
      type: "ON_CLOSE_DELETE_PROVINCE_CONFIRM",
    });
    dispatchState({ type: "ON_RESET_PROVINCE_ID_FOR_DELETE" });
    resDeleteProvince.reset();
  };

  const onOpenDialogConfirmDeleteSubjectFromPcru = () => {
    dispatchState({
      type: "ON_OPEN_DELETE_SUBJECT_FROM_PCRU_CONFIRM",
    });
  };

  const onCloseDialogConfirmDeleteSubjectFromPcruPaired = () => {
    dispatchState({
      type: "ON_CLOSE_DELETE_SUBJECT_FROM_PCRU_CONFIRM",
    });
    resDeleteSubjectFromPcruPaired.reset();
  };

  const addProvinceForm = useMemo(() => {
    return (
      <SectionAddProvinceForm
        open={state.openAddProvinceForm}
        close={onCloseAddProvinceForm}
        refreshData={resDataProvince.refetch}
      />
    );
  }, [state.openAddProvinceForm]);

  const addAmphurForm = useMemo(() => {
    return (
      <SectionAddAmphurForm
        open={state.openAddAmphurForm}
        close={onCloseAddAmphurForm}
        refreshData={resDataAmphur.refetch}
        provinceID={selectedRowTableProvince}
      />
    );
  }, [state.openAddAmphurForm]);

  const addDistrictForm = useMemo(() => {
    return (
      <SectionAddDistrictForm
        open={state.openAddDistrictForm}
        close={onCloseAddDistrictForm}
        refreshData={resDataDistrict.refetch}
        provinceID={selectedRowTableProvince}
        amphurID={selectedRowTableAmphur}
      />
    );
  }, [state.openAddDistrictForm]);

  const DCDeleteProvince = (
    <DialogConfirmWithLoading
      title="ลบข้อมูลจังหวัด"
      msg="ยืนยันการลบข้อมูลที่เลือก"
      handleConfirm={onDeleteProvinceHandler}
      handleClose={onCloseDCDeleteProvinceHandler}
      open={state.openDCDeleteProvince}
      isError={resDeleteProvince.isError}
      isLoading={resDeleteProvince.isLoading}
      msgLoading="กำลังลบข้อมูลที่เลือก..."
      msgError={
        resDeleteProvince.error
          ? resDeleteProvince.error.response
            ? resDeleteProvince.error.response.data
            : JSON.stringify(resDeleteProvince.error.message)
          : ""
      }
    />
  );

  //   const dialogConfirmDeleteSubjectFromPcruPaired = (
  //     <DialogConfirmWithLoading
  //       title="ลบข้อมูลรายวิชาในมหาวิทยาลัย"
  //       msg="ยืนยันการลบข้อมูลที่เลือก"
  //       handleConfirm={onDeleteSubjectFromPcruPairedHandler}
  //       handleClose={onCloseDialogConfirmDeleteSubjectFromPcruPaired}
  //       open={state.openDeleteSubjectFromPcruConfirm}
  //       isError={resDeleteSubjectFromPcruPaired.isError}
  //       isLoading={resDeleteSubjectFromPcruPaired.isLoading}
  //       msgLoading="กำลังลบข้อมูลที่เลือก..."
  //       msgError={
  //         resDeleteSubjectFromPcruPaired.error
  //           ? resDeleteSubjectFromPcruPaired.error.response
  //             ? resDeleteSubjectFromPcruPaired.error.response.data
  //             : JSON.stringify(resDeleteSubjectFromPcruPaired.error.message)
  //           : ""
  //       }
  //     />
  //   );

  const link = [
    { label: "หน้าหลัก", href: "/" },
    {
      label: "ข้อมูลจังหวัด",
      href: "/manage-subject-from-pcru",
    },
  ];

  let countPage = 1;
  let contentProvince = <Loading />;
  if (!resDataProvince.isLoading) {
    if (resDataProvince.isError) {
      contentProvince = (
        <ErrorPage
          msgError={
            resDataProvince.error
              ? resDataProvince.error.response
                ? resDataProvince.error.response.data
                : JSON.stringify(resDataProvince.error.message)
              : ""
          }
        />
      );
    } else {
      const { recordsTotal, results } = resDataProvince.data.info;
      contentProvince = (
        <SectionTableProvince
          data={resDataProvince.data.results}
          selected={selectedRowTableProvince}
          onSelectRow={onSetSelectedRowTableProvinceHandler}
          onDelete={onOpenDCDeleteProvinceHandler}
        />
      );
      countPage = Math.ceil(recordsTotal / results);
    }
  }

  let contentAmphur = <Loading />;
  if (!resDataAmphur.isLoading) {
    if (resDataAmphur.isError) {
      contentAmphur = (
        <ErrorPage
          msgError={
            resDataAmphur.error
              ? resDataAmphur.error.response
                ? resDataAmphur.error.response.data
                : JSON.stringify(resDataAmphur.error.message)
              : ""
          }
        />
      );
    } else {
      contentAmphur = (
        <SectionTableAmphur
          data={resDataAmphur.data}
          onSelectRow={onSetSelectedRowTableAmphurHandler}
          selected={selectedRowTableAmphur}
        />
      );
    }
  }

  let contentDistrict = <Loading />;
  if (!resDataDistrict.isLoading) {
    if (resDataDistrict.isError) {
      contentDistrict = (
        <ErrorPage
          msgError={
            resDataDistrict.error
              ? resDataDistrict.error.response
                ? resDataDistrict.error.response.data
                : JSON.stringify(resDataDistrict.error.message)
              : ""
          }
        />
      );
    } else {
      contentDistrict = (
        <SectionTableDistrict
          data={resDataDistrict.data}
          onSelectRow={onSetSelectedRowTableDistrictHandler}
          selected={selectedRowTableDistrict}
        />
      );
    }
  }
  console.log("DCDeleteProvince=", state.openDCDeleteProvince);

  return (
    <>
      <Helmet>
        <title>Admin | ข้อมูลจังหวัด</title>
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
          {addProvinceForm}
          {addAmphurForm}
          {addDistrictForm}
          {DCDeleteProvince}
          {/*{DCDeleteProvince}
        {dialogConfirmDeleteSubjectFromPcruPaired} */}
          <Grid container>
            <Grid item xs={12} sm={8}>
              <Paper className={styles.paper}>
                <InputBase
                  size="small"
                  className={styles.inputSearch}
                  placeholder="ค้นหา..."
                  onChange={onChangeSearchInputHandler}
                  value={state.txtSearch}
                  onKeyDown={onKeyPressSearchHandler}
                />
                <IconButton
                  color="primary"
                  className={styles.iconButton}
                  aria-label="search"
                  onClick={() => onSearchHandler()}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
            <Grid container item xs={12} sm={4} justify="flex-end">
              <div className={styles.btnContainer}>
                <Button
                  onClick={onOpenProvinceForm}
                  variant="contained"
                  size="small"
                  color="primary"
                  startIcon={<AddIcon />}
                >
                  จังหวัด
                </Button>
                <Button
                  onClick={onOpenAddAmphurForm}
                  variant="contained"
                  size="small"
                  color="info"
                  disabled={!selectedRowTableProvince}
                  startIcon={<AddIcon />}
                >
                  อำเภอ
                </Button>
                <Button
                  onClick={onOpenAddDistrictForm}
                  variant="contained"
                  size="small"
                  color="secondary"
                  disabled={!selectedRowTableAmphur}
                  startIcon={<AddIcon />}
                >
                  ตำบล
                </Button>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper className={"responsive"}>
                <Title title="ข้อมูลจังหวัด" />
                {contentProvince}
              </Paper>
              <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  <Pagination
                    count={countPage}
                    defaultPage={1}
                    variant="outlined"
                    shape="rounded"
                    page={state.page}
                    onChange={onChangePageHandler}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={"responsive"}>
                <Title title="ข้อมูลอำเภอ" />
                {contentAmphur}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={"responsive"}>
                <Title title="ข้อมูลตำบล" />
                {contentDistrict}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Province;
