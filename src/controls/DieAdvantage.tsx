import { uiText } from "../i18n/text";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

type DieAdvantageProps = {
  advantage?: "ADVANTAGE" | "DISADVANTAGE" | null;
  onChange: (advantage: "ADVANTAGE" | "DISADVANTAGE" | null) => void;
};

export function DieAdvantage({ advantage, onChange }: DieAdvantageProps) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={advantage}
      exclusive
      onChange={(_, value) => {
        onChange(value);
      }}
      aria-label={uiText.dieAdvantage.aria}
      fullWidth
      sx={{
        borderRadius: 0,
        py: 1,
        ".MuiToggleButton-root": { borderRadius: 0 },
      }}
    >
      <ToggleButton
        value="DISADVANTAGE"
        sx={{ borderWidth: 0, borderRightWidth: 1 }}
      >{uiText.dieAdvantage.disadvantage}</ToggleButton>
      <ToggleButton value="ADVANTAGE" sx={{ border: 0 }}>{uiText.dieAdvantage.advantage}</ToggleButton>
    </ToggleButtonGroup>
  );
}
