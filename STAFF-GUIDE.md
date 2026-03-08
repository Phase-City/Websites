# 📋 PHASE CITY DEV OPERATIONS CENTER
## Staff & Founders Guide

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎯 OVERVIEW

The Phase City Dev Operations Center is your all-in-one development management hub:

| Tool | Purpose | Who Uses It |
|------|---------|-------------|
| **Task Board** | Track all development tasks | Staff Only |
| **Changelog Generator** | Create formatted patch notes | Staff Only |
| **Roadmap Generator** | Plan future development | Staff Only |
| **Citizen Portal** | Collect bug reports & suggestions | Public |
| **Discord Webhooks** | Auto-notifications to Discord | Automatic |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🚀 QUICK START

### First-Time Setup

1. **Open `taskboard.html`** in your browser
2. **Enter the access code** (contact The OG KiLLz if you don't have it)
3. **Click the ⚙️ Settings button** in the header
4. **Configure JSONbin.io** (for team sync):
   - Go to https://jsonbin.io → Create free account
   - Get your API Key (click avatar → API Keys)
   - Create a new Bin with: `{"tasks":[]}`
   - Copy your Bin ID from the URL
   - Paste both into settings
5. **Add Discord Webhook** (for notifications):
   - In Discord: Server Settings → Integrations → Webhooks
   - Create webhook for #dev-tasks channel
   - Copy URL → paste in "Dev-Tasks Channel Webhook" field
6. **Set Team Members** (comma separated):
   - Example: `The OG KiLLz, Mike, Dev3`
7. **Click SAVE CONFIG**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📋 TASK BOARD

### Creating Tasks

1. Click **+ NEW TASK** button
2. Fill in:
   - **Title** (required): What needs to be done
   - **Description**: Details, context, links
   - **Category**: Select resource folder (e.g., [ogz], [jobs])
   - **Resource**: Select specific resource (e.g., ogz_skillsrep)
   - **Priority**: Critical / High / Medium / Low
   - **Assignee**: Who's responsible
   - **Status**: Backlog / In Progress / Review / Done
3. **Add Attachments** (optional):
   - Paste image/video URLs
   - Or drag & drop files directly
   - YouTube links auto-embed
4. Click **SAVE TASK**

### Managing Tasks

| Action | How |
|--------|-----|
| **Move Task** | Click arrow buttons on card (← Backlog, In Progress →) |
| **Edit Task** | Click card or EDIT button |
| **Delete Task** | Click DEL button |
| **View Attachment** | Click thumbnail → opens lightbox |
| **Filter Tasks** | Use dropdowns in toolbar (Category, Resource, Priority, Assignee) |
| **Search** | Type in search box |
| **Switch View** | Click KANBAN or LIST buttons |

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `N` | New task (when not in a text field) |
| `Esc` | Close any modal |
| `←` `→` | Navigate lightbox images |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📢 CHANGELOG GENERATOR

### Creating a Changelog

1. Click **📢 CHANGELOG** button in header
2. Set **Version** (e.g., v1.0.1)
3. Set **Release Date**
4. Paste your **Discord Webhook URL** for #patch-notes

### Organizing Content

**Left Panel - Select Tasks:**
- Check boxes next to completed tasks
- Use quick buttons: Done / In Progress / Clear

**Middle Panel - Organize Sections:**
- Drag tasks into section buckets:
  - NEW FEATURES
  - IMPROVEMENTS
  - BUG FIXES
  - TWEAKS & ADJUSTMENTS
  - KNOWN ISSUES
  - COMING SOON
  - COMMUNITY CREDITS
- Add custom items via text input
- Drag to reorder within sections

**Right Panel - Preview:**
- **STYLED**: See how it looks with Phase City colors
- **PLAIN TEXT**: See exact Discord format

### Publishing

| Button | What It Does |
|--------|--------------|
| **📋 COPY TEXT** | Copies plain text to clipboard |
| **🚀 POST TO DISCORD** | Sends directly to webhook channel |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🗺️ ROADMAP GENERATOR

### Creating a Roadmap

1. Click **🗺️ ROADMAP** button in header
2. Set **Roadmap Title**
3. Paste **Discord Webhook URL** for #roadmap or #announcements

### Managing Phases

**Default Phases:**
- PHASE 1 [Q1 2026]
- PHASE 2 [Q2 2026]
- FUTURE [TBD]

**Customizing:**
- Edit phase names by clicking the text
- Edit ETAs by clicking the date
- Delete phases with ✕ button
- Add new phases with "+ ADD NEW PHASE"

### Adding Items

**From Backlog:**
- Drag tasks from the left pool into phase buckets

**Custom Items:**
- Type in the text field at bottom of each phase
- Click + or press Enter

**Status Indicators:**
- **Planned** (gray dot): Not started
- **In Dev** (violet dot + ⚡): Currently working on
- **Soon** (cyan dot + 🔜): Almost ready

### Publishing

| Button | What It Does |
|--------|--------------|
| **📋 COPY TEXT** | Copies plain text to clipboard |
| **🚀 POST TO DISCORD** | Sends directly to webhook channel |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🔔 DISCORD NOTIFICATIONS

### Task Notifications (#dev-tasks)

Automatic notifications are sent when:

| Event | Notification |
|-------|--------------|
| **New Task Created** | 📋 Shows title, resource, assignee, priority |
| **Task Completed** | ✅ Celebrates completion |
| **Status Changed** | 🔄 Shows old → new status |
| **Critical Task** | 🚨 Red alert styling |

### Notification Settings

In ⚙️ Settings, configure:
- ☑️ **New Task**: Notify on task creation
- ☑️ **Task Done**: Notify on completion
- ☑️ **Critical Only**: Only notify for Critical priority tasks

### Webhook Channels

| Channel | Webhook Purpose |
|---------|-----------------|
| #dev-tasks | Task status updates (taskboard) |
| #patch-notes | Changelog posts (changelog generator) |
| #roadmap | Roadmap posts (roadmap generator) |
| #bug-reports | Bug submissions (citizen portal) |
| #suggestions | Feature requests (citizen portal) |
| #crash-reports | Crash dumps (citizen portal) |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎫 CITIZEN PORTAL

### Setup

1. Open `citizen-portal.html` in a code editor
2. Find the `WEBHOOKS` object near the bottom:

```javascript
const WEBHOOKS = {
  bug: 'https://discord.com/api/webhooks/YOUR_WEBHOOK',
  suggestion: 'https://discord.com/api/webhooks/YOUR_WEBHOOK',
  crash: 'https://discord.com/api/webhooks/YOUR_WEBHOOK'
};
```

3. Create 3 webhooks in Discord (one for each channel)
4. Paste the URLs and save
5. Host the file or share the link with citizens

### What Citizens See

**Three Form Types:**
- 🐛 **Bug Report**: Category, severity, description, steps, URL links, **drag & drop images/videos (up to 5)**
- 💡 **Suggestion**: Category, idea description, reference links, **drag & drop mockups/examples (up to 5)**
- 💥 **Crash Report**: Type, description, error message, **FiveM crash ZIP upload**

### What You Receive

Discord embeds with all structured data:
- Discord username (for changelog credits!)
- Category badges
- Severity levels
- Full descriptions
- Attached crash files

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 💡 TIPS & BEST PRACTICES

### Task Management
- Use **Critical** priority sparingly (triggers alerts!)
- Keep descriptions concise but useful
- Add screenshots for UI bugs
- Link related resources in description

### Changelogs
- Write from the player's perspective
- Lead with exciting features
- Credit bug reporters in COMMUNITY CREDITS
- Keep KNOWN ISSUES honest

### Roadmaps
- Be realistic with ETAs
- Use "In Dev" status to show active work
- Update regularly to maintain community trust

### Communication
- Respond to bug reports with acknowledgment
- Thank citizens for quality reports
- Feature active reporters in changelogs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🆘 TROUBLESHOOTING

| Issue | Solution |
|-------|----------|
| Tasks not syncing | Check JSONbin API key and Bin ID in settings |
| Webhook not posting | Verify URL starts with `https://discord.com/api/webhooks/` |
| Can't login | Contact The OG KiLLz for access code |
| File upload fails | Max 10MB for crash ZIPs, 5MB for images |
| Attachments not showing | Check URL is direct link to image/video |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📂 FILE STRUCTURE

```
/Phase City Dev Center/
├── taskboard.html       ← Staff task management
├── citizen-portal.html  ← Public feedback form
├── img/
│   └── logo.png         ← Phase City logo (optional)
└── STAFF-GUIDE.md       ← This document
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Questions? Contact The OG KiLLz**

*Phase City Dev Operations Center v1.0*
*Built by Claude vs Claude vs The World*
