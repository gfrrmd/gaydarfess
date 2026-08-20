/* ── PAGE EXIT TRANSITION ── */
document.addEventListener('click', function(e) {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('javascript') || link.target === '_blank') return;
  // only animate same-origin links
  try {
    const url = new URL(href, location.origin);
    if (url.origin !== location.origin) return;
  } catch { return; }
  e.preventDefault();
  document.body.style.transition = 'opacity .18s ease, transform .18s ease';
  document.body.style.opacity = '0';
  document.body.style.transform = 'translateY(-5px)';
  setTimeout(() => { location.href = href; }, 190);
});

/* ── RIPPLE EFFECT on .btn and .icon-btn ── */
function attachRipple(el) {
  el.addEventListener('pointerdown', function(e) {
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute;
      left:${x}px;top:${y}px;
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:rgba(255,255,255,0.12);
      pointer-events:none;
      transform:scale(0);
      animation:ripple .45s ease;
    `;
    el.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}

document.querySelectorAll('.btn, .icon-btn').forEach(attachRipple);

/* ── LIKE TOGGLE ── */
document.querySelectorAll('.like-btn').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = btn.dataset.id;
    const res = await fetch(`/threads/${id}/like`, { method: 'POST' });
    if (!res.ok) return;
    const data = await res.json();
    btn.dataset.liked = String(data.liked);
    btn.querySelector('.icon-stroke').textContent = data.liked ? 'Liked' : 'Like';
    btn.querySelector('.metric').textContent = data.likes;
  });
});

/* ── MODAL (bottom sheet) ── */
function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.style.display = 'flex';
  requestAnimationFrame(() => overlay.classList.add('open'));
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  const modal = overlay.querySelector('.modal');
  if (modal) {
    modal.style.animation = 'modalIn .22s cubic-bezier(.32,1.2,.5,1) reverse';
  }
  overlay.style.background = 'rgba(0,0,0,0)';
  setTimeout(() => {
    overlay.style.display = 'none';
    overlay.classList.remove('open');
    if (modal) modal.style.animation = '';
    overlay.style.background = '';
  }, 220);
}

/* close modal on backdrop tap */
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

/* ── SHARE PROFILE ── */
function copyProfileLink() {
  if (navigator.share) {
    navigator.share({ title: 'GaydarFess', url: window.location.href });
  } else {
    navigator.clipboard?.writeText(window.location.href);
  }
}

/* ── TABS ── */
document.querySelectorAll('[data-tab-root]').forEach(root => {
  root.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.tabTarget;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      button.classList.add('active');
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.add('active');
    });
  });
});
