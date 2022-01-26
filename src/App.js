import "react-perfect-scrollbar/dist/css/styles.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRoutes, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { QueryClient, QueryClientProvider } from "react-query";

import GlobalStyles from "./components/GlobalStyles";
import { theme } from "./theme/index";
import routes from "./routes/routes";
import * as actions from "./store/actions/index";
const queryClient = new QueryClient();

const options = {
  timeout: 3500,
  position: positions.BOTTOM_CENTER,
};

const themeMUI = createTheme(theme);
const App = () => {
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const dispatch = useDispatch();
  //const [location, setLocation] = useState("/questionnaire");
  //const locate = useLocation();

  useEffect(() => {
    dispatch(actions.authCheckState())
      .then((res) => {
        console.log(res);
        //return () => setLocation(locate.pathname);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const routing = useRoutes(routes(refreshToken !== null));

  return (
    <ThemeProvider theme={themeMUI}>
      <QueryClientProvider client={queryClient}>
        <Provider template={AlertTemplate} {...options}>
          <GlobalStyles />
          {routing}
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
