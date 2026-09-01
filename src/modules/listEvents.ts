export interface Actor {
  id: number
  login: string
  display_login: string
  gravatar_id: string
  url: string
  avatar_url: string
}

export interface Repo {
  id: number
  name: string
  url: string
}

export interface Payload {
  ref: string
  ref_type: string
  full_ref: string
  master_branch: string
  description: string
  pusher_type: string
  action?: string
  number?: number
  pull_request?: PullRequest
}

export interface PullRequest {
    base: {
        ref: string
        sha: string
        repo: {
            id: number
            url: string
            name: string
        }
    }
    head: {
        ref: string
        sha: string
        repo: {
            id: number
            url: string
            name: string
        }
    }
}

export interface GitHubData {
  id: string
  type: string
  actor: Actor
  repo: Repo
  payload: Payload
  public: boolean
  created_at: string
}

export default function listEvents(info: GitHubData[], eventType?: string) {
    if (eventType === undefined) {
        CreateEvent(info);
        DeleteEvent(info);
        PullRequestEvent(info);
        //PushEvent(info);
        WatchEvent(info);
        return;
    } 

    switch (eventType.toLowerCase()) {
        case "createevent":
            CreateEvent(info);
            break;
        case "deleteevent":
            DeleteEvent(info);
            break;
        case "pullrequestevent":
            PullRequestEvent(info);
            break;
        //case "pushevent":
        //    PushEvent(info);
        //    break;
        case "watchevent":
            WatchEvent(info);
            break;
    }
}


function CreateEvent(github_user_data: GitHubData[]) {
    for (const info of github_user_data) {
        if (info.type === "CreateEvent") {
            switch (info.payload.ref_type) {
                case "branch":
                    console.log(`-> Created ${info.payload.ref_type} ${info.payload.ref} in ${info.repo.name}`);
                    break;
                case "tag":
                    console.log(`-> Created ${info.payload.ref_type} ${info.payload.ref} in ${info.repo.name}`);
                    break;
                case "repository":
                    console.log(`-> Created ${info.payload.ref_type} ${info.payload.ref}`);
                    break;
            }
        }
    }
} 

function DeleteEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "DeleteEvent") {
            switch (info.payload.ref_type) {
                case "branch":
                    console.log(`-> Deleted ${info.payload.ref_type} ${info.payload.ref} in ${info.repo.name}`);
                    break;
                case "tag":
                    console.log(`-> Deleted ${info.payload.ref_type} ${info.payload.ref} in ${info.repo.name}`);
                    break;
                case "repository":
                    console.log(`-> Deleted ${info.payload.ref_type} ${info.payload.ref}`);
                    break;
            }
        }
    })
}

function PullRequestEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "PullRequestEvent") {
            console.log(`-> ${String(info.payload.action).charAt(0).toUpperCase() + String(info.payload.action).slice(1)} PR #${info.payload.number} into ${info.repo.name} (${info.payload.pull_request?.base.ref}) from (${info.payload.pull_request?.head.ref})`)
        }
    })
}


//function PushEvent(github_user_data: GitHubData[]) {
//   // WIP 
//}



function WatchEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "WatchEvent") {
            console.log(`-> Starred ${info.repo.name}`);
        }
    })
    
}
