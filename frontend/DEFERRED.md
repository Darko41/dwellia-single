# Deferred items

Short list of things we consciously postponed. Keep this under one
screen. When an item is done, delete its section — do not mark it done.

## User -> Company (multi-tenancy)
- Status: next
- Blocks: real company isolation for units, showings, applications
- Markers: `grep -rn TODO_COMPANY src/`
- Notes: User entity has no company relation. Once added, update
  ApplicationService, UnitService, ShowingService, and the three
  frontend TODO_COMPANY sites.

## Showing interval refactor
- Status: pending
- Blocks: overlap detection, buffer time, availability slots
- Notes: Showing uses `scheduledAt` today. Move to `startsAt` /
  `endsAt` and switch duplicate check to interval overlap.

## Schema migration strategy
- Status: pending
- Blocks: safe schema changes once real data exists
- Notes: Hibernate `ddl-auto=update` today. Freeze baseline schema
  and switch to Flyway when the first real applicant submits.

## Sidebar "Bookings" link
- Status: pending
- Notes: `/admin/bookings` is linked from AdminSidebar but has no
  route in Routes.jsx. Either remove the link or build the page.