import { FormGroup, InputLabel, TextField } from "@material-ui/core";
import { useThemeSettings } from "../../hooks";

interface Props<T extends Record<string, any>> {
  label: string
  state: T,
  stateKey: keyof T
  setState: React.Dispatch<React.SetStateAction<T>>
  min: number
  max: number
}

export default function InputRange<T extends Record<string, any>>(props: Props<T>) {
  const { min, max, setState, state, stateKey, label } = props;
  const { theme } = useThemeSettings();
  const range: [number, number] = state[stateKey]
  return <FormGroup>
    <InputLabel>{label}</InputLabel>
    <div style={{ background: theme.color.dark, display: 'flex', flexDirection: 'column' }} className="InputRange-content">
      <TextField type="number" inputProps={{ step: 5, min, max: range[1] }} value={range[0]} onChange={(e) => {
        setState({ ...state, [stateKey]: [e.target.value, range[1]] })
      }} />
      <TextField type="number" inputProps={{ step: 5, min: range[0], max }} value={range[1]} onChange={(e) => {
        setState({ ...state, [stateKey]: [range[0], e.target.value] })
      }} />
    </div>
  </FormGroup>
}