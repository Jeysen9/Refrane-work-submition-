# RecruitFlow — UI v2
    
**RecruitFlow by Refrane** | Standalone HTML, CSS and JavaScript interface concept.

This presentation package redesigns the visual presentation of RecruitFlow while carrying forward the primary user-facing pages and workflow families found in the supplied **actual RecruitFlow system** (`RecruitFlow fixed inc (3).zip`). It is **not a replacement build of the live React/Supabase application**. It contains fictional candidates, campaigns, companies and analytics records for stakeholder review. It does not connect to the original backend, authenticate an actual user, publish job vacancies, send invitations, charge money, or perform real AI evaluations.

## Quick start

1. Extract the ZIP.
2. Open the `RecruitFlow_UI_Presentation` folder in VS Code.
3. Open `index.html` with **Live Server** (or another static server).
4. Select **Candidate** or **Recruiter** at the login screen and enter any non-empty email/password to *enter the local interface preview*.
5. Use the left navigation and the action buttons. To switch roles, sign out and select the other role.

No `npm install`, credentials, or database is needed.

## Project structure

```text
RecruitFlow_UI_Presentation/
├── index.html                    # App mount point, title, loading logo
├── styles.css                    # Shared design system, light/dark layouts, responsiveness
├── app.js                        # Demo data, views, local state, navigation and interactions
├── README.md                     # Handover and feature coverage
└── assets/
    ├── recruitflow-logo.png     # Actual RecruitFlow mark from the supplied system ZIP
    ├── refrane-mark.png         # Additional supplied brand mark
    ├── companies/              # Supplied fictional-company logos
    ├── people/                 # Six locally packaged fictional stock-style headshots
    └── workplaces/             # Four locally packaged fictional workplace visuals
```

The locally bundled stock-style images were generated for the visual mockup and are **not pictures of real users or employers**. The source logo is taken from the supplied system. No externally hosted photograph is required. The small image files are deliberately compressed for faster previews.

## Feature-preservation map

Original system paths refer to the original React application. The new preview groups information progressively but keeps an accessible route to these original **feature categories**:

| Actual RecruitFlow source / capability | Where to see it in the redesigned mockup |
|---|---|
| `src/pages/LoginPage.tsx`, role-based entry | Candidate/Recruiter sign-in preview |
| `src/pages/ForgotPasswordPage.tsx`, `ResetPasswordPage.tsx` | Forgot password → Preview new-password screen |
| Registration / invite acceptance | Create account / Accept team invite from login |
| `CandidateDashboardPage.tsx` | Candidate → Overview |
| `CandidateProfileReadinessPage.tsx` | Candidate → Profile readiness; photo, CV, headline, bio, location, skills, employment, languages, links |
| `CandidateJobBoardPage.tsx`, job detail/application gate | Candidate → Find opportunities; search/filter, job drawer and Apply preview |
| Candidate job saves | Candidate → favourite hearts + Saved jobs |
| `CandidateApplicationsPage.tsx` | Candidate → Applications, application statuses, detail drawer |
| Candidate subscription and access/payment UI | Candidate → Subscription & access |
| Recruiter `RecruiterDashboardPage.tsx` | Recruiter → Overview; metrics, Application Activity Trend/Pipeline and Campaign Health line chart |
| `RecruiterCampaignsPage.tsx` | Recruiter → Campaigns; create drafts, activate and inspect |
| `RecruiterCampaignEditorPage.tsx`, form builder | Campaigns → Edit; role details, application questions, rules/AI, candidate preview |
| `RecruiterCampaignApplicantsPage.tsx` | Campaigns → Applicants; applicant stages, qualification, review, shortlist/reject preview |
| `RecruiterCandidatesPage.tsx` | Recruiter → Candidates; search, filter, candidate profiles, CSV export |
| `RecruiterEvaluationsPage.tsx`, prompt template library | Recruiter → Evaluations; organisation AI toggle, read-only base prompt, template selection and review queue |
| `RecruiterTeamSettingsPage.tsx` | Recruiter → Team & access; invitations, access roles, membership management |
| `RecruiterBusinessSettingsPage.tsx` | Recruiter → Business settings; identity, logo/banner, contact, location, legal registration, social links, visibility |
| `RecruiterAccessReviewPage.tsx`, `RecruiterWorkspaceUnavailablePage.tsx` | Team & access → Workspace status (representative read-only states) |
| Appearance/account controls | Account settings → Dark mode and notifications |

**Accuracy boundary:** These are recognizable **presentational versions of the original feature families**. The live system has deeper validations, permissions, payment providers, applicant-evaluation logic, campaign-form configuration, data models, and security rules that are *not implemented* in this standalone preview. Those remain in the real codebase. Do not treat this ZIP as a drop-in functional replacement or proof of 100% live feature parity.

## Key design decisions

- **Overview is for orientation.** Candidate Overview shows readiness, recommended roles, application stage counts and clear next steps. The generic candidate header search is gone; job search remains on **Find opportunities**.
- **Recruiter overview retains important dashboards.** Campaign Health stays a **blue interactive line graph** with per-campaign illustrative history. Application Activity offers **Trend** and **Pipeline** views calculated from the sample applicant records. Core KPIs and this-week counts are visible.
- **More information on demand.** Campaign editing, per-campaign applicants, organization compliance fields and team permissions are behind obvious navigation/actions, not crammed onto one page.
- **Brand colour consistency.** The top hero banners intentionally use saturated blue–cyan gradients in both workspaces, with green success, amber attention, and violet secondary accents.
- **True local state.** Saved-job hearts toggle red, profile and logo image selections preview locally, saved readiness syncs to the candidate dashboard, campaign edits and invites persist to browser `localStorage`, dark mode persists too.
- **No fake external actions.** When the interface needs real authentication, email, actual payments, invitations, backend qualification, or AI, it explains the limitation instead of claiming success.

## Customizing visual branding

- Replace `assets/recruitflow-logo.png` with an image using the same name to update the splash and product chrome.
- Replace files under `assets/companies/` with approved company artwork of the same names.
- Replace images under `assets/people/` and `assets/workplaces/` with your own **permitted** photos using the same names.
- Colours and spacing tokens are in `styles.css`, with the presentation accents and responsive refinements near the end.
- Data records, menu structure and sample health trends are in the top portion of `app.js`.

## Testing performed

- JavaScript syntax (`node --check`) and view rendering for all **17 workspace views** and **seven additional auth/shell views**.
- Browser-tested navigation, recruiter campaign editing and form questions, applicant shortlisting, team invites, evaluation templates, business-field saves, recruiter dark mode, candidate favourites, saved profile readiness, candidate photo replacement, company logo replacement, recruiter activity tabs and subscription/access screen.
- Responsive rendering at **375, 768, 1032 and 1440 CSS pixels** without horizontal page overflow.
- Static asset existence, duplicate HTML IDs in rendered views, and missing UI action-handler scans.

## What has intentionally NOT changed

No React source, Supabase routes, schema, migrations, authentication credentials, or production workflows were modified. This ZIP is a **stakeholder-facing design exploration**, not a patch of the actual application.
