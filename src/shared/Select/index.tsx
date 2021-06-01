import { FormGroup, InputLabel, MenuItem, Select as MuiSelect } from "@material-ui/core";
import { useThemeSettings } from "../../hooks";

interface Props<T extends Record<string, any>> {
  label: string
  state: T,
  stateKey: keyof T
  setState: (value: React.SetStateAction<T>) => void
  items: string[]
  menuItemLabel: (item: string) => string
  renderValue?: (selected: any) => JSX.Element[]
  multiple?: boolean
}

export default function Select<T extends Record<string, any>>(props: Props<T>) {
  const { theme } = useThemeSettings();
  const { items, multiple, renderValue, menuItemLabel, state, stateKey, setState } = props;
  return <FormGroup>
    <InputLabel>{props.label}</InputLabel>
    <div style={{ background: theme.color.dark, display: 'flex', flexDirection: 'column', padding: 2.5, margin: 2.5 }} className="Select-content">
      <MuiSelect value={state[stateKey] as string[]}
        multiple={multiple}
        renderValue={renderValue}
        onChange={(e) => {
          setState({ ...state, [stateKey]: e.target.value as string[] })
        }}>
        {items.map(item =>
          <MenuItem key={item} value={item}>{menuItemLabel(item)}</MenuItem>
        )}
      </MuiSelect>
    </div>
  </FormGroup>
}