# Chat WebSocket Testing Guide

## Quick Start - Test Chat Functionality

### Step 1: Start Both Servers

**Terminal 1 - Backend:**
```bash
cd c:\Projects\Real-Estate\backend
npm run start:dev
```

Expected output:
```
[NestJS] Starting NestJS application...
Listening on port 4000
WebSocket server initialized
Database connected
```

**Terminal 2 - Frontend:**
```bash
cd c:\Projects\Real-Estate\frontend
npm run dev
```

Expected output:
```
  ▲ Next.js 14.2.35
  - ready started server on 0.0.0.0:3000
  - event compiled client and server successfully
```

### Step 2: Open Application

1. Navigate to `http://localhost:3000`
2. Sign in with your test account
3. Go to `/messages` route or click "Messages" in header dropdown

### Step 3: Test WebSocket Connection

#### Browser Console Test
```javascript
// Open DevTools (F12) → Console

// Check if socket is connected
localStorage.getItem('auth_token')  // Should show your token

// Try to send message via API
fetch('http://localhost:4000/chat/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
  },
  body: JSON.stringify({
    roomId: 'room-id-here',
    message: 'Test message'
  })
})
.then(r => r.json())
.then(console.log)
```

## Manual Testing Scenarios

### Scenario 1: Send & Receive Messages

**Setup:**
- Have two browser windows/tabs open (or use two different browsers)
- Both logged in with different accounts
- Both on `/messages` page

**Test Steps:**
1. In Tab 1, type message: "Hello from Tab 1"
2. Click send button
3. Verify message appears in Tab 1 immediately
4. Check Tab 2 - message should appear in real-time
5. In Tab 2, send reply: "Hello from Tab 2"
6. Verify both tabs show the complete conversation

**Expected Behavior:**
- ✅ Message sent immediately in sender's tab
- ✅ Message received in real-time in recipient's tab
- ✅ No page refresh needed
- ✅ Timestamps accurate
- ✅ Sender name/avatar displays correctly

### Scenario 2: Multiple Chat Rooms

**Test Steps:**
1. Create or access multiple chat rooms
2. Switch between rooms using room list
3. Send messages in different rooms
4. Verify messages don't cross rooms
5. Go back to previous room
6. Verify message history is preserved

**Expected Behavior:**
- ✅ Messages isolated to correct room
- ✅ Room list updates with recent messages
- ✅ Room selection works smoothly
- ✅ Message history loads correctly

### Scenario 3: Offline Handling

**Test Steps:**
1. Open chat in two tabs
2. Disconnect internet (DevTools → Network → Offline)
3. Try to send message
4. Should see error message or queue
5. Reconnect internet
6. Message should auto-send or prompt retry

**Expected Behavior:**
- ✅ Shows connection error
- ✅ Indicates offline status
- ✅ Auto-reconnects when online
- ✅ Retries failed messages

### Scenario 4: Connection Drop & Reconnect

**Test Steps:**
1. Stop backend server while chat is open
2. Try to send message
3. Should show connection error
4. Restart backend
5. Messages should auto-reconnect

**Expected Behavior:**
- ✅ Detects disconnect
- ✅ Shows user-friendly error
- ✅ Auto-reconnects
- ✅ Resumes normal operation

### Scenario 5: Long Messages & Special Characters

**Test with:**
- Very long messages (500+ characters)
- Emoji: 🏠 🎉 ❤️
- Special characters: <>&'"
- Line breaks and formatting
- Links: https://example.com

**Expected Behavior:**
- ✅ All content displays correctly
- ✅ No XSS vulnerabilities
- ✅ Links are clickable
- ✅ Formatting preserved

### Scenario 6: Image Upload in Chat

**Test Steps:**
1. Click image/attachment button
2. Select an image file
3. Wait for upload
4. Verify image preview appears
5. Send message with image
6. Verify image loads in recipient's chat

**Expected Behavior:**
- ✅ File picker opens
- ✅ Selected file shows preview
- ✅ Upload progress visible
- ✅ Image sends successfully
- ✅ Image loads in chat

