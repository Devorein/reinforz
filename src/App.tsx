import { makeStyles, useTheme } from "@material-ui/core";
import { useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Create } from "./components/Create/Create";
import Play from "./components/Play/Play";
import Quiz from "./components/Quiz/Quiz";
import Report from "./components/Report/Report";
import Settings from "./components/Settings/Settings";
import { ModalContext } from './context/ModalContext';
import { SettingsContext } from "./context/SettingsContext";
import { NotFoundPage, SimpleModal } from "./shared";
import { ExtendedTheme } from "./types";

const useStyles = makeStyles((theme: ExtendedTheme) => ({
  root: {
    "& ::-webkit-scrollbar": {
      width: 10
    },
    "& ::-webkit-scrollbar-track": {
      backgroundColor: theme.color.dark
    },
    "& ::-webkit-scrollbar-thumb": {
      backgroundColor: theme.color.light
    },
    "& pre": {
      background: theme.color.dark
    },
    '& :not(pre) > code[class*="language-"]': {
      background: theme.color.dark
    }
  }
}));

export default function App() {
  const [modalState, setModalState] = useState<[boolean, JSX.Element | null]>([false, null]);
  const theme = useTheme() as ExtendedTheme;
  const classes = useStyles();
  const { settings } = useContext(SettingsContext);

  return <ModalContext.Provider value={{ modalState, setModalState }}>
    <div className={`App ${theme.theme} ${classes.root}`} style={{ fontFamily: settings.font === 'sans-serif' ? 'Lato' : settings.font === 'serif' ? 'Noto Serif' : 'Ubuntu Mono', backgroundColor: theme.color.dark }}>
      <SimpleModal open={modalState[0]} setOpen={() => setModalState([false, null])}>
        <div className="Modal-content">
          {modalState[1]}
        </div>
      </SimpleModal>
      <Switch>
        <Route exact path="/" render={() => <Play />} />
        <Route exact path="/settings" render={() => <Settings />} />
        <Route exact path="/create" render={() => <Create />} />
        <Route exact path="/report" render={() => <Report />} />
        <Route exact path="/play" render={() => <Quiz />} />
        <Route path="*" render={() => <NotFoundPage />} />
      </Switch>
    </div>
  </ModalContext.Provider>
}