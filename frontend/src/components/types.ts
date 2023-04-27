
import type { v4 } from "uuid";

export type V4 = typeof v4;
export type Availables = {monthYear: Date, days: {date: Date, times: {id: V4, slot: Date}[] }[] }[];
export type Times = {id: V4, slot: Date}[];
