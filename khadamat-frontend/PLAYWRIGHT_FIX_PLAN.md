# PLAYWRIGHT TEST FIXING PLAN

## 🎯 OBJECTIVE
Fix Playwright tests to achieve ≥60% success rate (15/25 tests) by aligning test selectors with actual frontend implementation.

## 🔍 ROOT CAUSE ANALYSIS
**Primary Issue**: Test selectors don't match actual frontend DOM structure
- Tests expect `data-testid` attributes that don't exist
- Form field names/IDs have changed
- Navigation selectors are outdated
- Element roles/labels don't match

## 🗺️ SYSTEMATIC FIXING APPROACH

### Phase 1: Understand Current Frontend Structure
1. **Examine actual frontend components** to understand current DOM
2. **Map test expectations** to real implementation
3. **Identify selector patterns** that work reliably

### Phase 2: Fix Critical Test Categories
**Priority Order**:
1. **Authentication Tests** (login/signup) - Core user flow
2. **Booking Tests** (create booking) - Business critical
3. **Service Tests** (search/view) - User discovery
4. **Navigation Tests** - Foundation
5. **Profile/Messaging Tests** - Secondary

### Phase 3: Implement Robust Selector Strategy
- Use **semantic selectors** where possible (`getByRole`, `getByLabel`)
- Add **minimal data-testid** only where necessary
- Avoid **brittle selectors** (deep CSS paths, nth-child)
- Implement **explicit waits** for dynamic content

## 🛠️ IMPLEMENTATION STEPS

### Step 1: Fix Authentication Tests
**Files**: `auth.spec.ts`, `auth.fixture.ts`
**Issues**:
- `getByLabel('Prénom')` not found
- `getByTestId('register-firstname-input')` missing
- Form submission timeouts

**Action**:
1. Examine actual login/signup forms
2. Update selectors to match real field names
3. Add explicit waits for form loading

### Step 2: Fix Booking Tests
**Files**: `bookings.spec.ts`, `booking.fixture.ts`
**Issues**:
- Service selection timeouts
- Booking form field mismatches
- Dashboard navigation failures

**Action**:
1. Map booking flow steps to actual UI
2. Fix service selection logic
3. Update booking form field selectors

### Step 3: Fix Service Tests
**Files**: `services.spec.ts`, `service.fixture.ts`
**Issues**:
- Service cards not found
- Category filter timeouts
- Service detail navigation failures

**Action**:
1. Examine actual service listing structure
2. Update service card selectors
3. Fix category filter logic

### Step 4: Stabilize Navigation Tests
**Files**: `navigation.spec.ts`
**Issues**:
- Navigation link timeouts
- Page transition failures

**Action**:
1. Verify navigation structure
2. Update link selectors
3. Add explicit page load waits

## 📋 WORKFLOW

1. **Examine**: Look at actual frontend code for each component
2. **Compare**: Identify selector mismatches
3. **Fix**: Update test selectors to match reality
4. **Test**: Run specific test files to validate
5. **Iterate**: Move to next priority category

## 🎯 SUCCESS CRITERIA

- **Authentication**: 4/4 tests passing
- **Bookings**: 2/2 tests passing
- **Services**: 3/3 tests passing
- **Navigation**: 4/4 tests passing
- **Total**: 13/15 critical tests = 87% (exceeds 60% threshold)

## 📅 TIMELINE ESTIMATE

- **Phase 1 (Analysis)**: 30-60 minutes
- **Phase 2 (Fixing)**: 2-3 hours
- **Phase 3 (Validation)**: 1 hour
- **Total**: 3-5 hours to production readiness

## 🚀 NEXT ACTIONS

1. **Start with authentication tests** (highest priority)
2. **Examine frontend auth components**
3. **Update auth test selectors**
4. **Run auth tests to validate**
5. **Proceed to bookings, then services**

**🔧 Ready to begin implementation**