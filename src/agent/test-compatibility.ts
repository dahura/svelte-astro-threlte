import { generateGenericModel } from './agent';

// Test to verify drawer vs door compatibility
async function testCompatibility() {
  console.log('Testing drawer vs door compatibility...\n');

  try {
    // Test 1: Request a cabinet with both drawers and doors to see how agent handles it
    console.log('Test 1: Lower cabinet with both drawers and doors (should prioritize one or split sections)');
    const result1 = await generateGenericModel('Create a lower cabinet with both drawers and doors');
    console.log('Result 1 - Cabinet 1:', JSON.stringify(result1[0], null, 2));
    
    console.log('\nTest 2: Upper cabinet with drawers (should recognize this is typically not done)');
    const result2 = await generateGenericModel('Create an upper cabinet with drawers');
    console.log('Result 2 - Cabinet 1:', JSON.stringify(result2[0], null, 2));
    
    console.log('\nTest 3: Upper cabinet with doors (should be appropriate)');
    const result3 = await generateGenericModel('Create an upper cabinet with doors');
    console.log('Result 3 - Cabinet 1:', JSON.stringify(result3[0], null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testCompatibility().catch(console.error);