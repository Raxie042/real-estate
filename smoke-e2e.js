const FRONTEND_BASE = process.env.SMOKE_FRONTEND_URL || 'http://localhost:3000';
const API_BASE = process.env.SMOKE_API_URL || 'http://localhost:4000/api';
const SHOULD_CLEANUP = process.env.SMOKE_CLEANUP !== 'false';

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

async function expectStatus(url, expectedStatus, options = {}) {
  const response = await fetch(url, options);
  if (response.status !== expectedStatus) {
    fail(`${url} returned ${response.status}, expected ${expectedStatus}`);
  }
  console.log(`✅ ${response.status} ${url}`);
  return response;
}

async function expectOneOfStatuses(url, expectedStatuses, options = {}) {
  const response = await fetch(url, options);
  if (!expectedStatuses.includes(response.status)) {
    fail(`${url} returned ${response.status}, expected one of [${expectedStatuses.join(', ')}]`);
  }
  console.log(`✅ ${response.status} ${url}`);
  return response;
}

async function cleanupArtifacts({ token, offerId }) {
  if (!SHOULD_CLEANUP) {
    console.log('ℹ️ SMOKE_CLEANUP=false; keeping test artifacts.');
    return;
  }

  if (!token) {
    return;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (offerId) {
    const withdrawResponse = await fetch(`${API_BASE}/offers/${offerId}/withdraw`, {
      method: 'PUT',
      headers,
    });
    if ([200, 204].includes(withdrawResponse.status)) {
      console.log(`🧹 Withdrawn smoke offer ${offerId}`);
    } else {
      console.warn(`⚠️ Could not withdraw smoke offer ${offerId}; status ${withdrawResponse.status}`);
    }
  }

  const deleteUserResponse = await fetch(`${API_BASE}/users/profile`, {
    method: 'DELETE',
    headers,
  });
  if ([200, 204].includes(deleteUserResponse.status)) {
    console.log('🧹 Deleted smoke test user profile');
  } else {
    console.warn(`⚠️ Could not delete smoke test user; status ${deleteUserResponse.status}`);
  }
}

async function run() {
  console.log('Running smoke E2E checks...');

  let token;
  let offerId;

  try {
    await expectStatus(`${FRONTEND_BASE}/`, 200);
    await expectStatus(`${FRONTEND_BASE}/search`, 200);
    await expectStatus(`${FRONTEND_BASE}/login`, 200);

    await expectStatus(`${API_BASE}/search/suggestions?q=test`, 200);

    const stamp = Date.now();
    const email = `smoke.${stamp}@example.com`;
    const password = 'SmokePass123!';

    const registerResponse = await expectStatus(`${API_BASE}/auth/register`, 201, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        firstName: 'Smoke',
        lastName: 'User',
      }),
    });

    const registerData = await registerResponse.json();
    token = registerData.access_token;
    if (!token) {
      fail('Register response did not include access_token');
    }

    await expectOneOfStatuses(`${API_BASE}/auth/me`, [200, 201], {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const listingsResponse = await expectStatus(`${API_BASE}/listings?status=ACTIVE&limit=1`, 200);
    const listingsData = await listingsResponse.json();
    const listings = Array.isArray(listingsData?.data)
      ? listingsData.data
      : Array.isArray(listingsData?.items)
        ? listingsData.items
        : Array.isArray(listingsData)
          ? listingsData
          : [];

    if (listings.length > 0 && listings[0]?.id) {
      const offerResponse = await expectStatus(`${API_BASE}/offers`, 201, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          listingId: listings[0].id,
          amount: 123456,
          currency: 'USD',
          message: 'Smoke test offer',
        }),
      });

      const offerData = await offerResponse.json();
      offerId = offerData?.id;
    } else {
      console.log('⚠️ No active listings found; skipped authenticated offer creation check.');
    }

    console.log('✅ Smoke E2E checks passed.');
  } finally {
    await cleanupArtifacts({ token, offerId });
  }
}

run().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
