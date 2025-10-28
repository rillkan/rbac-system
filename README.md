# 📰 RBAC Articles API

A simple **Role-Based Access Control (RBAC)** system built with **NestJS**.  
It provides different permissions for **Admin**, **Editor**, and **Viewer** roles to manage articles in memory.

---

## 🚀 Features

- Role-based permissions for CRUD operations
- In-memory article storage (no database needed)
- Simple role simulation using the `Authorization` header
- Built with NestJS for modular structure and clarity

---

## 🧱 Roles & Permissions

| Role   | Create | Read | Update | Delete |
| ------ | :----: | :--: | :----: | :----: |
| Admin  |   ✅   |  ✅  |   ✅   |   ✅   |
| Editor |   ✅   |  ✅  |   ✅   |   ❌   |
| Viewer |   ❌   |  ✅  |   ❌   |   ❌   |

---

## ⚙️ Setup Instructions

### 1. Install dependencies

```bash
npm install
npm run start:dev
npx nest start --watch

Server will run at http://localhost:3000

Authorization: User <username>
| Username | Role   |
| -------- | ------ |
| admin    | Admin  |
| editor   | Editor |
| viewer   | Viewer |


Sample curl Tests
1. Viewer cannot POST (403)
curl -X POST http://localhost:3000/articles \
  -H "Authorization: User viewer" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","body":"Viewer fail"}'

2. Editor can POST (201)
curl -X POST http://localhost:3000/articles \
  -H "Authorization: User editor" \
  -H "Content-Type: application/json" \
  -d '{"title":"Editor Post","body":"Editors can post"}'

3. Admin can DELETE (204)
curl -X DELETE http://localhost:3000/articles/<article_id> \
  -H "Authorization: User admin"

4. Delete Non-existent (404)
curl -X DELETE http://localhost:3000/articles/a_0000000000 \
  -H "Authorization: User admin"
```
