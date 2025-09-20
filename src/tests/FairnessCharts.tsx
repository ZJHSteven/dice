import VerifiedRounded from "@mui/icons-material/VerifiedRounded";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsAxisHighlight } from "@mui/x-charts/ChartsAxisHighlight";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { useMemo } from "react";
import { Die } from "../types/Die";
import { formatAxisLabel, formatSseLabel, uiText } from "../i18n/text";

export default function FairnessCharts({
  die,
  rolledValues,
  numberRolls,
}: {
  die: Die;
  rolledValues: number[];
  numberRolls: number;
}) {
  const dieCount = useMemo<number>(() => {
    switch (die.type) {
      case "D4":
        return 4;
      case "D6":
        return 6;
      case "D8":
        return 8;
      case "D10":
        return 10;
      case "D12":
        return 12;
      case "D20":
        return 20;
      case "D100":
        return 100;
      default:
        throw Error(`无法根据骰子类型 ${die.type} 推断面数`);
    }
  }, [die]);

  const [xAxis, yAxis] = useMemo<[number[], number[]]>(() => {
    const xAxis = Array.from(Array(dieCount).keys()).map((v) => v + 1);
    const yAxis = new Array(dieCount).fill(0);

    for (const value of rolledValues) {
      yAxis[value - 1] += 1;
    }

    return [xAxis, yAxis];
  }, [rolledValues, dieCount]);

  const expectedValue = useMemo(() => {
    return numberRolls / dieCount;
  }, [dieCount, numberRolls]);

  const expectedValueYAxis = useMemo(
    () => new Array(dieCount).fill(expectedValue),
    [expectedValue]
  );

  // 说明：卡方检验阈值用于判断采样结果是否落在可信区间内。
  const criticalValue = useMemo<number>(() => {
    switch (die.type) {
      case "D4":
        return 9.488;
      case "D6":
        return 12.592;
      case "D8":
        return 15.507;
      case "D10":
        return 18.307;
      case "D12":
        return 21.026;
      case "D20":
        return 31.41;
      case "D100":
        return 124.342;
      default:
        throw Error(`无法为骰子类型 ${die.type} 计算卡方检验阈值`);
    }
  }, [die]);

  const sumSquaredError = useMemo(() => {
    const squaredErrors = yAxis.map(
      (v) => Math.pow(v - expectedValue, 2) / expectedValue
    );
    return squaredErrors.reduce((a, b) => a + b);
  }, [yAxis, expectedValue]);

  const isFair = sumSquaredError < criticalValue;

  return (
    <Stack width="100%" gap={1}>
      <Tooltip title={uiText.tooltip.sumOfSquares}>
        <Typography
          variant="caption"
          textAlign="center"
          color={isFair ? "success.main" : "warning.main"}
          my={1}
        >
          {formatSseLabel(sumSquaredError)}{" "}
          {isFair && (
            <VerifiedRounded
              sx={{ fontSize: "1.1rem", verticalAlign: "top" }}
              color="inherit"
            />
          )}
        </Typography>
      </Tooltip>
      <ResponsiveChartContainer
        xAxis={[
          {
            id: "roll-values",
            data: xAxis,
            scaleType: "band",
          },
        ]}
        yAxis={[
          {
            id: "number-rolls",
            max: expectedValue + expectedValue * 0.1,
          },
        ]}
        series={[
          {
            type: "bar",
            data: yAxis,
            label: uiText.fairness.rolledSeries,
          },
          {
            type: "line",
            data: expectedValueYAxis,
            label: uiText.fairness.expectedSeries,
          },
        ]}
        height={300}
        sx={{ overflow: "hidden" }}
      >
        <BarPlot />
        <LinePlot />
        <ChartsXAxis
          label={formatAxisLabel(die.style, die.type)}
          position="bottom"
          axisId="roll-values"
        />
        <ChartsYAxis
          label={uiText.fairness.yAxisLabel}
          position="left"
          axisId="number-rolls"
        />
        <ChartsAxisHighlight x="band" />
        <ChartsTooltip slotProps={{ popper: {} }} />
      </ResponsiveChartContainer>
    </Stack>
  );
}