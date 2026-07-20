<?php
/**
 * Bank Alfalah — Alfa Payment Gateway (APG) merchant configuration
 * ------------------------------------------------------------------
 * Fill in the values below with the credentials shown in your APG
 * Merchant Portal (Go Live > Access Sandbox > Credentials Generator).
 * NEVER commit real production credentials to a public repo.
 */

return [

    // Set to 'production' for live real-money transactions, 'sandbox' for testing.
    'environment' => 'production',

    'sandbox' => [
        'hs_url'            => 'https://sandbox.bankalfalah.com/HS/HS/HS',
        'sso_url'           => 'https://sandbox.bankalfalah.com/SSO/SSO/SSO',
        'ipn_url'           => 'https://sandbox.bankalfalah.com/HS/api/IPN/OrderStatus',
        'merchant_id'       => '265406',
        'store_id'          => '560856',
        'merchant_hash'     => 'OUU362MB1uoaGPCmvd3tKO74ZJ4gnwAMz3OvCQixGMZLaLop0qN/ysXQRa5KtnP7',
        'merchant_username' => 'ybilyc',
        'merchant_password' => 'AGZTvou1c6dvFzk4yqF7CA==',
        'key1'              => '58ucc379xqWGaaGY', // AES key, exactly 16 chars
        'key2'              => '4683971160451146', // AES IV,  exactly 16 chars
    ],

    'production' => [
        'hs_url'            => 'https://payments.bankalfalah.com/HS/HS/HS',
        'sso_url'           => 'https://payments.bankalfalah.com/SSO/SSO/SSO',
        'ipn_url'           => 'https://payments.bankalfalah.com/HS/api/IPN/OrderStatus',
        'merchant_id'       => '265406',
        'store_id'          => '560856',
        'merchant_hash'     => 'OUU362MB1uoaGPCmvd3tKO74ZJ4gnwAMz3OvCQixGMZLaLop0qN/ymiqrMMYmLAl',
        'merchant_username' => 'ubogep',
        'merchant_password' => 'JCO7C7LS0VZvFzk4yqF7CA==',
        'key1'              => 'dydW3MTAwVwWgKww', // emailed by APG upon credential generation
        'key2'              => '7723520765291878',
    ],

    // 1001 = Page Redirection channel (the only mode this kit uses)
    'channel_id' => '1001',

    // Must be a PUBLIC, internet-reachable URL — Bank Alfalah redirects the
    // customer's browser here after the handshake, and again after payment.
    'return_url' => 'https://www.mnhitsolutions.com/return.php',

    // Must also be public — Bank Alfalah POSTs an IPN "url" param here in
    // real time when a transaction completes. Register this exact URL in
    // the Merchant Portal (Go Live > Access Sandbox > Listener URL) or it
    // will never be called.
    'listener_url' => 'https://www.mnhitsolutions.com/ipn_listener.php',

    // Where order records are stored. A flat JSON file is fine for testing;
    // swap store_order()/get_order()/update_order() in orders.php for real
    // database calls before going live.
    'orders_file' => __DIR__ . '/orders_data.json',
];