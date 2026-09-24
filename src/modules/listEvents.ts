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
  ref?: string
  ref_type?: string
  full_ref?: string
  master_branch?: string
  description?: string
  pusher_type?: string
  action?: string
  number?: number
  pull_request?: PullRequest
  issue?: Issue
  review?: Review
  release?: Release
  discussion?: Discussion
  pages?: Pages[]
  comment?: Comment
}

export interface Comment {
    url: string
    html_url: string
    id: number
    node_id: string
    user: User
    position: string | null
    line: string | null
    path: string | null
    commit_id: string
    created_at: string
    updated_at: string
    body: string
    reactions: Reactions
}

export interface Pages {
    page_name: string
    title: string
    summary: string | null
    action: string
    sha: string
    html_url: string
}

export interface Discussion {
    repository_url: string
    category: {
        id: number
        node_id: string
        repository_id: number
        emoji: string
        name: string
        description: string
        created_at: string
        updated_at: string
        slug: string
        is_answerable: boolean
    }
    answer_html_url: string | null
    answer_chosen_at: string | null
    answer_chosen_by: string | null
    html_url: string
    id: number
    node_id: string
    number: number
    title: string
    user: User
    labels: string[]
    state: string
    state_reason: string | null
    locked: boolean
    comments: number
    created_at: string
    updated_at: string
    active_lock_reason: string | null
    body: string
    reactions: Reactions
    timeline_url: string
}

export interface Release {
    url: string
    assets_url: string
    upload_url: string
    html_url: string
    id: number
    author: User
    node_id: string
    tag_name: string
    target_commitish: string
    name: string
    draft: boolean
    immutable: boolean
    prerelease: boolean
    created_at: string
    updated_at: string
    published_at: string
    assets: string[]
    tarball_url: string
    zipball_url: string
    body: string
    short_description_html: string
    is_short_description_html_truncated: boolean
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
        CommitCommentEvent(info);
        CreateEvent(info);
        DeleteEvent(info);
        DiscussionEvent(info);
        ForkEvent(info);
        GollumEvent(info);
        IssueCommentEvent(info);
        IssuesEvent(info);
        PublicEvent(info);
        PullRequestEvent(info);
        PullRequestReviewEvent(info);
        PushEvent(info);
        ReleaseEvent(info);
        WatchEvent(info);
        return;
    } 

    switch (eventType.toLowerCase()) {
        case "commitcommentevent":
            CommitCommentEvent(info);
            break;
        case "createevent":
            CreateEvent(info);
            break;
        case "deleteevent":
            DeleteEvent(info);
            break;
        case "discussionevent":
            DiscussionEvent(info);
            break;
        case "forkevent":
            ForkEvent(info);
            break;
        case "gollumevent":
            GollumEvent(info);
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
        case "releaseevent":
            ReleaseEvent(info);
            break;
        case "watchevent":
            WatchEvent(info);
            break;
    }
}

function capitalizeFirstLetter(word: string | undefined): string {
    return String(word).charAt(0).toUpperCase() + String(word).slice(1);
}

function CommitCommentEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "CommitCommentEvent") {
            console.log(`-> ${capitalizeFirstLetter(info.payload.action)} a comment in commit "${info.payload.comment?.commit_id.slice(0,7)}" in ${info.repo.name}`)
        }
    })
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

function DiscussionEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "DiscussionEvent") {
            console.log(`-> ${capitalizeFirstLetter(info.payload.action)} a discussion titled "${info.payload?.discussion?.title}" in ${info.repo.name}`)
        }
    })
}

function ForkEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "ForkEvent") {
            console.log(`-> ${capitalizeFirstLetter(info.payload.action)} ${info.repo.name}`);
        }
    })
}

function GollumEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "GollumEvent") {
            info.payload.pages?.forEach((page) => {
                console.log(`-> ${capitalizeFirstLetter(page.action)} a wiki page titled "${page.page_name}" in ${info.repo.name}`)
            })
        }
    })
}

function IssueCommentEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "IssueCommentEvent") {
            console.log(`-> ${capitalizeFirstLetter(info.payload.action)} an issue comment (#${info.payload.issue?.number}) in ${info.repo.name} (payload id: ${info.payload.issue?.id})`);
        }
    })
}

function IssuesEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "IssuesEvent") {
            console.log(`-> ${capitalizeFirstLetter(info.payload.action)} an issue (#${info.payload.issue?.number}) in ${info.repo.name} (payload id: ${info.payload.issue?.id})`)
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
            console.log(`-> ${capitalizeFirstLetter(info.payload.action)} PR (#${info.payload.number}) into ${info.repo.name} (${info.payload.pull_request?.base.ref}) from (${info.payload.pull_request?.head.ref})`)
        }
    })
}

function PullRequestReviewEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "PullRequestReviewEvent") {
            console.log(`-> ${capitalizeFirstLetter(info.payload.action)} a review (${info.payload?.review?.id}) in PR #${info.payload.pull_request?.number}, submitted at ${info.payload?.review?.submitted_at}`)
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

function ReleaseEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "ReleaseEvent") {
            console.log(`-> ${capitalizeFirstLetter(info.payload.action)} tag ${info.payload?.release?.tag_name} (${info.payload.release?.target_commitish}) in ${info.repo.name}`)
        }
    })
}

function WatchEvent(github_user_data: GitHubData[]) {
    github_user_data.forEach((info) => {
        if (info.type === "WatchEvent") {
            console.log(`-> Starred ${info.repo.name}`);
        }
    })
}
