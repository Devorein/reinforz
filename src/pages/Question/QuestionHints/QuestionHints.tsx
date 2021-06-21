import { Button } from '@material-ui/core';
import { Markdown } from '../../../components';
import { useDisabled, useThemeSettings } from '../../../hooks';
import sounds from '../../../sounds';
import "./QuestionHints.scss";

interface Props {
  hints: string[]
  usedHints: string[]
  setUsedHints: React.Dispatch<React.SetStateAction<string[]>>
}

export default function QuestionHints(props: Props) {
  const { hints, usedHints, setUsedHints } = props;
  const { is_disabled, disable } = useDisabled(2500);
  const { settings } = useThemeSettings();
  const totalUsedHints = usedHints.length;
  const hintsExhausted = totalUsedHints === hints.length;

  const onButtonClick = () => {
    if (!hintsExhausted && !is_disabled) {
      setUsedHints([...usedHints, hints[totalUsedHints]])
      disable()
    }
  }

  return <div className="QuestionHints mb-5">
    <div className="flex jc-c ai-c mb-5" style={{ height: 50 }}>
      <Button disabled={is_disabled || hintsExhausted} color="primary" variant="contained" className="QuestionHints-button flex-1" onClick={() => {
        settings.sound && sounds.click.play()
        onButtonClick()
      }}>{hints.length > 0 ? `Show ${"hints"} ${totalUsedHints}/${hints.length}` : `No hints available`}</Button>
    </div>
    <div className="QuestionHints-list bg-dark p-5 pb-0">
      {usedHints.map((hint, i) =>
        <div key={`hint${i}`} className="QuestionHints-list-item p-10 bg-light mb-5">
          <Markdown content={hint} />
        </div>)}
    </div>
  </div>
}