import { DiceStyle } from "../types/DiceStyle";
import { Die } from "../types/Die";
import { DiceType } from "../types/DiceType";

// 说明：将所有前端可见的中文文案集中管理，便于后续统一维护和复用，避免散落在组件中难以检索与校对。
export const diceStyleLabels: Record<DiceStyle, string> = {
  GALAXY: "银河",
  GEMSTONE: "宝石",
  GLASS: "玻璃",
  IRON: "锻铁",
  NEBULA: "星云",
  SUNRISE: "朝阳",
  SUNSET: "夕阳",
  WALNUT: "胡桃木",
};

export const advantageFullLabels: Record<"ADVANTAGE" | "DISADVANTAGE", string> = {
  ADVANTAGE: "优势",
  DISADVANTAGE: "劣势",
};

export const advantageShortLabels: Record<"ADVANTAGE" | "DISADVANTAGE", string> = {
  ADVANTAGE: "优",
  DISADVANTAGE: "劣",
};

// 说明：统一存放页面提示文字，包含工具提示、按钮、空状态等多种场景，方便后期迭代直接在此调整。
export const uiText = {
  rollButton: "掷骰",
  tooltip: {
    roll: "开始掷骰",
    clear: "清空当前骰子",
    reroll: "重掷当前骰子",
    hiddenRoll: "该投掷已设为隐藏",
    bonus: "加值",
    history: "历史记录",
    fairness: "公平性测试",
    closeTester: "关闭测试",
    showBreakdown: "展开详情",
    hideBreakdown: "收起详情",
    sumOfSquares: "平方误差和",
  },
  history: {
    emptyTitle: "暂无记录",
    emptyDescription: "掷骰后会自动出现在历史记录中。",
  },
  fairness: {
    panelResults: "结果",
    rollsLabel: "掷骰次数",
    sliderDescription: "通过大量掷骰评估骰子的公平性。",
    start: "开始",
    stop: "停止",
    restart: "重新开始",
    explain: "原理说明",
    export: "导出数据",\n    rolledSeries: "实际次数",\n    expectedSeries: "期望次数",\n    yAxisLabel: "掷骰次数",\n    bonusWarning: "公平性测试不支持加值",
    advantageWarning: "公平性测试不支持优势或劣势",
    selectWarning: "请先选择一个骰子再开始测试",
    lowRollWarning: "掷骰次数过少，统计结果可能不准确。",
  },
};

// 说明：封装常用的字符串拼装逻辑，避免在组件中重复书写，同时确保术语保持一致。
export function formatDiceStyle(style: DiceStyle): string {
  return diceStyleLabels[style];
}

export function formatDiceSetName(style: DiceStyle): string {
  return `${formatDiceStyle(style)}骰子`;
}

export function formatDieName(die: Die): string {
  return `${formatDiceStyle(die.style)} ${die.type}`;
}

export function formatFairnessProgress(current: number, total: number): string {
  return `${current} / ${total} 次掷骰`;
}

export function formatFairnessCompleted(current: number, total: number): string {
  return `${current} / ${total} 次掷骰已完成`;
}

export function formatAxisLabel(style: DiceStyle, type: DiceType): string {
  return `${formatDiceStyle(style)} ${type} 点数`;
}

export function formatSseLabel(value: number): string {
  return `SSE（平方误差和）：${value.toFixed(2)}`;
}