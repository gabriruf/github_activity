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

interface User {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    user_view_type: string
    site_admin: boolean
}

interface Labels {
    id: number
    node_id: string
    url: string
    name: string
    color: string
    default: boolean
    description: string
}

interface SubIssuesSummary {
    total: number
    completed: number
    percent_completed: number
}

interface IssueDependencySummary {
    blocked_by: number
    total_blocked_by: number
    blocking: number
    total_blocking: number
}

interface Reactions {
    url: string
    total_count: number
    "+1": number
    "-1": number
    laugh: number
    hooray: number
    confused: number
    heart: number
    rocket: number
    eyes: number
}

interface Issue {
    url: string
    repository_url: string
    labels_url: string
    comments_url: string
    events_url: string
    html_url: string
    id: number
    node_id: string
    number: number
    title: string
    user: User
    labels: Labels[]
    state: string
    locked: boolean
    assignees: string[]
    milestone: string[] | null
    comments: number
    created_at: string
    updated_at: string
    closed_at: string
    assignee: string[] | null
    issue_field_values: string[]
    type: string | null
    active_lock_reason: string | null
    sub_issues_summary: SubIssuesSummary
    issue_dependencies_summary: IssueDependencySummary
    body: string
    reactions: Reactions
    timeline_url: string
    performed_via_github_app: string | null
    state_reason: string
    pinned_comment: string | null
}

interface Review {
    id: number
    node_id: string
    user: User
    body: string
    commit_id: string
    state: string
    html_url: string
    pull_request_url: string
    _links: {
        html: {
            href: string
        }
        pull_request: {
            href: string
        }
    }
    submitted_at: string
    updated_at: string

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
  issue?: Issue
  review: Review
}

export interface PullRequest {
    url: string
    id: number
    number: number
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

///

export default function listEvents(info: GitHubData[], eventType?: string) {
    if (eventType === undefined) {
        CreateEvent(info);
        DeleteEvent(info);
        IssueCommentEvent(info);
        IssuesEvent(info);
        PublicEvent(info);
        PullRequestEvent(info);
        PullRequestReviewEvent(info);
        PushEvent(info);
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
        case "issuecommentevent":
            IssueCommentEvent(info);
            break;
        case "issuesevent":
            IssuesEvent(info);
            break;
        case "publicevent":
            PublicEvent(info);
            break;
        case "pullrequestevent":
            PullRequestEvent(info);
            break;
        case "pullrequestreviewevent":
            PullRequestReviewEvent(info);
            break;
        case "pushevent":
            PushEvent(info);
            break;
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

function IssueCommentEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "IssueCommentEvent") {
            console.log(`-> ${String(info.payload.action).charAt(0).toUpperCase() + String(info.payload.action).slice(1)} an issue comment #${info.payload.issue?.number} in ${info.repo.name} (${info.payload.issue?.id})`)
        }
    })
}

function IssuesEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "IssuesEvent") {
            console.log(`-> ${String(info.payload.action).charAt(0).toUpperCase() + String(info.payload.action).slice(1)} an issue #${info.payload.issue?.number} in ${info.repo.name} (${info.payload.issue?.id})`)
        }
    })
}

function PublicEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "PublicEvent") {
            console.log(`-> The repo ${info.repo.name} was made public.`)
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

function PullRequestReviewEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "PullRequestReviewEvent") {
            console.log(`-> ${String(info.payload.action).charAt(0).toUpperCase() + String(info.payload.action).slice(1)} a review (${info.payload.review.id}) in PR #${info.payload.pull_request?.number}, submitted at ${info.payload.review.submitted_at}`)
        }
    })
}


function PushEvent(github_user_data: GitHubData[]) {
    const numRepos = new Map<String, number>();
    github_user_data.forEach((info) => {
        if (info.type !== "PushEvent") {
            return;
        }
        if (!numRepos.has(info.repo.name)) {
            numRepos.set(info.repo.name, 1);
        } else {
            let num = numRepos.get(info.repo.name) ?? 0;
            num = num + 1;
            numRepos.set(info.repo.name, num);
        }
    })

    numRepos.forEach((number, repo) => {
        console.log(`-> Pushed ${number} commits to ${repo}`);
    })
}



function WatchEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "WatchEvent") {
            console.log(`-> Starred ${info.repo.name}`);
        }
    })
    
}
