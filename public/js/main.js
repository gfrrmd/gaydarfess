const likeButtons = document.querySelectorAll('.like-btn');

likeButtons.forEach(btn => {
  btn.addEventListener('click', async (event) => {
    event.preventDefault();
    const id = btn.dataset.id;
    const res = await fetch(`/threads/${id}/like`, { method: 'POST' });
    if (!res.ok) return;
    const data = await res.json();
    btn.dataset.liked = String(data.liked);
    btn.querySelector('.icon-stroke').textContent = data.liked ? 'Liked' : 'Like';
    btn.querySelector('.metric').textContent = data.likes;
  });
});

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'flex';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}

function copyProfileLink() {
  navigator.clipboard.writeText(window.location.href);
}

const tabRoots = document.querySelectorAll('[data-tab-root]');
tabRoots.forEach(root => {
  const buttons = root.querySelectorAll('.tab-btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.tabTarget;
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(targetId)?.classList.add('active');
    });
  });
});
