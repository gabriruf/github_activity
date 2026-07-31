import fs from 'fs';
import { argv } from 'process'
import listEventNumbers from './src/modules/listEventNumbers.ts'

const data = fs.readFileSync("content.json", 'utf-8');
const info = JSON.parse(data);
const arraySize : number = Object.keys(info).length;
const fieldName = argv[2] ?? undefined;

console.log("Output: ");
let type = 'PushEvent';
let numRepo: number[] = [];
let repos: string[] = [];
for (let i = 0; i < arraySize; i++) {
    if (info[i].type == type) {
        if (!repos.includes(info[i].repo.name)) {
            repos.push(info[i].repo.name);
            numRepo.push(1);
        } else {
            let indexRepo = repos.indexOf(info[i].repo.name);
            let number = numRepo.at(indexRepo) ?? 0;
            number = number + 1;
            numRepo.splice(indexRepo, 1, number);
        }
    }
}

console.log(repos.length)
for (let i = 0; i < repos.length; i++) {
    console.log(`Pushed ${numRepo[i]} commits to ${repos[i]}`);
}

console.log(listEventNumbers(info, arraySize, fieldName));