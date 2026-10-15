<?php
/* The persona request forms — what each one asks, and how a submission is read.
 *
 * Each "What brings you here?" persona (js/audience.js) has a page with its own
 * form that asks the questions that matter for that kind of request: a gamer is
 * asked for the platform and where it ships, a property owner for the kind of
 * property, a support request for the device and how urgent it is. All of them
 * post to php/enquiry.php with a `form_type`, and this file is the schema.
 *
 * THE TRUST MODEL IS THE BUILDERS' ONE. The browser sends option KEYS; every label
 * a person reads in the notification is looked up here. An option the form does
 * not offer is dropped, never echoed, so a forged POST cannot put words into the
 * inbox dressed as something ProManaged offers. Free text is cleaned and capped.
 *
 * Separate from the endpoint for the same reason as the builder catalogues: the
 * endpoint runs on include (pm_respond() exits), so nothing in it could be tested
 * without sending mail. tests/enquiry_endpoint.test.php exercises these functions
 * with hostile input, and tests/persona_pages.test.js checks every field and
 * option in the HTML forms is declared here.
 */

require_once __DIR__ . '/http.php';

/** Field types: line (one line), text (multi-line), choice (one key), multi (keys). */
function pm_enquiry_forms() {
    $when = [
        'asap'     => 'As soon as possible',
        'month'    => 'Within a month',
        'later'    => 'In the next few months',
        'flexible' => 'No fixed date',
    ];

    return [
        'gaming' => [
            'title'   => 'Gaming gear request',
            'confirm' => 'Your gaming gear request is with us',
            'next'    => 'Come back with options and ONE total — gear, freight and handling — before anything is ordered. Check the spec against what they play.',
            'expect'  => 'We will come back with options and one total for the gear before anything is ordered — then you collect it locally, or we bring it to your doorstep. Nothing is bought without your go-ahead.',
            'success' => 'Thanks — your gaming gear request is with us. We will come back with options and one total, ready to collect or brought to you.',
            'fields'  => [
                'platform'    => ['label' => 'Platform', 'type' => 'choice', 'required' => true, 'options' => [
                    'pc'          => 'Gaming PC',
                    'playstation' => 'PlayStation',
                    'xbox'        => 'Xbox',
                    'switch'      => 'Nintendo Switch',
                    'mixed'       => 'More than one, or not sure yet',
                ]],
                'gear'        => ['label' => 'Looking for', 'type' => 'multi', 'options' => [
                    'pc'         => 'A gaming PC (prebuilt or custom)',
                    'console'    => 'A console',
                    'monitor'    => 'A monitor',
                    'headset'    => 'A headset or microphone',
                    'controller' => 'Controllers',
                    'desk'       => 'Keyboard, mouse or desk gear',
                    'upgrade'    => 'Upgrade parts (graphics card, memory, storage)',
                    'stream'     => 'Streaming or capture gear',
                ]],
                'budget'      => ['label' => 'Rough budget', 'type' => 'line', 'max' => 80],
                'destination' => ['label' => 'Where they are', 'type' => 'line', 'max' => 120, 'required' => true],
                'needed_by'   => ['label' => 'Needed by', 'type' => 'choice', 'options' => $when],
                'setup'       => ['label' => 'Setup help', 'type' => 'choice', 'options' => [
                    'yes' => 'Yes — help me set it up over a call',
                    'no'  => 'No, I will set it up myself',
                ]],
                'message'     => ['label' => 'What they have in mind', 'type' => 'text', 'max' => 4000, 'required' => true],
            ],
        ],

        'property' => [
            'title'   => 'Property enquiry',
            'confirm' => 'We have the details of your property',
            'next'    => 'Reply with what the property actually needs first — often the website, with bookings or records added later — and an honest view of what is not worth building.',
            'expect'  => 'We will come back with what we think the property actually needs first, and what could wait. It is a conversation, not a quote.',
            'success' => 'Thanks — the details of your property are with us. We will come back with what we think it actually needs.',
            'fields'  => [
                'property_type' => ['label' => 'Property', 'type' => 'choice', 'required' => true, 'options' => [
                    'guesthouse' => 'Guest house or B&B',
                    'shortlet'   => 'Short-let or holiday apartments',
                    'rental'     => 'Rental homes or flats',
                    'lodge'      => 'Lodge or holiday property',
                    'commercial' => 'Commercial property',
                    'mixed'      => 'A mix, or something else',
                ]],
                'units'         => ['label' => 'Units or rooms', 'type' => 'choice', 'options' => [
                    'one'   => 'One',
                    'few'   => '2 to 5',
                    'some'  => '6 to 20',
                    'many'  => 'More than 20',
                ]],
                'needs'         => ['label' => 'Looking for', 'type' => 'multi', 'options' => [
                    'website'  => 'A website for the property',
                    'bookings' => 'Online bookings and availability',
                    'records'  => 'A system for tenants, rent or records',
                    'unsure'   => 'Not sure yet',
                ]],
                'current_site'  => ['label' => 'Website today', 'type' => 'choice', 'options' => [
                    'none'     => 'No website yet',
                    'replace'  => 'Have one — it needs replacing',
                    'extend'   => 'Have one — it needs bookings added',
                ]],
                'location'      => ['label' => 'Where the property is', 'type' => 'line', 'max' => 120],
                'message'       => ['label' => 'How they run it today', 'type' => 'text', 'max' => 4000, 'required' => true],
            ],
        ],

        'software' => [
            'title'   => 'Software brief',
            'confirm' => 'We have your software brief',
            'next'    => 'Book the discovery conversation. Treat the "kind of system" as their first guess, not the scope — the problem in their own words is the brief.',
            'expect'  => 'We will come back to arrange a conversation about the problem, then a written scope, a realistic timeline and an honest cost — including whether it is worth building at all.',
            'success' => 'Thanks — your brief is with us. We will come back to arrange a conversation about it.',
            'fields'  => [
                'business' => ['label' => 'Business', 'type' => 'line', 'max' => 160, 'required' => true],
                'kind'     => ['label' => 'Kind of system', 'type' => 'choice', 'required' => true, 'options' => [
                    'booking'  => 'A booking or scheduling system',
                    'internal' => 'An internal tool (tracking, reports, approvals)',
                    'customer' => 'Something customers log into',
                    'product'  => 'A product with many customers',
                    'website'  => 'A website',
                    'unsure'   => 'Not sure yet',
                ]],
                'today'    => ['label' => 'What they use today', 'type' => 'line', 'max' => 200],
                'team'     => ['label' => 'People who would use it', 'type' => 'choice', 'options' => [
                    'solo'   => 'Just me',
                    'small'  => '2 to 10',
                    'medium' => '11 to 50',
                    'large'  => 'More than 50',
                ]],
                'timeline' => ['label' => 'Timeline', 'type' => 'choice', 'options' => [
                    'asap'      => 'As soon as possible',
                    'quarter'   => 'Within three months',
                    'later'     => 'Later this year',
                    'exploring' => 'Just exploring',
                ]],
                'message'  => ['label' => 'What keeps going wrong', 'type' => 'text', 'max' => 5000, 'required' => true],
            ],
        ],

        'equipment' => [
            'title'   => 'Hardware request',
            'confirm' => 'Your equipment request is with us',
            'next'    => 'Come back with options and one total — hardware, freight and handling — before anything is ordered, specified against what it is for.',
            'expect'  => 'We will come back with options and a total price before anything is ordered — then you collect it locally, or we bring it to your doorstep. Nothing is bought without your go-ahead.',
            'success' => 'Thanks — your request is with us. We will come back with options and a total price.',
            'fields'  => [
                'category'    => ['label' => 'Looking for', 'type' => 'multi', 'options' => [
                    'computer' => 'A laptop or desktop',
                    'gaming'   => 'A gaming PC or console',
                    'monitor'  => 'A monitor',
                    'desk'     => 'Mice, keyboards or desk gear',
                    'audio'    => 'A headset, microphone or webcam',
                    'parts'    => 'Upgrade parts, storage or accessories',
                    'other'    => 'Something else',
                ]],
                'quantity'    => ['label' => 'How many', 'type' => 'choice', 'options' => [
                    'one'  => 'One',
                    'few'  => '2 to 5',
                    'some' => '6 to 20',
                    'many' => 'More than 20',
                ]],
                'budget'      => ['label' => 'Rough budget', 'type' => 'line', 'max' => 80],
                'destination' => ['label' => 'Where they are', 'type' => 'line', 'max' => 120, 'required' => true],
                'needed_by'   => ['label' => 'Needed by', 'type' => 'choice', 'options' => $when],
                'message'     => ['label' => 'What they need', 'type' => 'text', 'max' => 4000, 'required' => true],
            ],
        ],

        'support' => [
            'title'   => 'Support request',
            'confirm' => 'Your support request is with us',
            'next'    => 'Reply in plain language and offer a call and screen share. Never ask for a password — they type it themselves.',
            'expect'  => 'A person will come back to you — usually with a time for a call and a screen share, where you watch every step. We will never ask for your password.',
            'success' => 'Thanks — your request is with us. A person will come back to you, usually with a time for a call.',
            'fields'  => [
                'device'   => ['label' => 'Device', 'type' => 'choice', 'required' => true, 'options' => [
                    'windows' => 'A Windows laptop or desktop',
                    'mac'     => 'A Mac',
                    'mobile'  => 'A phone or tablet',
                    'printer' => 'A printer or another device',
                    'account' => 'Email or an online account',
                    'unsure'  => 'Not sure',
                ]],
                'problem'  => ['label' => 'Closest to', 'type' => 'choice', 'required' => true, 'options' => [
                    'setup'    => 'Setting up a new device',
                    'broken'   => 'It stopped working',
                    'accounts' => 'Accounts and passwords',
                    'email'    => 'Email and file access',
                    'software' => 'Software and updates',
                    'backups'  => 'Backups and lost files',
                    'security' => 'Everyday security',
                    'other'    => 'Something else',
                ]],
                'urgency'  => ['label' => 'Urgency', 'type' => 'choice', 'options' => [
                    'today' => 'It is stopping work today',
                    'week'  => 'This week',
                    'any'   => 'Whenever suits',
                ]],
                'contact'  => ['label' => 'Best way to reach them', 'type' => 'choice', 'options' => [
                    'call'     => 'A phone call',
                    'email'    => 'Email',
                    'whatsapp' => 'WhatsApp',
                ]],
                'message'  => ['label' => 'What it is doing', 'type' => 'text', 'max' => 4000, 'required' => true],
            ],
        ],
    ];
}

