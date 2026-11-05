# Agent Rules — mocal-blog

This file is the single source of truth for every AI agent working in this repo (Cursor, Claude Code, Codex, etc.). Agent-specific entry points only point here.

| Agent | Entry point |
|-------|-------------|
| Cursor, Codex | `AGENTS.md` (read natively) plus `.cursor/rules/*.mdc` |
| Claude Code | `CLAUDE.md` → `@AGENTS.md` |

## Rules Maintenance

Whenever a rule is added, changed, or removed:

- Write it in this file. Agent entry points (`CLAUDE.md`) only reference this file.
- Cursor always-apply workflow files in `.cursor/rules/` may duplicate the same text so Cursor injects them. Keep those copies in sync with this file.
- If a new agent is adopted, add its entry point file pointing to `AGENTS.md` and list it in the table above.

## Project

Mocal editorial blog (`blog.mocal.com.mx`): Gatsby 5 + TypeScript static site that sources articles from Contentful, uses Supabase for the newsletter form, and is restricted to Mexico (`MX`) by a geo-restriction middleware that lets social preview bots through. Hosting config lives in `vercel.json` and `middleware.ts`. No pipeline deploys from this repo yet.

- **Node.js:** current LTS compatible with Gatsby 5 (the repo has no `.nvmrc` yet).
- **Package manager:** `npm` (`package-lock.json`).
- **Build:** `npm run build` (`gatsby build`, output in `public/`). Type check: `npm run typecheck`.
- **Geo-restriction contract:** `middleware.ts` allows `MX` visitors, social preview bots (`SOCIAL_PREVIEW_BOTS`), requests without `x-vercel-ip-country`, and Gatsby static assets; every other visitor gets `/no-disponible/` (`src/pages/no-disponible.tsx`) with HTTP 200. Keep this behavior and the bot list consistent when editing it.
- **SEO contract:** article OpenGraph tags must stay readable by social preview bots. Do not regress `src/pages/articles/` metadata.

## Git Branching Workflow (Mandatory)

All ticket work targets the `develop` branch. `main` is off-limits during development.

1. **Start from develop.** Every new branch (and worktree) MUST be created from `develop`, only after pulling the latest `develop`. Never cut work from `main`, another `feat/*` branch, `demo`, or a stale local `develop` unless the user explicitly asks to stack branches.

   ```bash
   git fetch origin
   git switch develop
   git pull --ff-only origin develop
   git switch -c feat/MOC-123-short-kebab-description
   ```

   Worktrees: after the pull above, run `git worktree add -b <branch-name> <path> develop`.

2. **Branch naming.** For Linear ticket `MOC-N`, use `feat/MOC-<N>-<short-kebab-description>`. Never use Linear's suggested `gitBranchName` when it differs (for example `feature/moc-17-...`). Rename the branch immediately if it is wrong.
3. **Merges and PRs go from `feat/*` into `develop` only.** Never commit, push, merge, rebase onto, or open PRs targeting `main` unless the user explicitly asks for it in the current conversation.
4. If a branch was cut from anything other than an up-to-date `develop`, stop and move the work onto a fresh branch from `develop` before continuing. Do not push it as is.
5. If you have uncommitted work, stash or commit it before switching to `develop`; never discard it to satisfy this rule.

Details: `.cursor/rules/git-branching.mdc`.

## Pull Requests and Linear (Mandatory)

1. **Base branch:** NEVER create a PR targeting `main`. Default base is `develop`; always pass `--base` explicitly. See `.cursor/rules/pull-request-base-branch.mdc`.
2. **Template:** when creating a PR, read `.github/PULL_REQUEST_TEMPLATE.md`, fill every section with real content, and pass it as the PR **description** (`gh pr create --body`). Never leave the body empty and never put the write-up only as a GitHub PR comment.
3. **Linear state:** after the PR exists, move the matching ticket (`MOC-N`) to **In Review** with Linear MCP `save_issue`. The Mocal App Team has no "PR created" state; In Review is its equivalent. Never set Done/Canceled/Duplicate/Backlog as a side effect.
4. **Linear comment on every PR:** post a comment on the ticket with Linear MCP `save_comment` containing the PR URL and the same filled template. Do this for every PR, including follow-up and fix PRs. A comment does not replace the state change, and the state change does not replace the comment.
5. Order: `gh pr create` → `save_issue` (In Review) → `save_comment`. If a Linear call fails, retry once; if it still fails, tell the user.

Details: `.cursor/rules/pull-request-template.mdc`.

## Deployment (Mandatory)

**No pipeline deploys to Vercel yet.** Do not add GitHub Actions workflows, scripts, or any automation that creates Vercel deployments (for example calls to the Vercel REST API from CI, `vercel deploy`, or a `ci-vercel-deploy` script). `vercel.json` and `middleware.ts` stay as hosting configuration only. Add a deploy pipeline only when the user asks for it in the current conversation.

Details: `.cursor/rules/no-vercel-deploy-pipeline.mdc`.

## Documentation (Mandatory)

1. **English only.** All documentation is written in English: README, `docs/`, `.env.example` comments, agent rules, PR descriptions, Linear comments that document work, and code comments. Product UI copy stays Spanish by design. See `.cursor/rules/documentation-english.mdc`.
2. **Environment variables.** Whenever one is added, changed, or removed, document it in `.env.example` (purpose, format, required/optional, defaults) and in `docs/environment-variables.md` (Infisical source of truth, names must match exactly), plus README/runbooks if setup changes. Never commit real secrets. See `.cursor/rules/env-variable-documentation.mdc`.
3. **No agent plans in docs.** Never commit implementation plans, task breakdowns, roadmaps, or "next steps" write-ups to the repo. Docs contain only implementation, testing, and configuration guides. Plan-mode files stay outside the repo (for example `~/.claude/plans/`). See `.cursor/rules/no-plans-in-documentation.mdc`.

## Build before pushing (Mandatory)

Run `npm run build` before committing or pushing code changes (see `.cursor/rules/build-before-push.mdc`).

## context-mode (Mandatory)

Raw tool output floods the context window. When the context-mode MCP tools are available, use them (`ctx_execute`, `ctx_batch_execute`, `ctx_search`, `ctx_fetch_and_index`) to keep raw data in the sandbox. See `.cursor/rules/context-mode.mdc`.
