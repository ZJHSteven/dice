import Tooltip from "@mui/material/Tooltip";
import { useDiceControlsStore } from "../controls/store";
import IconButton from "@mui/material/IconButton";

import { uiText } from "../i18n/text";

import FairnessIcon from "@mui/icons-material/BalanceRounded";

export function FairnessTesterButton() {
  const toggleFairnessTester = useDiceControlsStore(
    (state) => state.toggleFairnessTester
  );

  return (
    <Tooltip title={uiText.tooltip.fairness} placement="top" disableInteractive>
      <IconButton id="history-button" onClick={() => toggleFairnessTester()}>
        <FairnessIcon />
      </IconButton>
    </Tooltip>
  );
}
