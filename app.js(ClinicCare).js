document.addEventListener('DOMContentLoaded', () => {

    // Helper: Toast Notifications
    function showToast(message) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = message;
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    // Auth Views Switching
    function switchAuthView(viewName) {
        document.querySelectorAll('.auth-view').forEach(v => v.classList.remove('active'));
        if (viewName === 'login') document.getElementById('auth-login-view')?.classList.add('active');
        if (viewName === 'signup') document.getElementById('auth-signup-view')?.classList.add('active');
        if (viewName === 'forgot') document.getElementById('auth-forgot-view')?.classList.add('active');
        if (viewName === 'reset-sent') document.getElementById('auth-code-view')?.classList.add('active');
    }

    // Attach Event Listeners to Auth Buttons
    document.getElementById('btn-to-forgot')?.addEventListener('click', () => switchAuthView('forgot'));
    document.getElementById('btn-to-signup')?.addEventListener('click', () => switchAuthView('signup'));
    document.getElementById('btn-to-login-from-signup')?.addEventListener('click', () => switchAuthView('login'));
    document.getElementById('btn-to-login-from-forgot')?.addEventListener('click', () => switchAuthView('login'));
    document.getElementById('btn-to-login-from-code')?.addEventListener('click', () => switchAuthView('login'));

    // Handle Auth Form Submissions
    document.getElementById('login-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Logged in successfully!');
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('app-screen').style.display = 'flex';
    });

    document.getElementById('signup-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Account created successfully!');
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('app-screen').style.display = 'flex';
    });

    document.getElementById('forgot-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        switchAuthView('reset-sent');
        showToast('Reset code sent to your email.');
    });

    document.getElementById('code-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Code verified. You can now log in.');
        switchAuthView('login');
    });

    // Logout Action
    document.getElementById('btn-logout')?.addEventListener('click', () => {
        document.getElementById('app-screen').style.display = 'none';
        document.getElementById('auth-screen').style.display = 'flex';
        switchAuthView('login');
        showToast('Logged out successfully.');
    });

    // Navigation Between Dashboard Tabs
    const pageTitles = {
        'dashboard': 'Dashboard',
        'patients': 'Patient Profile',
        'services': 'Medical Services',
        'billing': 'Billing & Payments',
        'reports': 'Reports & Analytics',
        'settings': 'Settings'
    };

    function navigateTo(pageId) {
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => {
            if (el.getAttribute('data-page') === pageId) el.classList.add('active');
            else el.classList.remove('active');
        });

        document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
        const target = document.getElementById('view-' + pageId);
        if (target) target.classList.add('active');

        const titleHeader = document.getElementById('page-title');
        if (titleHeader) titleHeader.textContent = pageTitles[pageId] || 'Dashboard';
    }

    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const pageId = item.getAttribute('data-page');
            if (pageId) navigateTo(pageId);
        });
    });

    document.getElementById('user-profile-btn')?.addEventListener('click', () => navigateTo('settings'));

    // Patient Sub Tabs Switching
    document.querySelectorAll('.sub-nav-item').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.sub-nav-item').forEach(el => el.classList.remove('active'));
            tab.classList.add('active');

            const targetId = tab.getAttribute('data-target');
            document.querySelectorAll('.patient-sub-view').forEach(v => v.style.display = 'none');
            const targetEl = document.getElementById(targetId);
            if (targetEl) targetEl.style.display = 'block';
        });
    });

    // Settings Sub Tabs Switching
    document.querySelectorAll('.settings-menu-item').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.settings-menu-item').forEach(el => el.classList.remove('active'));
            tab.classList.add('active');

            const targetId = tab.getAttribute('data-target');
            document.querySelectorAll('.settings-tab-view').forEach(v => v.style.display = 'none');
            const targetEl = document.getElementById(targetId);
            if (targetEl) targetEl.style.display = 'block';
        });
    });

    // Save Profile Action
    document.getElementById('btn-save-profile')?.addEventListener('click', () => {
        const nameInput = document.getElementById('setting-fullname')?.value;
        if (nameInput) {
            document.getElementById('header-user-name').textContent = nameInput;
            const initials = nameInput.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            document.getElementById('header-avatar').textContent = initials || 'AA';
        }
        showToast('Profile updated successfully!');
    });

    // Other Buttons
    document.getElementById('btn-update-password')?.addEventListener('click', () => {
        showToast('Password updated successfully');
    });

    document.getElementById('btn-add-service')?.addEventListener('click', () => {
        showToast('Add Service functionality ready');
    });

});