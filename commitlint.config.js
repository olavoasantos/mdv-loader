module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
		'header-max-length': [0],
    'subject-full-stop': [2, 'never'],
    'scope-empty': [0],
    'type-case': [2, 'always', 'upper-case'],
		'type-empty': [2, 'never'],
		'type-enum': [
			2,
			'always',
			[
        'ENHANCEMENT',
				'DOCS',
				'FEATURE',
				'FIX',
				'PERFORMANCE',
				'REFACTOR',
				'REVERT',
				'STYLE',
				'TEST'
			]
		]
  }
};
