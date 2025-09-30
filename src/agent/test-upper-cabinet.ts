import { generateGenericModel } from './agent';

// Test specifically for upper cabinet behavior
async function testUpperCabinet() {
  console.log('Testing upper cabinet behavior...\n');

  try {
    console.log('Test: Upper cabinet explicitly requested with drawers (should ignore drawer request)');
    const result = await generateGenericModel('Create an upper cabinet with drawers');
    console.log('Result - Cabinet 1:', JSON.stringify(result[0], null, 2));
    
    console.log('\nChecking if cabinet has drawers:', !!result[0].drawers && result[0].drawers.count > 0);
    console.log('Checking if cabinet has doors:', !!result[0].doors);
    console.log('Checking if cabinet has shelves:', !!result[0].shelves);
  } catch (error) {
    console.error('Error:', error);
  }
}

testUpperCabinet().catch(console.error);