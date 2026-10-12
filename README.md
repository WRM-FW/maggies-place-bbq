# Maggie's Place BBQ — Official Website

中文说明见 [README.zh-CN.md](README.zh-CN.md)（documentation only — the site itself is English）.

> **Slow-Cooked. Wood-Fired. Really Fricken Good BBQ.**  
> 11 Margaret Place, Frankton, Queenstown 9300, New Zealand  
> Phone: [+64 22 410 5525](tel:+64224105525) | Email: [maggiesplacebbq@gmail.com](mailto:maggiesplacebbq@gmail.com)  
> Google Maps Rating: **5.0 / 5.0 (108 Verified Reviews)**

---

## 📖 Overview

This repository contains the complete, production-ready official website for **Maggie's Place BBQ**, Queenstown's premier hidden smokehouse located in the Frankton Industrial Estate. 

Built with a **mobile-first** approach, the site prioritizes smartphone touch ergonomics, ultra-fast loading over mobile cellular networks, and immediate customer actions: ordering food, one-tap calling, interactive Google Maps navigation, live business hours tracking, and connecting with social feeds.

---

## 🚀 How to Deploy on GitHub Pages

This website is built entirely as a standalone static web application with clean relative asset paths, zero external framework build dependencies, and native GitHub Pages compatibility.

### Step-by-Step Deployment:

1. **Create a GitHub Repository**:
   - Go to [GitHub.com](https://github.com) and click **New Repository**.
   - Name it (e.g., `maggies-place-bbq` or `maggiesplacebbq.github.io`).
   - Set visibility to **Public**.

2. **Upload Website Files**:
   - Unzip `maggies-place-bbq-website.zip`.
   - Push or upload all files from the root of this folder (`index.html`, `css/`, `js/`, `assets/`, `.nojekyll`, `README.md`) directly into the root of your GitHub repository:
     ```bash
     git init
     git add .
     git commit -m "Initial release of Maggie's Place BBQ official website"
     git branch -M main
     git remote add origin https://github.com/<your-username>/maggies-place-bbq.git
     git push -u origin main
     ```

3. **Enable GitHub Pages**:
   - In your repository, go to **Settings** -> **Pages** (under the "Code and automation" sidebar).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Under **Branch**, select `main` (or `master`) and `/ (root)`, then click **Save**.

4. **Live URL**:
   - Within 1–2 minutes, your website will be live at:
     `https://<your-username>.github.io/maggies-place-bbq/`

---

## 🛠️ Key Features & Architecture

### 1. Mobile-First UX & Ergonomics
- **Bottom Quick Action Bar**: Thumb-accessible sticky dock on mobile screens providing instant access to:
  - 📞 **Call Now** (`tel:+64224105525`)
  - 🗺️ **Directions** (Direct link to Google Maps destination)
  - 🍖 **Order Online** (Opens modal with Uber Eats, Pickup & Catering)
  - 📸 **Instagram** (`@maggiesplacebbq`)
- **Safe Area Inset Aware**: Fully respects iOS Safari Home Indicator bar (`env(safe-area-inset-bottom)`) and Android gesture pill without blocking content.
- **Slide-Out Mobile Drawer**: Accessible navigation with clear 44px+ touch targets.

### 2. Live Dynamic Business Hours (NZ Timezone)
- Real-time JavaScript engine synchronized to New Zealand Standard / Daylight Time (`Pacific/Auckland`).
- Dynamically displays:
  - `OPEN NOW • SMOKER HOT` during active service (Mon–Fri 10:00 AM – 3:00 PM; BBQ served from 11:00 AM).
  - Next opening time when closed (e.g. `Closed Now • Opens Tuesday 10:00 AM`).
  - Highlights current day of the week in the Opening Hours schedule table.

### 3. Interactive Menu Filter & Pricing
- Categorized tabs: **All Specialties**, **Sandwiches & Buns**, **By The Weight**, **Hot Pies & Kiwi Kai**, **Combos & Sides**, and **Chalet Catering**.
- Real menu prices and descriptions verified from Maggie's official posts ($9.00 - $19.50 sandwiches, $12.49/250g ribs, $8.50 house-smoked bacon & egg pie, $15.00 Margaret Place FB lunch combo).

### 4. Queenstown Ski Chalet & Group Catering Estimator
- Tailored for Queenstown ski parties, chalet stays, and Airbnb groups.
- Interactive calculator estimating recommended meat weight (kg) and budget based on guest headcount.
- Instant pre-order email trigger with pre-filled inquiry template.

### 5. Verified Brand & Business Information
- **Physical Address**: 11 Margaret Place, Frankton, Queenstown 9300, New Zealand
- **Plus Code**: `XQV2+GM Queenstown, New Zealand`
- **Phone**: `+64 22 410 5525`
- **Email**: `maggiesplacebbq@gmail.com`
- **Google Maps Link**: `https://maps.google.com/?q=Maggies+Place+BBQ+Queenstown`
- **Facebook**: `https://www.facebook.com/maggiesplacebbq`
- **Instagram**: `https://www.instagram.com/maggiesplacebbq/`
- **Delivery**: Uber Eats Queenstown

---

## 📁 Project Directory Structure

```
maggies-place-bbq/
├── .nojekyll                   # GitHub Pages Jekyll bypass flag
├── index.html                  # Semantic, accessible HTML5 single-page site
├── README.md                   # Project documentation & deployment guide
├── css/
│   └── style.css               # Smokehouse design tokens, responsive layout
├── js/
│   └── main.js                 # Live hours, menu filters, modals, calculator
└── assets/
    └── images/
        ├── favicon.svg         # SVG favicon
        ├── logo.svg            # Custom vector brand badge logo
        ├── hero-platter.jpg    # Queenstown alpine smokehouse platter hero image
        ├── beef-brisket.jpg    # 14-Hour cherry-wood smoked beef brisket
        ├── pork-belly-sandwich.jpg  # Pork belly sandwich with chimichurri
        ├── fried-chicken-sandwich.jpg # Maggie's crispy fried chicken sandwich
        └── pork-spareribs.jpg  # Cherry wood smoked sticky spareribs
```

---

## 🥩 Brand Philosophy

> *"Here at Maggie's we like to take our time and enjoy the simple things. That's why our signature Beef Brisket is cooked long and slow over Cherry wood, with only 5 ingredients: Beef Brisket, Salt, Pepper, Smoke and Time."*  
> — Margaret Barbara Kew (Maggie)
