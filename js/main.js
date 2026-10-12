/**
 * Maggie's Place BBQ - Official Website JavaScript
 * Handles live business status (NZ Timezone), menu filtering,
 * interactive catering calculator, modals, and mobile navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveHours();
  initMenuTabs();
  initCateringCalculator();
  initModals();
  initMobileDrawer();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. Live Business Hours Calculator (Pacific/Auckland Timezone)
   -------------------------------------------------------------------------- */
function initLiveHours() {
  function getNZDateTime() {
    // Current time in Pacific/Auckland
    const now = new Date();
    const nzString = now.toLocaleString('en-US', { timeZone: 'Pacific/Auckland' });
    return new Date(nzString);
  }

  function updateStatusUI() {
    const nzDate = getNZDateTime();
    const day = nzDate.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const hours = nzDate.getHours();
    const minutes = nzDate.getMinutes();
    const currentMinutes = hours * 60 + minutes;

    // Normal schedule: Mon-Fri 10:00 AM - 3:00 PM (15:00)
    // 10:00 AM = 600 min, 11:00 AM = 660 min, 3:00 PM = 900 min
    const isWeekday = day >= 1 && day <= 5;
    const isDoorsOpen = isWeekday && currentMinutes >= 600 && currentMinutes < 900;
    const isBBQHot = isWeekday && currentMinutes >= 660 && currentMinutes < 900;

    const headerStatusBadge = document.getElementById('header-status-badge');
    const headerStatusText = document.getElementById('header-status-text');
    const smokerStatusPill = document.getElementById('smoker-status-pill');
    const liveTimeIndicator = document.getElementById('live-nz-time');

    // Display NZ current time
    if (liveTimeIndicator) {
      const timeStr = nzDate.toLocaleTimeString('en-NZ', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      liveTimeIndicator.textContent = `Queenstown Time: ${timeStr} (NZST/NZDT)`;
    }

    // Highlight row in hours table
    const tableRows = document.querySelectorAll('.hours-table tr[data-day]');
    tableRows.forEach(row => {
      const rowDay = parseInt(row.getAttribute('data-day'), 10);
      if (rowDay === day) {
        row.classList.add('today-row');
      } else {
        row.classList.remove('today-row');
      }
    });

    if (isDoorsOpen) {
      if (headerStatusBadge) headerStatusBadge.classList.remove('closed');
      
      let statusLabel = 'OPEN NOW';
      let pillText = '🟢 Smoker Hot & Serving';

      if (!isBBQHot) {
        statusLabel = 'OPEN • BBQ AT 11AM';
        pillText = '🟡 Doors Open • Fresh BBQ Hot at 11:00 AM';
      } else if (currentMinutes >= 840) { // After 2:00 PM
        statusLabel = 'OPEN • CLOSING 3PM';
        pillText = '🟡 Serving Until Sold Out (Closes 3:00 PM)';
      }

      if (headerStatusText) headerStatusText.textContent = statusLabel;
      if (smokerStatusPill) {
        smokerStatusPill.textContent = pillText;
        smokerStatusPill.style.background = 'rgba(39, 174, 96, 0.2)';
        smokerStatusPill.style.color = '#2ECC71';
      }
    } else {
      if (headerStatusBadge) headerStatusBadge.classList.add('closed');

      let nextOpenText = 'Opens Tuesday 10:00 AM';
      if (day === 0) { // Sunday
        nextOpenText = 'Opens Monday 10:00 AM';
      } else if (day >= 1 && day <= 4 && currentMinutes >= 900) {
        const nextDayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day + 1];
        nextOpenText = `Opens ${nextDayName} 10:00 AM`;
      } else if (day >= 1 && day <= 5 && currentMinutes < 600) {
        nextOpenText = 'Opens Today at 10:00 AM';
      } else if (day === 5 && currentMinutes >= 900) { // Friday evening
        nextOpenText = 'Opens Monday 10:00 AM';
      } else if (day === 6) { // Saturday
        nextOpenText = 'Opens Monday 10:00 AM';
      }

      if (headerStatusText) headerStatusText.textContent = `CLOSED • ${nextOpenText}`;
      if (smokerStatusPill) {
        smokerStatusPill.textContent = `🔴 Closed Now • ${nextOpenText}`;
        smokerStatusPill.style.background = 'rgba(192, 57, 43, 0.2)';
        smokerStatusPill.style.color = '#E74C3C';
      }
    }
  }

  updateStatusUI();
  // Refresh every 60 seconds
  setInterval(updateStatusUI, 60000);
}

