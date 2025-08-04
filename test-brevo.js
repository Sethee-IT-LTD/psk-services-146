import { config } from 'dotenv';

// Load environment variables
config();

async function testBrevoConnection() {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

  console.log('Testing Brevo connection...');
  console.log('Environment variables:');
  console.log('- BREVO_API_KEY:', BREVO_API_KEY ? '✓ Set' : '✗ Missing');
  console.log('- BREVO_LIST_ID:', BREVO_LIST_ID ? `✓ Set (${BREVO_LIST_ID})` : '✗ Missing');

  if (!BREVO_API_KEY || !BREVO_LIST_ID) {
    console.error('❌ Missing required environment variables');
    return;
  }

  try {
    // Test 1: Check if we can access the lists
    console.log('\n1. Testing list access...');
    const listsResponse = await fetch('https://api.brevo.com/v3/contacts/lists', {
      headers: {
        'Accept': 'application/json',
        'api-key': BREVO_API_KEY,
      },
    });

    if (listsResponse.ok) {
      const lists = await listsResponse.json();
      console.log('✓ Successfully retrieved lists');
      console.log('Available lists:', lists.lists?.map(l => `${l.id}: ${l.name}`) || 'No lists found');
      
      // Check if our list ID exists
      const targetList = lists.lists?.find(l => l.id === Number(BREVO_LIST_ID));
      if (targetList) {
        console.log(`✓ Target list found: ${targetList.name} (ID: ${targetList.id})`);
      } else {
        console.log(`⚠️  Warning: List ID ${BREVO_LIST_ID} not found in available lists`);
      }
    } else {
      console.log('❌ Failed to retrieve lists:', listsResponse.status);
    }

    // Test 2: Try to add a test contact
    console.log('\n2. Testing contact creation...');
    const testEmail = `test-${Date.now()}@example.com`;
    const payload = {
      email: testEmail,
      listIds: [Number(BREVO_LIST_ID)],
      updateEnabled: true,
    };

    const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const contactData = await contactResponse.json();

    if (contactResponse.ok) {
      console.log('✓ Successfully created test contact');
      console.log('Response:', contactData);
    } else {
      console.log('❌ Failed to create contact:', contactResponse.status);
      console.log('Error:', contactData);
    }

  } catch (error) {
    console.error('❌ Error testing Brevo connection:', error);
  }
}

testBrevoConnection(); 