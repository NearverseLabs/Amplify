/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { validator } from '@ioc:Adonis/Core/Validator'

/**
 * This rule enforces that a field is required if a certain "boolean" field (in the data) is `true`.
 *
 * Usage:
 *   rules.requiredWhenFieldIsTrue('requirements.join_community')
 */
validator.rule('requiredWhenFieldIsTrue', (value, [path], options) => {
  const { pointer, errorReporter, arrayExpressionPointer, root } = options

  // Walk down the `root` object to find the specified path, e.g. 'requirements.join_community'
  const segments = path.split('.') // e.g. ['requirements', 'join_community']
  let target = root
  for (const segment of segments) {
    if (target === undefined || target === null) {
      break
    }
    target = target[segment]
  }
  console.log('PATH=>', path, target, value)

  // If the target was `true`, then we must have a `value` for this field.
  if (target === true) {
    if (value === undefined || value === null) {
      errorReporter.report(
        pointer,
        'requiredWhenFieldIsTrue',
        `Field "${pointer}" is required because "${path}" = true`,
        arrayExpressionPointer
      )
    }
  }
})

/**
 * This rule enforces that a field is required if `platform` is `'Taggr'` **OR** another boolean field is `true`.
 *
 * Usage:
 *   rules.requiredWhenTaggrOrFieldIsTrue('requirements.join_group')
 */
validator.rule('requiredWhenTaggrOrFieldIsTrue', (value, [path], options) => {
  const { pointer, errorReporter, arrayExpressionPointer, root } = options

  const segments = path.split('.')
  let target = root
  for (const segment of segments) {
    if (target === undefined || target === null) {
      break
    }
    target = target[segment]
  }

  // Condition: platform === 'Taggr' OR that target field is `true`
  const conditionMet = root.platform === 'Taggr' || target === true

  if (conditionMet) {
    if (value === undefined || value === null) {
      errorReporter.report(
        pointer,
        'requiredWhenTaggrOrFieldIsTrue',
        `Field "${pointer}" is required because platform=Taggr or "${path}"=true`,
        arrayExpressionPointer
      )
    }
  }
})

validator.rule('allowedWhenTrue', (value, [allowedPlatforms], options) => {
  const { root, pointer, errorReporter } = options

  // If the value is `true` but the platform isn't in the allowed list, fail
  if (value === true) {
    const platform = root.platform
    if (!allowedPlatforms.includes(platform)) {
      errorReporter.report(
        pointer,
        'allowedWhenTrue',
        `Field "${pointer}" can only be true if platform is ${allowedPlatforms.join(' or ')}`
      )
    }
  }
})
