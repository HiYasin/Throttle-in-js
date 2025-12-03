# Throttle Demo

This small demo illustrates the difference between *throttle* and *debounce* using three example buttons:

- `Without Throttle (Default)` — every click increments immediately.
- `With Throttle (1 second delay)` — updates at most once per second while you keep clicking.
- `With Debounce (1 second delay)` — updates only after you stop clicking for one second.

Concepts and examples

## Throttle
- Purpose: ensure a function runs at most once in a specified time window.
- Use case: handling resize or scroll events that fire frequently but should be handled at most once every N milliseconds.
- Behavior: while the rapid events continue, the throttled function runs at regular intervals (every `delay` ms). If you keep clicking, the throttled handler will still run periodically.

Example (from `script.js`):
```js
function throttle(func, limit) {
	let lastCallTime = 0;
	let timeoutId = null;

	return function(...args) {
		const now = Date.now();
		const timeSinceLastCall = now - lastCallTime;

		if (timeSinceLastCall >= limit) {
			lastCallTime = now;
			func.apply(this, args);
		} else {
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				lastCallTime = Date.now();
				func.apply(this, args);
			}, limit - timeSinceLastCall);
		}
	};
}
```

## Debounce
- Purpose: delay execution of a function until a certain period has passed without the event firing again.
- Use case: text input autocomplete, search-as-you-type, submitting after the user stops typing.
- Behavior: the debounced function only runs once, after events stop for `delay` ms.

Example (from `script.js`):
```js
function debounce(func, delay) {
	let timeoutId = null;
	return function(...args) {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func.apply(this, args), delay);
	};
}
```

## Quick comparison

- **Throttle**: runs regularly while the action continues (limits maximum call rate).
- **Debounce**: waits for a pause, then runs once (collapses bursts into a single call).

Which to choose?
- Use **throttle** when you need `periodic updates` during continuous activity (e.g., updating UI on scroll).
- Use **debounce** when you only care about the `final state` after a `burst of activity` (e.g., search after typing stops).

Notes
- The `throttle` implementation here triggers immediately the first time and ensures calls are spaced by `limit` ms.
- The `debounce` implementation restarts its timer on each event and only triggers after `delay` ms of inactivity.

Reference
- Blog: https://kettanaito.com/blog/debounce-vs-throttle
- Debounce Repo: https://github.com/HiYasin/debouncing-in-react