/** Keys from a POSTed multi field (array or comma list) resolved to labels, in catalogue order. */
function pm_enquiry_multi($raw, array $options) {
    if (is_string($raw)) {
        $raw = explode(',', $raw);
    }
    if (!is_array($raw)) {
        return [];
    }
    $wanted = [];
    foreach (array_slice($raw, 0, 40) as $value) {
        if (!is_string($value)) {
            continue;
        }
        $wanted[pm_clean_line($value, 40)] = true;
    }
    $labels = [];
    foreach ($options as $key => $label) {
        if (isset($wanted[$key])) {
            $labels[] = $label;
        }
    }
    return $labels;
}

/**
 * Read one submission against its form's schema.
 *
 * Returns ['ok' => bool, 'error' => string, 'form' => array, 'identity' => [...],
 * 'details' => [label => value], 'message' => string]. The free-text `message`
 * field is returned separately because the mail templates give it its own block.
 */
function pm_enquiry_resolve($type, array $post) {
    $forms = pm_enquiry_forms();
    $type = is_string($type) ? pm_clean_line($type, 20) : '';
    if (!isset($forms[$type])) {
        return ['ok' => false, 'error' => 'This form is not recognised. Please refresh the page and try again.'];
    }
    $form = $forms[$type];

    $str = function ($key) use ($post) {
        return isset($post[$key]) && is_string($post[$key]) ? $post[$key] : '';
    };

    $identity = [
        'Name'  => pm_clean_line($str('name'), 120),
        'Email' => pm_valid_email($str('email')),
        'Phone' => pm_clean_line($str('phone'), 60),
    ];

    $missing = [];
    if ($identity['Name'] === '') {
        $missing[] = 'your name';
    }
    if ($identity['Email'] === '') {
        $missing[] = 'a valid email address';
    }

    $details = [];
    $message = '';
    foreach ($form['fields'] as $key => $field) {
        $required = !empty($field['required']);
        $value = '';
        switch ($field['type']) {
            case 'line':
                $value = pm_clean_line($str($key), $field['max']);
                break;
            case 'text':
                $value = pm_clean_text($str($key), $field['max']);
                break;
            case 'choice':
                $picked = pm_clean_line($str($key), 40);
                $value = isset($field['options'][$picked]) ? $field['options'][$picked] : '';
                break;
            case 'multi':
                $value = implode(', ', pm_enquiry_multi($post[$key] ?? [], $field['options']));
                break;
        }
        if ($required && $value === '') {
            $missing[] = strtolower($field['label']);
        }
        if ($key === 'message') {
            $message = $value;
        } else {
            $details[$field['label']] = $value;
        }
    }

    if ($missing) {
        return [
            'ok'    => false,
            'error' => 'Please add ' . implode(', ', $missing) . '.',
        ];
    }

    return [
        'ok'       => true,
        'error'    => '',
        'form'     => $form,
        'identity' => $identity,
        'details'  => $details,
        'message'  => $message,
    ];
}
