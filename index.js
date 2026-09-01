"use strict";
import { loadEnvFile, argv, env } from 'process';
import https from 'https';
import fs from 'fs/promises';

loadEnvFile('.env');

const GITHUB_USER = argv[2];
const USER_AGENT = GITHUB_USER;
const API_KEY = env.API_KEY ?? "no api key found";
const URL = 'api.github.com';
const OPTS = {
    hostname: URL,
    method: 'GET',
    path: `/users/${GITHUB_USER}/events/public`,
    headers: {
        'User-Agent': USER_AGENT,
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2026-03-10'
    } 
}

async function createFile(filename, content) {
    try {
        await fs.writeFile(filename, JSON.stringify(content, null, 2),'utf8');
    } catch (err) {
        console.log("Error on writing content to file: ", err)
    } finally {
        console.log("--------------------");
        console.log(" Operation finished ");
        console.log("--------------------");
    }
}

https
    .get(OPTS, res => {
        let data = '';

        res.on('data', chunk => {
            data += chunk;
        })

        res.on('end', () => {
            let info = JSON.parse(data);
            const FILENAME = argv[3];
            console.log(info);
            
            createFile(FILENAME, info);
        })
    })
    .on('error', err => {
        console.log(`Error: ${err.message}`);
    })