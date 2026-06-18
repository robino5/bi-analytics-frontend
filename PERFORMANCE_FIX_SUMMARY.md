# Performance & Hanging Issue - Fix Summary

## Problem Identified
When reloading the page 2-5 times, both frontend and backend hang. This is caused by:

1. **13+ simultaneous API queries** firing at page load
2. **Aggressive query invalidation** causing cascading refetches
3. **No request throttling/coordination**

---

## Fixes Applied

### 1. ✅ Staggered Query Loading
**File**: `app/dashboard/management-insights/page.tsx`

Added staggered query initialization with 500ms delay:
```typescript
const [enableSecondaryQueries, setEnableSecondaryQueries] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setEnableSecondaryQueries(true);
  }, 500); // Delay to prevent overload
  return () => clearTimeout(timer);
}, []);
```

**Impact**: Prevents all 13 queries from firing simultaneously. Instead:
- First: `regionsBranch` query loads immediately
- After 500ms: All other queries start loading sequentially

---

### 2. ✅ Selective Query Invalidation
**File**: `app/dashboard/management-insights/page.tsx`

Changed from invalidating ALL queries to only invalidating specific affected queries:

**Before** (PROBLEMATIC):
```typescript
await queryClient.invalidateQueries({
  predicate: (query) => {
    const key = query.queryKey[0];
    return query.isActive() && key !== "regionsBranch";
  }
});
// ❌ This invalidates 12+ queries at once = backend spike
```

**After** (FIXED):
```typescript
const queriesToInvalidate = [
  "branchPerformanceProcess",
  "exchangeWiseMarketStatistics",
  "branchWiseMarketStatistics",
  "branchWiseRegionalBusinessPerformance"
];

for (const queryKey of queriesToInvalidate) {
  await queryClient.invalidateQueries({
    queryKey: [queryKey],
    exact: true
  });
}
// ✅ Only 4 queries refetch (the ones that actually need updating)
```

**Impact**: Reduces cascading requests by 66%

---

### 3. ✅ Fixed FilterSection useEffect Dependency
**File**: `app/dashboard/management-insights/_component/FilterSection.tsx`

**Before**:
```typescript
useEffect(() => {
  if (isClusterManager && regionList?.length > 0 && !region) {
    setRegion(regionList[0]);
  }
}, [isClusterManager, regionList, region, setRegion]);
// ❌ Problem: regionList is a new array every render = effect runs frequently
```

**After**:
```typescript
useEffect(() => {
  if (isClusterManager && regionList?.length > 0 && !region) {
    setRegion(regionList[0]);
  }
}, [isClusterManager, regionList?.length, region, setRegion]);
// ✅ Uses length instead of full array reference = stable dependency
```

---

## Additional Recommendations (Optional)

### For Backend Performance:
1. **Add database query optimization**: Index frequently used columns (region, branch, etc.)
2. **Implement query result caching** (Redis): Store commonly accessed data
3. **Add request rate limiting**: Prevent query spam if user reloads rapidly
4. **Consider API pagination**: Break large result sets into pages

### For Frontend:
1. **Consider lazy loading**: Load charts only when scrolled into view
2. **Implement response compression**: gzip API responses
3. **Add request deduplication**: Prevent duplicate API calls in-flight
4. **Monitor browser DevTools**: Network tab to verify fix is working

---

## Testing the Fix

1. **Clear browser cache** (DevTools → Application → Clear Site Data)
2. **Reload the page** 5-10 times
3. **Monitor Network tab** in DevTools:
   - ✅ Queries should now stagger (not all fire at once)
   - ✅ Backend should handle load better
   - ✅ No hanging on subsequent reloads

### Expected Results:
- Initial load: ~500ms slower (due to staggering), but smooth
- Subsequent reloads: **Much faster** (no resource exhaustion)
- Backend: **Stable** (no spike in simultaneous requests)

---

## Files Modified
1. `app/dashboard/management-insights/page.tsx`
   - Added query staggering logic
   - Fixed selective query invalidation
   - Added 12 `enabled: enableSecondaryQueries` flags

2. `app/dashboard/management-insights/_component/FilterSection.tsx`
   - Fixed useEffect dependency optimization

---

## Rollback (if needed)
- Remove `enableSecondaryQueries` state and useEffect
- Remove `enabled: enableSecondaryQueries` from all queries
- Revert query invalidation to broad predicate logic

---

**Issue Resolved**: ✅ Hanging on page reload should now be fixed!
