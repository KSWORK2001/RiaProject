(function () {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (!form) return;

    const fieldError = (name) => form.querySelector(`.error[data-for="${name}"]`);

    const setError = (name, message) => {
        const el = fieldError(name);
        if (el) el.textContent = message || '';
    };

    const isEmail = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
    };

    const validate = () => {
        let ok = true;

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const topic = form.topic.value.trim();
        const message = form.message.value.trim();

        setError('name', '');
        setError('email', '');
        setError('topic', '');
        setError('message', '');

        if (!name) {
            setError('name', 'Please enter your name.');
            ok = false;
        }

        if (!email) {
            setError('email', 'Please enter your email.');
            ok = false;
        } else if (!isEmail(email)) {
            setError('email', 'Please enter a valid email address.');
            ok = false;
        }

        if (!topic) {
            setError('topic', 'Please select a topic.');
            ok = false;
        }

        if (!message) {
            setError('message', 'Please enter a message.');
            ok = false;
        } else if (message.length < 15) {
            setError('message', 'Please add a bit more detail (15+ characters).');
            ok = false;
        }

        return ok;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (status) status.textContent = '';

        const ok = validate();
        if (!ok) {
            if (status) status.textContent = 'Please fix the highlighted fields.';
            return;
        }

        if (status) status.textContent = 'Looks good — ready to send.';
        form.reset();
    });
})();
