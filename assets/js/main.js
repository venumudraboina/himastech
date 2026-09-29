/**
 * HIMASTECH - Digital Realty Marketing
 * Core Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initComparisonSlider();
  initRoiCalculator();
  initAiSimulator();
  initPhoneSimulator();
  initFunnelTabs();
  initFilterTabs();
  initModals();
  initLiveDashboard();
  initForms();
  initHashRouting();
});

/* ==========================================================================
   1. Navigation & Sticky Header
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.className = 'ri-close-line';
        } else {
          icon.className = 'ri-menu-line';
        }
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'ri-menu-line';
      });
    });
  }

  // Active section highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active');
        } else {
          targetNav.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================================
   2. Interactive Draggable Before / After Comparison Slider
   ========================================================================== */
function initComparisonSlider() {
  const container = document.querySelector('.comparison-slider-container');
  if (!container) return;

  const wrapper = container.querySelector('.slider-img-wrapper');
  const handle = container.querySelector('.slider-handle');
  let isDragging = false;

  function setSliderPosition(x) {
    const rect = container.getBoundingClientRect();
    let position = x - rect.left;
    if (position < 0) position = 0;
    if (position > rect.width) position = rect.width;
    const percentage = (position / rect.width) * 100;

    wrapper.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Support for Mobile
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    setSliderPosition(e.touches[0].clientX);
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.touches[0].clientX);
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

/* ==========================================================================
   3. Real Estate Lead & ROI Estimator Calculator
   ========================================================================== */
function initRoiCalculator() {
  const budgetRange = document.getElementById('calcBudget');
  const budgetDisplay = document.getElementById('calcBudgetValue');
  const projectType = document.getElementById('calcProjectType');
  const locationSelect = document.getElementById('calcLocation');

  const metricReach = document.getElementById('metricReach');
  const metricLeads = document.getElementById('metricLeads');
  const metricVisits = document.getElementById('metricVisits');
  const metricBookings = document.getElementById('metricBookings');
  const metricRevenue = document.getElementById('metricRevenue');
  const metricCpl = document.getElementById('metricCpl');

  if (!budgetRange || !budgetDisplay) return;

  function calculate() {
    const budget = parseInt(budgetRange.value, 10);
    budgetDisplay.textContent = '₹' + budget.toLocaleString('en-IN');

    const pType = projectType ? projectType.value : 'villas';
    let baseCpl = 350;
    let avgTicketValue = 25000000; // 2.5 Cr
    let conversionRate = 0.035; // 3.5% site visits to bookings

    if (pType === 'sky-villas') {
      baseCpl = 480;
      avgTicketValue = 55000000; // 5.5 Cr
      conversionRate = 0.025;
    } else if (pType === 'luxury-apartments') {
      baseCpl = 320;
      avgTicketValue = 18000000; // 1.8 Cr
      conversionRate = 0.04;
    } else if (pType === 'commercial') {
      baseCpl = 650;
      avgTicketValue = 40000000; // 4 Cr
      conversionRate = 0.03;
    } else if (pType === 'open-plots') {
      baseCpl = 220;
      avgTicketValue = 6500000; // 65 Lakhs
      conversionRate = 0.06;
    }

    const estimatedLeads = Math.round(budget / baseCpl);
    const estimatedReach = Math.round(budget * 28);
    const estimatedVisits = Math.round(estimatedLeads * 0.28);
    const estimatedBookings = Math.max(1, Math.round(estimatedVisits * conversionRate));
    const projectedInventoryValue = estimatedBookings * avgTicketValue;

    if (metricReach) metricReach.textContent = estimatedReach.toLocaleString('en-IN') + '+';
    if (metricLeads) metricLeads.textContent = estimatedLeads.toLocaleString('en-IN');
    if (metricCpl) metricCpl.textContent = '₹' + baseCpl;
    if (metricVisits) metricVisits.textContent = estimatedVisits.toLocaleString('en-IN') + ' Visits';
    if (metricBookings) metricBookings.textContent = estimatedBookings + ' Bookings';
    if (metricRevenue) {
      const crVal = (projectedInventoryValue / 10000000).toFixed(1);
      metricRevenue.textContent = `₹${crVal} Cr+`;
    }
  }

  budgetRange.addEventListener('input', calculate);
  if (projectType) projectType.addEventListener('change', calculate);
  if (locationSelect) locationSelect.addEventListener('change', calculate);

  calculate();
}

/* ==========================================================================
   4. Interactive AI Ad & Strategy Simulator
   ========================================================================== */
function initAiSimulator() {
  const btnGenerate = document.getElementById('aiGenerateBtn');
  const aiOutputLog = document.getElementById('aiOutputLog');
  const aiPropType = document.getElementById('aiPropType');
  const aiLocation = document.getElementById('aiLocation');
  const aiTargetAudience = document.getElementById('aiTargetAudience');

  if (!btnGenerate || !aiOutputLog) return;

  const strategies = [
    {
      hook: "✨ 'Live Above the Clouds in Kokapet' — 5BHK Sky-Mansions with Private Plunge Pools & 360° Skyline Views.",
      targeting: "NRIs (US/UAE) + Tech CXOs in Financial District (Income ₹80L+) + Jubilee Hills High Net Worths",
      channels: "Instagram Reels 3D Tour + Google Search 'Luxury Gated Villas' + WhatsApp Verified Catalog",
      forecast: "⚡ Projected CPL: ₹340 | Estimated Lead-to-Visit Rate: 32% | AI Relevance Score: 98/100"
    },
    {
      hook: "🏢 'Next-Gen Commercial Suites with 9.2% Assured ROI' — Pre-Leased Corporate Floor Plates in Gachibowli.",
      targeting: "Angel Investors, Doctors, Senior IT Directors, High Net-Worth Portfolio Diversifiers",
      channels: "LinkedIn Sponsored InMail + Meta Lead Gen Forms + Retargeting Video Ads",
      forecast: "⚡ Projected CPL: ₹480 | Estimated Site Inspection Conversion: 24% | AI Relevance Score: 95/100"
    },
    {
      hook: "🌿 'Your Private 400 Sq.Yd Green Haven' — RERA & HMDA Approved Luxury Villa Plots near Neopolis.",
      targeting: "Doctors, Business Owners, Second Home Buyers, Hyderabad NRIs seeking High Capital Appreciation",
      channels: "Meta Carousel Ads + YouTube In-Stream Drone Tours + Automated WhatsApp Brochure Dispatch",
      forecast: "⚡ Projected CPL: ₹220 | Estimated Weekend Visit Surge: 45+ Visits | AI Relevance Score: 99/100"
    }
  ];

  let simIndex = 0;

  btnGenerate.addEventListener('click', () => {
    btnGenerate.disabled = true;
    btnGenerate.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Neural AI Generating Campaign...`;
    aiOutputLog.innerHTML = `
      <div style="color: #38bdf8; font-family: monospace;">
        > Initializing Himastech Real-Estate AI Engine v4.8...<br>
        > Analyzing Hyderabad micro-market buyer intent data...<br>
        > Synthesizing multi-channel ad copy, visual hooks & audience vectors...
      </div>
    `;

    setTimeout(() => {
      const selected = strategies[simIndex % strategies.length];
      simIndex++;

      const propText = aiPropType ? aiPropType.value : 'Luxury Sky Villa';
      const locText = aiLocation ? aiLocation.value : 'Kokapet, Hyderabad';

      aiOutputLog.innerHTML = `
        <div class="ai-generated-card">
          <p style="color: #f5a623; font-weight: 700; margin-bottom: 8px;">
            <i class="ri-sparkling-fill"></i> AI-Optimized Campaign Blueprint for: ${propText} (${locText})
          </p>
          <div style="margin-bottom: 10px;">
            <strong style="color: #fff;">🎯 High-Converting Ad Hook:</strong>
            <p style="color: #cbd5e1; font-style: italic; margin-top: 4px;">"${selected.hook}"</p>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #38bdf8;">👥 Hyper-Targeted Audience Vector:</strong>
            <p style="color: #94a3b8; font-size: 0.85rem;">${selected.targeting}</p>
          </div>
          <div style="margin-bottom: 10px;">
            <strong style="color: #10b981;">🚀 Recommended Media Mix:</strong>
            <p style="color: #94a3b8; font-size: 0.85rem;">${selected.channels}</p>
          </div>
          <div style="padding: 10px; background: rgba(56, 189, 248, 0.1); border-radius: 6px; border-left: 3px solid #38bdf8;">
            <span style="color: #38bdf8; font-weight: 600;">${selected.forecast}</span>
          </div>
        </div>
      `;

      btnGenerate.disabled = false;
      btnGenerate.innerHTML = `<i class="ri-magic-line"></i> Re-Generate AI Strategy`;
      showToast('✨ AI Campaign Blueprint Generated Successfully!');
    }, 1200);
  });
}

/* ==========================================================================
   5. Interactive Smartphone Simulator (VCard & Mini-Website)
   ========================================================================== */
function initPhoneSimulator() {
  const simCallBtn = document.getElementById('simCallBtn');
  const simWaBtn = document.getElementById('simWaBtn');
  const simBrochureBtn = document.getElementById('simBrochureBtn');
  const simUpiBtn = document.getElementById('simUpiBtn');

  if (simCallBtn) {
    simCallBtn.addEventListener('click', () => {
      showToast('📞 Initiating Call: +91 91212 00000 (Himastech Direct)');
    });
  }

  if (simWaBtn) {
    simWaBtn.addEventListener('click', () => {
      showToast('💬 Opening Verified WhatsApp Business Chat with Instant Greeting...');
      window.open('https://wa.me/919121200000?text=Hi%20Himastech,%20I%20am%20interested%20in%20Digital%20Visiting%20Card%20and%20Real%20Estate%20Marketing%20Solutions', '_blank');
    });
  }

  if (simBrochureBtn) {
    simBrochureBtn.addEventListener('click', () => {
      showToast('📄 Instant Digital Brochure & Floor Plan downloaded onto device!');
    });
  }

  if (simUpiBtn) {
    simUpiBtn.addEventListener('click', () => {
      showToast('💳 Instant QR / UPI Payment Gateway activated!');
    });
  }
}

/* ==========================================================================
   6. Growth Funnel Interactive Step Switcher
   ========================================================================== */
const funnelData = [
  {
    step: "01",
    title: "ATTRACT (Attention)",
    heading: "Laser-Targeted Real Estate Brand Visibility",
    desc: "We deploy hyper-targeted multi-channel ad campaigns across Meta, Google Search, YouTube 4K video ads, and programmatic networks to reach High Net Worth Individuals (HNIs), NRIs in the USA/Dubai, and qualified homebuyers in targeted Hyderabad micro-markets.",
    points: [
      "Micro-location geo-fencing (Kokapet, Financial District, Jubilee Hills, Gachibowli)",
      "High-intent NRI audience profiling & time-zone ad scheduling",
      "Cinematic 3D architectural renders and video creatives",
      "Dynamic search ads targeting ready-to-buy search queries"
    ]
  },
  {
    step: "02",
    title: "ENGAGE (Interaction)",
    heading: "Immersive Storytelling & Interactive Touchpoints",
    desc: "Once attention is captured, we guide prospects through lightning-fast, ultra-luxurious mobile landing pages, 3D interactive floor plans, virtual walkthroughs, and smart digital brochures that captivate and build deep brand desire.",
    points: [
      "Sub-second loading real estate project microsites",
      "Interactive 3D villa & apartment floor-plan navigators",
      "Virtual site-tour video embeds with high-intent lead triggers",
      "Compelling developer heritage and trust-building social proof"
    ]
  },
  {
    step: "03",
    title: "LEADS (Conversion)",
    heading: "Automated Lead Capture & Instant Qualification",
    desc: "Every interested buyer is captured instantly. We eliminate friction with one-tap WhatsApp conversational bots, instant CRM webhook synchronization, and automated 60-second SMS/WhatsApp notification dispatches.",
    points: [
      "AI-powered WhatsApp chatbot with automated brochure dispatch",
      "Real-time lead delivery directly to builder sales managers",
      "2-step OTP/phone verification to eliminate spam inquiries",
      "Lead scoring algorithms to prioritize hot budget-ready buyers"
    ]
  },
  {
    step: "04",
    title: "SALES (Closing)",
    heading: "On-Ground Sales Enablement & Closing Frameworks",
    desc: "Led by Kishore Patel's 12+ years of sales leadership, we train your internal sales team and channel partners with closing scripts, site visit follow-up protocols, and objection handling frameworks that turn leads into site visits and token bookings.",
    points: [
      "Sales script playbooks for high-value property pitches",
      "Site-visit conversion maximization training sessions",
      "Automated WhatsApp follow-up drip campaigns for warm leads",
      "Channel partner digital marketing enablement kits"
    ]
  },
  {
    step: "05",
    title: "GROWTH (Scaling)",
    heading: "Continuous Optimization & Inventory Sell-Out",
    desc: "We analyze daily CPL, cost-per-site-visit, and booking attribution to double down on winning ad sets, scale budgets safely, and systematically sell out real estate inventory ahead of deadlines.",
    points: [
      "Daily AI-driven campaign optimization & bid adjustments",
      "Weekly builder executive dashboard & transparent ROI reports",
      "Rapid creative refreshes to beat audience ad fatigue",
      "Continuous reduction in Customer Acquisition Cost (CAC)"
    ]
  }
];

function initFunnelTabs() {
  const buttons = document.querySelectorAll('.funnel-step-btn');
  const card = document.querySelector('.funnel-detail-card');
  if (!buttons.length || !card) return;

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const data = funnelData[index];
      const leftCol = card.querySelector('.funnel-detail-left');
      if (leftCol && data) {
        leftCol.innerHTML = `
          <div class="section-tag">${data.step} // ${data.title}</div>
          <h3 class="text-gold-gradient">${data.heading}</h3>
          <p class="section-subtitle" style="font-size: 1rem; margin-bottom: 20px;">${data.desc}</p>
          <ul class="funnel-checklist">
            ${data.points.map(pt => `<li><i class="ri-checkbox-circle-fill"></i> <span>${pt}</span></li>`).join('')}
          </ul>
        `;
      }
    });
  });
}

/* ==========================================================================
   7. Portfolio & Services Filter Tabs
   ========================================================================== */
function initFilterTabs() {
  // Services Filter
  const serviceTabs = document.querySelectorAll('.service-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      serviceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      serviceCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Portfolio Filter
  const portTabs = document.querySelectorAll('.portfolio-tab-btn');
  const portCards = document.querySelectorAll('.portfolio-card');

  portTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      portTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      portCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. Modals & Consultation Handlers
   ========================================================================== */
function initModals() {
  const modalOverlay = document.getElementById('consultationModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const openButtons = document.querySelectorAll('.trigger-consultation-modal');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modalOverlay) modalOverlay.classList.add('active');
    });
  });

  if (closeBtn && modalOverlay) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // Keyboard Escape / 'K' shortcut
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });
}

/* ==========================================================================
   9. Live Marketing Dashboard Pulse
   ========================================================================== */
function initLiveDashboard() {
  const liveLeadCount = document.getElementById('liveLeadsCount');
  const liveCampaignCount = document.getElementById('liveCampaignsCount');
  const liveTickerElement = document.getElementById('liveActivityTicker');

  const liveEvents = [
    "🔥 New ₹5.2Cr Villa Inquiry generated for Kokapet Project",
    "📈 CPL reduced to ₹290 on Meta NRI Campaign (USA/Dallas)",
    "⚡ 12 Qualified Site Visits booked today via WhatsApp Bot",
    "✨ AI Campaign Generator launched 6 fresh video ad variants",
    "🏢 Commercial Suite lease inquiry received from IT MNC (45,000 sq.ft)",
    "🎉 Gated Community Phase 2: 85% inventory sold out!"
  ];

  let counter = 4892;
  setInterval(() => {
    counter += Math.floor(Math.random() * 2) + 1;
    if (liveLeadCount) {
      liveLeadCount.textContent = counter.toLocaleString('en-IN');
    }
  }, 4500);

  let eventIdx = 0;
  setInterval(() => {
    if (liveTickerElement) {
      eventIdx = (eventIdx + 1) % liveEvents.length;
      liveTickerElement.innerHTML = `<i class="ri-flashlight-fill" style="color: #f5a623;"></i> ${liveEvents[eventIdx]}`;
    }
  }, 5000);
}

/* ==========================================================================
   10. Form Submissions & WhatsApp Dispatch
   ========================================================================== */
function initForms() {
  const mainContactForm = document.getElementById('mainContactForm');
  const modalContactForm = document.getElementById('modalContactForm');

  function handleFormSubmit(e, form) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Submitting Consultation Request...`;

    const name = form.querySelector('input[name="name"]')?.value || 'Client';
    const phone = form.querySelector('input[name="phone"]')?.value || '';
    const service = form.querySelector('select[name="service"]')?.value || 'Real Estate Marketing';

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
      form.reset();

      const modal = document.getElementById('consultationModal');
      if (modal) modal.classList.remove('active');

      showToast(`🎉 Thank you, ${name}! Your consultation request is confirmed. Kishore Patel & our team will contact you within 2 business hours.`);

      // Optional: prepare WhatsApp redirect message
      const text = encodeURIComponent(`Hello Himastech team! My name is ${name}. Phone: ${phone}. I am requesting a consultation for: ${service}.`);
      setTimeout(() => {
        const confirmWa = confirm(`Would you like to open WhatsApp directly to chat with Kishore Patel right now?`);
        if (confirmWa) {
          window.open(`https://wa.me/919121200000?text=${text}`, '_blank');
        }
      }, 800);
    }, 1200);
  }

  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => handleFormSubmit(e, mainContactForm));
  }

  if (modalContactForm) {
    modalContactForm.addEventListener('submit', (e) => handleFormSubmit(e, modalContactForm));
  }
}

/* ==========================================================================
   11. Multi-Page URL Hash Routing & Deep Links
   ========================================================================== */
function initHashRouting() {
  function handleHash() {
    const hash = window.location.hash;
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }

  window.addEventListener('hashchange', handleHash);
  if (window.location.hash) {
    handleHash();
  }
}

/* ==========================================================================
   12. Universal Toast Notification Helper
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('himastechToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'himastechToast';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="ri-checkbox-circle-fill" style="color: #f5a623; font-size: 1.2rem;"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}
