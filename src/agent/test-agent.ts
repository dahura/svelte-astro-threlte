import { generateGenericModel } from './agent';

// Test function to simulate different user requests
async function testAgent() {
  console.log('Testing improved kitchen design agent...\n');

  // Test 1: Basic lower cabinet request
 console.log('Test 1: Basic lower cabinet request');
  try {
    const result1 = await generateGenericModel('I need a lower cabinet for my kitchen');
    console.log('Response:', JSON.stringify(result1, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
 console.log('\n' + '='.repeat(50) + '\n');

  // Test 2: Upper cabinet request
  console.log('Test 2: Upper cabinet request');
  try {
    const result2 = await generateGenericModel('I want an upper cabinet above my counter');
    console.log('Response:', JSON.stringify(result2, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
 console.log('\n' + '='.repeat(50) + '\n');

  // Test 3: Tall cabinet request
  console.log('Test 3: Tall cabinet request');
  try {
    const result3 = await generateGenericModel('I need a tall cabinet for pantry storage');
    console.log('Response:', JSON.stringify(result3, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
 console.log('\n' + '='.repeat(50) + '\n');

  // Test 4: Incomplete request (should use fallbacks)
  console.log('Test 4: Incomplete request (should use fallbacks)');
  try {
    const result4 = await generateGenericModel('I want a cabinet');
    console.log('Response:', JSON.stringify(result4, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
 console.log('\n' + '='.repeat(50) + '\n');

  // Test 5: Kitchen layout request
  console.log('Test 5: Kitchen layout request');
  try {
    const result5 = await generateGenericModel('I want a kitchen with lower cabinets, upper cabinets, and a tall pantry cabinet');
    console.log('Response:', JSON.stringify(result5, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
  console.log('\n' + '='.repeat(50) + '\n');

  console.log('All tests completed!');
}

// Run the tests
testAgent().catch(console.error);