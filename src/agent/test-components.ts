import { generateGenericModel } from './agent';

// Test function to specifically test if cabinets include doors and shelves
async function testComponents() {
  console.log('Testing cabinet components generation...\n');

  // Test: Request a kitchen with explicit component requirements
  console.log('Test: Kitchen with explicit component requirements');
  try {
    const result = await generateGenericModel('Create a kitchen with lower cabinets that have drawers and shelves, upper cabinets with doors and shelves, and a tall pantry cabinet with multiple shelves and drawers');
    console.log('Number of cabinets generated:', result.length);
    console.log('Cabinet details with components:');
    
    result.forEach((cabinet, index) => {
      console.log(`\nCabinet ${index + 1}:`, cabinet.type);
      console.log('  Dimensions:', cabinet.dimensions);
      console.log('  Has doors:', !!cabinet.doors);
      console.log(' Has shelves:', !!cabinet.shelves);
      console.log('  Has drawers:', !!cabinet.drawers);
      console.log(' Has handles:', !!cabinet.handles);
      console.log(' Has material:', !!cabinet.material);
      console.log('  Has special mechanisms:', !!cabinet.specialMechanisms);
      
      if (cabinet.doors) console.log('  Door details:', cabinet.doors);
      if (cabinet.shelves) console.log('  Shelf details:', cabinet.shelves);
      if (cabinet.drawers) console.log('  Drawer details:', cabinet.drawers);
      if (cabinet.handles) console.log('  Handle details:', cabinet.handles);
    });
  } catch (error) {
    console.error('Error:', error);
  }
  
  console.log('\n' + '='.repeat(70));
}

// Run the test
testComponents().catch(console.error);