### Scenario 7: User Status & Presence

**Test Steps:**
1. Open chat in Tab 1
2. Check if user appears "online"
3. Close chat tab
4. In another tab/user, check if they appear "offline"

**Expected Behavior:**
- ✅ Online status updates
- ✅ Shows when users are typing
- ✅ Shows last seen time
- ✅ Presence indicators accurate

## Performance Testing

### Load Testing - Multiple Messages

```bash
# Using a tool like K6 or custom script
# Send 100 messages and measure performance

# Expected metrics:
# - Message send-receive latency: < 500ms
# - UI updates: Smooth (60 FPS)
# - Memory usage: Stable
# - No message duplication
```

### Stress Testing - Concurrent Users

**Setup:**
- Run multiple chat sessions simultaneously
- Each session sends messages continuously

**Expected Behavior:**
- ✅ No dropped messages
- ✅ All users receive messages
- ✅ No duplicate messages
- ✅ Server doesn't crash

## Debugging Chat Issues

### Enable Socket.IO Debug Logging

**Frontend (browser console):**
```javascript
// Enable debug mode
localStorage.debug = 'socket.io-client:*'

// Reload page to see socket events
// Watch Network tab for WebSocket frames
```

**Backend (backend console):**
```bash
# Set debug environment variable
DEBUG=socket.io:* npm run start:dev
```

### Check WebSocket Connection

**Browser DevTools:**
```
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "WS" (WebSocket)
4. Should see connection to localhost:4000/socket.io
5. Messages show frame data
```

### Common Issues & Solutions

**Issue: "Connection refused"**
```
Solution: 
- Verify backend is running (port 4000)
- Check firewall settings
- Verify API URL in environment variables
```

**Issue: "Messages not real-time"**
```
Solution:
- Check browser console for errors
- Verify socket is connected
- Check network tab for WebSocket connection
- Clear browser cache and reload
- Restart both servers
```

**Issue: "Message duplication"**
```
Solution:
- Check browser console for duplicate sends
- Verify backend deduplication logic
- Check for multiple socket connections
- Ensure idempotent message handling
```

**Issue: "Slow message delivery"**
```
Solution:
- Check network latency (DevTools → Network)
- Monitor server CPU/memory usage
- Check database query performance
- Reduce payload size if too large
```

## Automated Testing with Cypress

Create test file: `frontend/e2e/chat.cy.ts`

```typescript
describe('Chat Messaging', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.login('user1@example.com', 'password');
    cy.visit('http://localhost:3000/messages');
  });

  it('should send a message', () => {
    cy.get('[data-testid="message-input"]').type('Hello World');
    cy.get('[data-testid="send-button"]').click();
    cy.contains('Hello World').should('be.visible');
  });

  it('should receive messages in real-time', () => {
    // Use cy.window() to access another window
    cy.get('[data-testid="message-list"]')
      .should('contain', 'Test message');
  });

  it('should handle offline gracefully', () => {
    cy.window().then(win => {
      cy.stub(win.navigator, 'onLine').value(false);
    });
    cy.get('[data-testid="connection-status"]')
      .should('contain', 'Offline');
  });
});
```

Run tests:
```bash
cd frontend
npm run test:e2e
```

## Performance Checklist

- [ ] Message latency < 500ms (p95)
- [ ] UI renders without jank
- [ ] Memory stable over time
- [ ] No memory leaks
- [ ] Handles 1000+ messages
- [ ] Works on slow networks (3G)
- [ ] Graceful degradation when offline
- [ ] Reconnects automatically
- [ ] No XSS vulnerabilities
- [ ] No SQL injection risks
- [ ] Rate limiting on server
- [ ] Message validation on server

## Additional Resources

- [Socket.IO Documentation](https://socket.io/docs/)
- [Socket.IO Client Library](https://github.com/socketio/socket.io-client)
- [WebSocket Testing Guide](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Real-time Communication Best Practices](https://www.html5rocks.com/en/tutorials/websockets/basics/)
