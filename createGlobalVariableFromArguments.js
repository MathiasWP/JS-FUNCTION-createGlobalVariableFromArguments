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

    // If bool is false, change connection to non-default value (no space between words)
    if (!bool) connection = '';
  }

  // Store the value of new variable (required argument)
  let value = _.pop();

  // Error function
  const error = () => {
    throw new Error('Invalid parameter input');
  };

  try {
    // Check if first variable starts with number (because variables cannot start as number)
    if (!isNaN(parseInt(_[0]))) {
      error();
    }

    // Loop through all arguments used to create variable
    for (const a of _) {
      // Check if word contains invalid characters for creating a variable
      if (!a.match('^[A-Za-z0-9]+$')) {
        error();
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
