declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    requiredWhenFieldIsTrue(path: string): Rule
    requiredWhenTaggrOrFieldIsTrue(path: string): Rule
    allowedWhenTrue(allowedPlatforms: string[]): Rule
  }
}
