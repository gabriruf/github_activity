import fs from 'fs';
import { argv } from 'process'
import listEventNumbers from './src/modules/listEventNumbers.ts'
import listEvents from './src/modules/listEvents.ts';

const FILENAME = argv[2] ?? "content.json";
const DATA = fs.readFileSync(FILENAME, 'utf-8');
const INFO = JSON.parse(DATA);
const ARRAYSIZE: number = Object.keys(INFO).length;
const FIELDNAME = argv[3] ?? undefined;

console.log("Output: ");
listEvents(INFO, FIELDNAME);
console.log(listEventNumbers(INFO, ARRAYSIZE, FIELDNAME));