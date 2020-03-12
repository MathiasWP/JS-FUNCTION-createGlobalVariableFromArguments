# JS-FUNCTION: createGlobalVariableFromArguments
The most useless and stupid function i've created. That's why chose to upload it.

```javascript
'use strict';

function createGlobalVariableFromArguments() {
  // Store arguments
  let _ = [...arguments];

  // Value that chooses how the arguments should be connected when creating the variable - underscore by default
  let connection = '_';

  // Checks if (optional) last parameter is used
  if (typeof _[_.length - 1] === 'boolean') {
    // If it is, extract the value and remove from arguments array
    const bool = _.pop();

    // If bool is false, change connection to non-default value
    if (!bool) connection = '';
  }

  // Store the value of new variable (required argument)
  let value = _.pop();

  try {
    // Loop through all arguments used to create variable
    for (const a of _) {
      // Check if first variable starts with number (because variables cannot start as number)
      // If first variable does not start with number, check if it contains invalid characters
      if (
        (_.indexOf(a) === 0 && !isNaN(parseInt(a))) ||
        !a.match('^[A-Za-z0-9]+$')
      ) {
        throw Error('Invalid parameter input');
      }
    }

    // Create variable with chosen connection (underscore (by default) or no space)
    _ = _.join(connection);

    // If variable already in window then ABORT MISSION
    if (_ in window) return;

    // Create global variable with value
    return (window[_] = value);
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * Last parameter is optional boolean value, if not provided will be true by default.
 * Next last parameter is the value of the variable
 * The rest of the parameters makes up the variable
 */

createGlobalVariableFromArguments('foo', 'bar', 'value', false);

```
