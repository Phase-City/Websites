# 📋 PHASE CITY FORUM MANAGEMENT GUIDE
## For Staff: Managing Citizen Feedback Channels

---

## 🎯 OVERVIEW

When citizens submit feedback through the **Citizen Portal**, their submissions automatically create:
1. **A public forum thread** — where the community can discuss and vote
2. **A staff channel post** — for internal tracking
3. **A task in the Taskboard** — for dev assignment (after SYNC)

Your job is to **triage, tag, and track** these submissions.

---

## 📁 FORUM CHANNELS

| Channel | Purpose |
|---------|---------|
| `#citizen-bug-reports` | Bug reports from players |
| `#citizen-suggestions` | Feature ideas and improvements |
| `#citizen-crash-reports` | Game crashes and freezes |

---

## 🏷️ SETTING UP TAGS (One-Time Setup)

### How to Add Tags:

1. **Right-click** on the forum channel (e.g., `#citizen-suggestions`)
2. Click **"Edit Channel"**
3. Scroll to **"TAGS"** section
4. Click **"Create Tag"** for each tag below

### Status Tags (Add to ALL 3 forum channels):

| Tag | Emoji | When to Use |
|-----|-------|-------------|
| `New` | 🆕 | Just submitted, not reviewed yet |
| `Acknowledged` | ✅ | Staff has seen it, will look into it |
| `In Progress` | 🔧 | Actively being worked on |
| `Fixed` | ✔️ | Issue resolved / Feature added |
| `Won't Fix` | ❌ | Not going to implement (explain why in thread) |
| `Duplicate` | 🔁 | Already reported (link to original) |
| `Need Info` | ❓ | Waiting for more details from reporter |

### Category Tags (Matching your Discord setup):

| Tag | Emoji | Description |
|-----|-------|-------------|
| `UI` | 🖥️ | User interface issues |
| `Jobs` | 💼 | Job scripts (police, ems, mechanic, etc.) |
| `Phone/Comms` | 📱 | LB-Phone, radio, comms |
| `Vehicles` | 🚗 | Cars, garages, handling |
| `Economy` | 💰 | Money, prices, banking |
| `Housing` | 🏠 | Properties, furniture, shells |
| `Illegal` | 🚨 | Drugs, heists, crime |
| `Inventory` | 🎒 | Items, stashes, inventory system |
| `Mapping` | 🗺️ | MLOs, world props, locations |
| `General` | 📋 | Everything else |

### Settings to Enable:
- ✅ **Allow members to create posts** — ON
- ✅ **Require a tag** — OPTIONAL (forces submitter to categorize)
- ✅ **Show media previews** — ON

---

## 🔄 DAILY WORKFLOW

### When a New Submission Comes In:

```
1. READ the submission
   └─→ Understand what they're reporting/suggesting

2. ADD STATUS TAG
   └─→ Start with 🆕 New or ✅ Acknowledged

3. ADD CATEGORY TAG (if using them)
   └─→ UI, Jobs, Phone, etc.

4. RESPOND (optional but appreciated)
   └─→ "Thanks for the report! We'll look into this."
   └─→ "Great idea! We'll discuss this with the team."

5. CHECK TASKBOARD
   └─→ After SYNC, the task should appear
   └─→ Assign to yourself or appropriate dev
```

### Status Progression:

```
🆕 New
   │
   ▼
✅ Acknowledged ──→ ❓ Need Info (if unclear)
   │                      │
   │                      ▼
   │               (wait for response)
   │                      │
   ▼                      │
🔧 In Progress ◄──────────┘
   │
   ▼
✔️ Fixed  OR  ❌ Won't Fix
```

---

## 💬 RESPONDING TO THREADS

### Good Response Examples:

**For Bug Reports:**
> "Thanks for reporting this! I was able to reproduce the issue. We'll get this fixed in the next patch. 🔧"

> "Can you provide more details? What job were you doing when this happened? Any error messages?"

**For Suggestions:**
> "Great idea! This aligns with some things we've been planning. Added to the roadmap! 🗺️"

> "Interesting thought! We'll discuss this with the team and see if it fits our vision for Phase City."

**For Won't Fix:**
> "Thanks for the suggestion! After discussing with the team, we've decided this doesn't fit our current direction because [reason]. We appreciate you taking the time to share your ideas!"

---

## 🔁 HANDLING DUPLICATES

When you see a duplicate submission:

1. Add the **🔁 Duplicate** tag
2. Reply with a link to the original thread:
   > "Thanks for reporting! This has already been submitted here: [link]. I'm marking this as a duplicate. Feel free to add your thoughts to the original thread!"
3. **Lock the thread** (optional) — Right-click thread → "Lock Post"

---

## 📊 COMMUNITY VOTING

The community will use **👍 and 👎 reactions** to vote on submissions.

**How to use this info:**
- High 👍 count = Community wants this / Many people affected
- Check vote counts when prioritizing tasks
- Mention popular requests in changelog credits!

---

## 🔗 LINKING TO TASKBOARD

Each submission auto-creates a task in the **Phase City Taskboard**. 

To find the matching task:
1. Open Taskboard → Click **⟳ SYNC**
2. Look for tasks with **📬 CITIZEN** badge
3. Task title will match the forum thread title
4. Assign, add notes, update status as needed

---

## ⚡ QUICK REFERENCE

### Keyboard Shortcuts in Discord Forums:
- `Ctrl/Cmd + K` — Quick search
- `Ctrl/Cmd + E` — Quick emoji picker

### Tag Colors (if you want consistency):
- 🆕 New — Gray/Default
- ✅ Acknowledged — Green
- 🔧 In Progress — Yellow
- ✔️ Fixed — Green
- ❌ Won't Fix — Red
- 🔁 Duplicate — Blue
- ❓ Need Info — Orange

---

## 📱 MOBILE TIP

You can manage forum tags from the Discord mobile app too:
1. Open the thread
2. Tap the thread title at the top
3. Tap "Edit Tags"
4. Select/deselect tags
5. Tap "Done"

---

## 🎯 GOALS

1. **Respond within 24-48 hours** — Even just acknowledging shows we care
2. **Keep status tags updated** — Community can see progress
3. **Credit reporters in changelogs** — Builds community loyalty
4. **Be professional but friendly** — We're all here to make Phase City better

---

## ❓ QUESTIONS?

Hit up **The OG KiLLz** if you have questions about:
- Prioritization decisions
- Technical feasibility
- Community management approach

---

*Phase City - The city that builds itself.!*
