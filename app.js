document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.mobile-menu').forEach((button) => button.addEventListener('click', () => {
    document.querySelector('.app')?.classList.toggle('mobile-nav-visible');
  }));
  const toast = (message) => {
    document.querySelector('.toast')?.remove();
    const note = document.createElement('div');
    note.className = 'toast';
    note.setAttribute('role', 'status');
    note.textContent = message;
    document.body.append(note);
    window.setTimeout(() => note.remove(), 2600);
  };

  document.querySelectorAll('[data-toast]').forEach((button) => {
    button.addEventListener('click', () => toast(button.dataset.toast));
  });
  document.querySelectorAll('.switch').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const enabled = toggle.classList.toggle('on');
      toggle.setAttribute('aria-pressed', String(enabled));
      toast(`${toggle.dataset.name || 'Setting'} ${enabled ? 'enabled' : 'disabled'}`);
    });
  });
  document.querySelectorAll('.tabs').forEach((tabs) => {
    tabs.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => {
      tabs.querySelector('.selected')?.classList.remove('selected');
      button.classList.add('selected');
      const group = button.closest('[data-tab-group]');
      if (group) {
        const key = button.dataset.filter;
        group.querySelectorAll('[data-category]').forEach((item) => {
          item.hidden = key !== 'all' && item.dataset.category !== key;
        });
      }
    }));
  });
  document.querySelectorAll('[data-search]').forEach((input) => {
    input.addEventListener('input', () => {
      const target = document.querySelector(input.dataset.search);
      if (!target) return;
      const query = input.value.trim().toLowerCase();
      target.querySelectorAll('[data-searchable]').forEach((item) => {
        item.hidden = !item.textContent.toLowerCase().includes(query);
      });
    });
  });
  document.querySelectorAll('.reply').forEach((button) => button.addEventListener('click', () => {
    const name = button.closest('.comment')?.querySelector('strong')?.textContent || 'this person';
    toast(`Reply composer opened for ${name}`);
  }));
  document.querySelectorAll('form[data-demo-form]').forEach((form) => form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = form.dataset.success || 'Saved successfully';
    toast(message);
    form.reset();
  }));
  document.querySelectorAll('[data-send-message]').forEach((form) => form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector('input');
    const text = input.value.trim();
    if (!text) return;
    const bubble = document.createElement('div');
    bubble.className = 'bubble mine';
    bubble.textContent = text;
    document.querySelector('.chat-messages')?.append(bubble);
    input.value = '';
    bubble.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }));
  document.querySelectorAll('[data-month-shift]').forEach((button) => button.addEventListener('click', () => {
    const title = document.querySelector('[data-month-title]');
    if (!title) return;
    const date = new Date(`${title.textContent} 1`);
    date.setMonth(date.getMonth() + Number(button.dataset.monthShift));
    title.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    toast(`Showing ${title.textContent}`);
  }));
});