/* --------------------------------------------------------------------------
   2. Interactive Menu Filter
   -------------------------------------------------------------------------- */
function initMenuTabs() {
  const tabBtns = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active tab state
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. Chalet & Group Catering Calculator
   -------------------------------------------------------------------------- */
function initCateringCalculator() {
  const peopleInput = document.getElementById('catering-people-input');
  const typeSelect = document.getElementById('catering-type-select');
  const resultText = document.getElementById('estimator-result-text');
  const quoteBtn = document.getElementById('catering-quote-action');

  if (!peopleInput || !typeSelect || !resultText) return;

  function calculate() {
    const people = parseInt(peopleInput.value, 10) || 6;
    const eventType = typeSelect.value;

    // BBQ catering rule of thumb: ~350g to 450g smoked meat per hungry ski adult
    const totalMeatKg = (people * 0.4).toFixed(1);
    const brisketKg = (people * 0.22).toFixed(1);
    const ribsKg = (people * 0.18).toFixed(1);
    
    // Average cost estimation ($28 - $38 NZD per person for full smokehouse feast)
    const minCost = people * 28;
    const maxCost = people * 36;

    let packageRecommendation = '';
    if (people < 10) {
      packageRecommendation = `Recommend: Family Smoker Box (~${totalMeatKg}kg slow-cooked meat with brisket, pork belly or ribs, house slaw, pickles, and buns).`;
    } else if (people < 20) {
      packageRecommendation = `Recommend: Chalet Ski Feast Pack (Whole Cherry Wood Beef Brisket ~${brisketKg}kg + Racks of Ribs ~${ribsKg}kg, chips, and sides).`;
    } else {
      packageRecommendation = `Recommend: Large Group / Corporate BBQ Buffet (~${totalMeatKg}kg mixed smoked meats, hot pies, boil-up, salads, and dessert platters).`;
    }

    resultText.innerHTML = `
      <strong>Estimated for ${people} guests:</strong><br>
      • Approx. <strong>${totalMeatKg} kg</strong> of slow-smoked meats (${brisketKg}kg Beef Brisket + ${ribsKg}kg Spare Ribs/Pork Belly)<br>
      • Estimated package cost: <strong>$${minCost} - $${maxCost} NZD</strong> (incl. GST)<br>
      <span style="font-size:0.82rem; color: #D4A373;">${packageRecommendation}</span>
    `;

    if (quoteBtn) {
      const subject = encodeURIComponent(`Catering Inquiry for ${people} people - ${eventType}`);
      const body = encodeURIComponent(
        `Hi Maggie's Place BBQ team,\n\nI would like to inquire about catering for our group in Queenstown:\n- Number of guests: ${people}\n- Occasion: ${eventType}\n- Estimated smoked meat: ~${totalMeatKg}kg\n\nPlease let me know your availability and options.\n\nThank you!`
      );
      quoteBtn.href = `mailto:maggiesplacebbq@gmail.com?subject=${subject}&body=${body}`;
    }
  }

  peopleInput.addEventListener('input', calculate);
  typeSelect.addEventListener('change', calculate);
  calculate();
}

/* --------------------------------------------------------------------------
   4. Modals (Order Channels & Fast Pre-Order)
   -------------------------------------------------------------------------- */
function initModals() {
  const orderModal = document.getElementById('order-modal');
  const openOrderBtns = document.querySelectorAll('.trigger-order-modal');
  const closeOrderBtns = document.querySelectorAll('.close-modal');

  openOrderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (orderModal) {
        orderModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeOrderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   5. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const navLinks = document.querySelectorAll('.drawer-nav-link');

  function openDrawer() {
    if (drawer && overlay) {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && overlay) {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

function closeDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* --------------------------------------------------------------------------
   6. Smooth Anchor Scrolling with Header Offset
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#order-modal') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
