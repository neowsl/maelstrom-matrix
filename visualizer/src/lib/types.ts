export const CHALLENGE_IDS = [
    "echo",
    "unique-ids",
    "broadcast",
    "g-counter",
    "kafka-log",
    "txn-store",
] as const;

export type ChallengeId = (typeof CHALLENGE_IDS)[number];

export interface Point {
    x: number;
    y: number;
}
