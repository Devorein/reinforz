import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useContext } from "react";
import { RootContext } from "../../../context/RootContext";
import { useThemeSettings } from "../../../hooks";
import { CheckboxGroup, InputRange } from '../../../shared';
import { IPlaySettingsOptions } from "../../../types";
import { createDefaultPlaySettingsFiltersState, createDefaultPlaySettingsOptionsState } from "../../../utils";
import "./PlaySettings.scss";

export default function PlaySettings() {
  const { selectedQuizIds, playSettings, setPlaySettings, filteredQuizzes } = useContext(RootContext);
  const { theme } = useThemeSettings();

  const filteredQuestions = filteredQuizzes.reduce((acc, filteredQuiz) => acc += filteredQuiz.questions.length, 0);

  return <div className="PlaySettings" style={{ backgroundColor: theme.color.base, color: theme.palette.text.primary }}>
    <div className="PlaySettings-group PlaySettings-group--options">
      <div className="PlaySettings-group-header PlaySettings-group-header--options" style={{ backgroundColor: theme.color.dark }}>Options</div>
      <div className="PlaySettings-group-content PlaySettings-group-content--options" style={{ backgroundColor: theme.color.dark }}>
        {Object.keys(playSettings.options).map((key, index) => {
          let isDisabled = false;
          if (Boolean(key.match(/(shuffle_questions|shuffle_quizzes)/) && playSettings.options.flatten_mix)) isDisabled = true;
          if (selectedQuizIds.length <= 1 && key === "shuffle_quizzes") isDisabled = true;
          return <FormControlLabel key={key + index}
            control={
              <Checkbox
                disabled={isDisabled}
                checked={playSettings.options[key as keyof IPlaySettingsOptions]}
                onChange={(event, checked) => {
                  const newState = key === "flatten_mix" ? { ...playSettings, options: { ...playSettings.options, [event.target.name]: checked, shuffle_questions: checked, shuffle_quizzes: checked } } : { ...playSettings, options: { ...playSettings.options, [event.target.name]: checked } };
                  setPlaySettings(newState)
                  localStorage.setItem("PLAY_SETTINGS", JSON.stringify(newState))
                }}
                name={key}
                color="primary"
              />
            }
            label={key.split("_").map(k => k.charAt(0).toUpperCase() + k.substr(1)).join(" ")}
          />
        })}
      </div>
      <Button className="PlaySettings-group-button" variant="contained" color="primary" onClick={() => {
        setPlaySettings({ ...playSettings, options: createDefaultPlaySettingsOptionsState() })
      }}>Reset</Button>
    </div>
    <div className="PlaySettings-group PlaySettings-group--filters">
      <div className="PlaySettings-group-header PlaySettings-group-header--filters" style={{ backgroundColor: theme.color.dark }}>
        Filters
      </div>
      <div className="PlaySettings-group-content PlaySettings-group-content--filters" style={{ backgroundColor: theme.color.dark }}>
        <InputRange label={"Time Allocated range"} min={0} max={120} setState={(filters: any) => {
          setPlaySettings({ ...playSettings, filters })
        }} state={playSettings.filters} stateKey={"time_allocated"} />

        <CheckboxGroup label={'Excluded Difficulty'} items={['Beginner', 'Intermediate', 'Advanced']} setState={(filters: any) => {
          setPlaySettings({ ...playSettings, filters })
          localStorage.setItem('PLAY_SETTINGS', JSON.stringify({
            ...playSettings, filters
          }))
        }} stateKey={'excluded_difficulty'} state={playSettings.filters} />

        <CheckboxGroup label={'Excluded Type'} items={['FIB', 'MS', 'MCQ', "Snippet"]} setState={(filters: any) => {
          setPlaySettings({ ...playSettings, filters })
          localStorage.setItem('PLAY_SETTINGS', JSON.stringify({
            ...playSettings, filters
          }))
        }} stateKey={'excluded_types'} state={playSettings.filters} />
      </div>
      <Button className="PlaySettings-group-button" variant="contained" color="primary" onClick={() => {
        setPlaySettings({ ...playSettings, filters: createDefaultPlaySettingsFiltersState() })
      }}>Reset</Button>

    </div>
    <div className="PlaySettings-total" style={{ backgroundColor: theme.color.dark, color: filteredQuestions === 0 ? theme.palette.error.main : theme.palette.success.main }}>{filteredQuestions} Questions</div>
  </div>
}