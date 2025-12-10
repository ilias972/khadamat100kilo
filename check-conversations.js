const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkConversations() {
  try {
    console.log('🔍 Checking conversations in database...');

    const conversations = await prisma.conversation.findMany({
      include: {
        messages: {
          include: { sender: true },
          orderBy: { createdAt: 'asc' },
        },
        booking: true,
      },
    });

    console.log(`\n💬 Found ${conversations.length} conversations:`);
    conversations.forEach((conv, index) => {
      console.log(`\nConversation ${index + 1}:`);
      console.log(`- ID: ${conv.id}`);
      console.log(`- Participant 1: ${conv.participant1Id}`);
      console.log(`- Participant 2: ${conv.participant2Id}`);
      console.log(`- Booking ID: ${conv.bookingId}`);
      console.log(`- Messages: ${conv.messages.length}`);
      conv.messages.forEach((msg, msgIndex) => {
        console.log(`  ${msgIndex + 1}. ${msg.sender.email}: ${msg.content.substring(0, 50)}...`);
      });
    });

    console.log('\n✅ Check completed!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkConversations();