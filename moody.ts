/**
 * ポケモンの特性[むらっけ]を簡易的に再現するコード
 */

const moodyTargetStatuses = [
  "こうげき",
  "ぼうぎょ",
  "とくこう",
  "とくぼう",
  "すばやさ",
] as const;

type MoodyTargetStatus = (typeof moodyTargetStatuses)[number];

function getMoodyTargetStatus(): {
  upStatus: MoodyTargetStatus;
  downStatus: MoodyTargetStatus;
} {
  const randomIndex = Math.floor(Math.random() * moodyTargetStatuses.length);
  const upStatus = moodyTargetStatuses[randomIndex];

  const downStatuses = moodyTargetStatuses.filter(
    (status) => status !== upStatus
  );
  const downIndex = Math.floor(Math.random() * downStatuses.length);
  const downStatus = downStatuses[downIndex];

  return { upStatus, downStatus };
}

export function runMoody(count: number): {
  upStatus: MoodyTargetStatus;
  downStatus: MoodyTargetStatus;
}[] {
  return Array.from({ length: count }, () => getMoodyTargetStatus());
}

export function formatMoodyResult(
  results: {
    upStatus: MoodyTargetStatus;
    downStatus: MoodyTargetStatus;
  }[]
): string {
  const text = `むらっけを${results.length}回発動させました。
=== 結果 ===
${results
  .map(({ upStatus, downStatus }) => `| ${upStatus} ↑↑ | ${downStatus} ↓ |`)
  .join("\n")}`;

  return text;
}
