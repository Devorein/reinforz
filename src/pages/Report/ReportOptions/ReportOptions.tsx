import { Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { AiFillCheckSquare } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { Markdown } from "../../../components";
import { useThemeSettings } from "../../../hooks";
import { IResultSelectionQuestion } from "../../../types";
import "./ReportOptions.scss";

interface Props {
  question: IResultSelectionQuestion
  userAnswers: string[]
  className?: string
}

export function ReportOptions(props: Props) {
  const { question } = props;
  const { theme } = useThemeSettings();

  return <div className={`Report-Options bg-base mb-5 p-5 pb-0 flex-1 ${props.className ?? ''}`}>
    {question.options.map((option, answerIndex) => {
      const containsOptionInfo = option.isCorrect || option.userSelected;
      return <div className="Report-Options-container mb-5 p-5 bg-dark pb-0 flex fd-c" key={option.text}>
        <div className="flex jc-sb mb-5 jc-sb">
          <Typography className={`flex p-10 jc-c ai-c bold fs-18`}>{answerIndex + 1}</Typography>
          <Markdown classNames={{
            typography: `Report-Options-container-item Report-Options-container-item-text flex-1 bg-light flex ai-c ${containsOptionInfo ? 'mr-5' : ''}`
          }} content={option.text} />
          {containsOptionInfo ? <div className="Report-Options-container-item bg-light flex ai-c jc-c p-5">
            {option.isCorrect ? <AiFillCheckSquare fill={green[500]} style={{ padding: 5 }} size={17.5} /> : null}
            {option.userSelected ? <FaUser fill={theme.palette.text.primary} style={{ padding: 5 }} size={17.5} /> : null}
          </div> : null}
        </div>
        {question.answers[answerIndex]?.explanation ? <div className="Report-Options-container-item-explanation bg-light mb-5 p-10 fs-18">
          <Markdown content={question.answers[answerIndex].explanation!} />
        </div> : null}
      </div>
    })}
  </div>

}