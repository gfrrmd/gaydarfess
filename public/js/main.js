// Like toggle
document.querySelectorAll('.like-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const id = btn.dataset.id;
    const res = await fetch(`/threads/${id}/like`, { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      btn.querySelector('.like-count').textContent = data.likes;
      btn.querySelector('.like-icon').textContent = data.liked ? '❤️' : '🤍';
      btn.dataset.liked = data.liked;
    }
  });
});

// Toggle reply box
function toggleReply(id) {
  const box = document.getElementById('reply-' + id);
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

// Profile tab (cosmetic)
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});
