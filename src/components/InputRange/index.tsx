import { FormGroup, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import useSounds from "../../hooks/useSounds";
import { TNumberOperator } from "../../types";
import { transformTextBySeparator } from "../../utils";

export interface InputRangeProps<T extends Record<string, any>> {
  label: string
  state: T,
  stateKey: keyof T
  setState: React.Dispatch<React.SetStateAction<T>>
  min: number
  max: number
  step?: number
  direction?: 'row' | 'column'
  classNames?: {
    formGroup?: string
    inputLabel?: string
    content?: string
    operatorSelect?: string
    numberField?: string
  }
}

export default function InputRange<T extends Record<string, any>>(props: InputRangeProps<T>) {
  const { direction = 'row', min, max, setState, state, stateKey, label, step = 5, classNames = {} } = props;
  const { click } = useSounds();
  const containerPaddingClass = direction === 'row' ? 'pr-0' : 'pb-0', itemMarginClass = direction === 'row' ? 'mr-5' : 'mb-5'
  const [operator, range]: [TNumberOperator, [string, string]] = state[stateKey]
  return <FormGroup className={`InputRange p-5 ${classNames.formGroup ?? ''}`}>
    <InputLabel className={`${classNames.inputLabel ?? ''}`}>{label}</InputLabel>
    <div style={{ flexDirection: direction }} className={`InputRange-content bg-dark p-5 ${containerPaddingClass} flex ${classNames.content ?? ''}`}>
      <div className={`bg-light flex p-5 fd-c ${itemMarginClass}`}>
        <Select disableUnderline className={`${classNames.operatorSelect ?? ''}`} value={operator}
          onChange={(e) => {
            setState({ ...state, [stateKey]: [e.target.value, range] })
            click()
          }}>
          {["=", "<=", "<>", ">=", "<", ">", "!", "><"].map(item =>
            <MenuItem key={item} value={item}>{transformTextBySeparator(item)}</MenuItem>
          )}
        </Select>
      </div>
      <TextField InputProps={{ disableUnderline: true }} className={`flex-1 ${itemMarginClass} ${classNames.numberField ?? ''}`} type="number" inputProps={{ step, min, max: parseInt(range[1]) }} value={parseInt(range[0])} onChange={(e) => {
        setState({ ...state, [stateKey]: [operator, [e.target.value, parseInt(range[1])]] })
        click()
      }} />
      {["<>", "><"].includes(operator) && <TextField InputProps={{ disableUnderline: true }} className={`flex-1 ${itemMarginClass} ${classNames.numberField ?? ''}`} type="number" inputProps={{ step, min: parseInt(range[0]), max }} value={parseInt(range[1])} onChange={(e) => {
        click()
        setState({ ...state, [stateKey]: [operator, [parseInt(range[0]), e.target.value]] })
      }} />}
    </div>
  </FormGroup>
}